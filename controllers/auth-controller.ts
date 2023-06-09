import gen from 'random-seed'
import { addMinutes, isAfter } from 'date-fns'
import { sendCodeByEmail } from '@/lib/sendgrid'
import { generateToken } from '@/lib/jwt'
import Auth from '@/models/Auth'
import User from '@/models/User'
import { connectToMongo, closeDBConnection } from '@/database/mongo'

const random = gen.create()

// Finds a user and sends the numeric code
export const loginAndSendCode = async (email: string) => {
    try {
        // searching for an existing user
        await connectToMongo()
        const auth = await Auth.findOne({ email: email }).exec()
        if (!auth) {
            throw { error: 'The user does not exist' }
        }
        // sending the code
        const code = random.intBetween(10000, 99999)
        const now = new Date()
        const tenMinutesExpDate = addMinutes(now, 10)
        auth.code = code
        auth.expires = tenMinutesExpDate
        await auth.save()
        await closeDBConnection()
        await sendCodeByEmail(email, code)
        // return
        return code
    } catch (error) {
        console.error(error)
        return error
    }
}

// If the user does not exist, creates one with the corresponding auth and sends the numeric code
export const signupAndSendCode = async (email: string, fullName: string) => {
    try {
        // searching for an existing user
        await connectToMongo()
        const auth = await Auth.findOne({ email: email }).exec()
        if (auth) {
            throw { error: 'The user already exists' }
        }
        // creating the user
        const newUser = await User.create({
            email: email,
            fullName: fullName,
            birthdays: [],
        })
        const userId = newUser._id
        const code = random.intBetween(10000, 99999)
        const now = new Date()
        const tenMinutesExpDate = addMinutes(now, 10)
        // creating the auth
        await Auth.create({
            email: email,
            code: code,
            expires: tenMinutesExpDate,
            userId: userId,
        })
        await closeDBConnection()
        // sending the code
        await sendCodeByEmail(email, code)
        // return
        return code
    } catch (error) {
        console.error(error)
        return error
    }
}

// Checks the email and if the code is not expired returns the token
export const getToken = async (email: string, code: number) => {
    try {
        // searching for the user with a valid code
        await connectToMongo()
        const auth = await Auth.find({ email: email, code: code }).exec()
        if (auth.length === 0) {
            return null
        }
        // checking if the code is expired
        const expires = auth[0].expires
        const now = new Date()
        const expired = isAfter(now, expires)
        if (expired) {
            return true
        }
        // generating token for authentication
        const token = generateToken({ userId: auth[0].userId })
        auth[0].expires = now
        await auth[0].save()
        await closeDBConnection()
        return token
    } catch (error) {
        console.error(error)
        return error
    }
}
