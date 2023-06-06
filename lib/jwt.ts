import jwt from 'jsonwebtoken'
import { tokenObject } from '@/interfaces'
import * as dotenv from 'dotenv'
dotenv.config()

// Generate a token for the user
export function generateToken(obj: tokenObject) {
    // const expiresIn = 60 * 30
    try {
        const token = jwt.sign(obj, process.env.JWT_SECRET as string)
        return token
    } catch (error) {
        console.error('Problem with the token generation')
        return error
    }
}

// Decodes and validates the token received using the secret
export function decodeToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string)
    } catch (error) {
        console.error('Wrong token')
        return error
    }
}
