// import { format } from 'date-fns'
import format from 'date-fns/format'
import { sendReminderByEmail } from '@/lib/sendgrid'
import User from '@/models/User'
import Day from '@/models/Day'
import connectToMongo from '@/database/mongo'

// Creates new birthday
export const newBirthday = async (
    userId: string,
    date: string,
    fullName: string
) => {
    try {
        // searching the user and saving the birthday
        await connectToMongo()
        const newDate = format(new Date(date), 'MM-dd').toString()
        const user = await User.findById(userId).exec()
        const email = user.email
        const userBirthday = {
            date: newDate,
            fullName,
        }
        user.birthdays.push(userBirthday)
        await user.save()
        // searching for the day and if it does not exist, creates a new one and adding the birthday
        const dayBirthday = {
            ...userBirthday,
            email,
        }
        const day = await Day.findOne({ date: date }).exec()
        if (!day) {
            await Day.create({ date: date, birthdays: [dayBirthday] })
            // return
            return true
        } else {
            day.birthdays.push(dayBirthday)
            await day.save()
            // return
            return true
        }
    } catch (error) {
        console.error(error)
        return error
    }
}

// Deletes a birthday
export const deleteBirthday = async (
    userId: string,
    date: string,
    fullName: string
) => {
    try {
        // searching the user and deleting the birthday
        await connectToMongo()
        const newDate = format(new Date(date), 'MM-dd').toString()
        const user = await User.findById(userId).exec()
        const userBirthdays = user.birthdays
        const newUserBirthdays = userBirthdays.filter((b: any) => {
            if (b.fullName !== fullName && b.date !== newDate) {
                return b
            }
        })
        user.birthdays = newUserBirthdays
        await user.save()
        // searching and deleting the birthday at day collection
        const day = await Day.findOne({ date: newDate })
        const dayBirthdays = day.birthdays
        const newDayBirthdays = dayBirthdays.filter((b: any) => {
            if (b.fullName !== fullName && b.date !== newDate) {
                return b
            }
        })
        day.birthdays = newDayBirthdays
        await day.save()
        // return
        return true
    } catch (error) {
        console.error(error)
        return error
    }
}

// Sending reminders by email
export const sendBirthdayReminders = async () => {
    try {
        await connectToMongo()
        const date = format(new Date(), 'MM-dd').toString()
        const day = await Day.findOne({ date: date })
        if (!day) {
            return 'Nonexistent day'
        }
        const birthdays = day.birthdays
        if (!birthdays || birthdays.length === 0) {
            return 'No birthdays today'
        } else {
            birthdays.forEach(async (b: any) => {
                await sendReminderByEmail(b.email, b.fullName)
            })
        }
        // return
        return 'Remainders sended'
    } catch (error) {
        console.error(error)
        return error
    }
}
