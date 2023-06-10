import Auth from '@/models/Auth'
import User from '@/models/User'

// Gets the profile data
export const getProfileData = async (userId: string) => {
    try {
        // searching for the user
        const user = await User.findById(userId).exec()
        if (!user) {
            return 'Wrong or expired token'
        }
        // return
        return user
    } catch (error) {
        console.error(error)
        return error
    }
}

// Updates the profile data
export const updateProfileData = async (
    userId: string,
    email: string,
    fullName: string
) => {
    try {
        // searching for the user and auth
        const user = await User.findById(userId).exec()
        if (!user) {
            return 'Wrong or expired token'
        }
        const auth = await Auth.findOne({ userId: userId }).exec()
        // updating user and auth data
        user.email = email
        user.fullName = fullName
        auth.email = email
        await user.save()
        await auth.save()
        return user
    } catch (error) {
        console.error(error)
        return error
    }
}

// Gets the birthdays saved by the user
export const getUsersBirthdays = async (userId: string) => {
    try {
        // searching for the user
        const user = await User.findById(userId).exec()
        if (!user) {
            return 'Wrong or expired token'
        }
        const birthdays = user.birthdays
        return birthdays
    } catch (error) {
        console.error(error)
        return error
    }
}
