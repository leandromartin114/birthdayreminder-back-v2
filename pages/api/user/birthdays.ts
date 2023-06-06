import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUsersBirthdays } from '@/controllers/user.controller'
import { authMiddleware, CORSMiddleware } from '@/middlewares'

//Get user's appointment
async function getHandler(
    req: NextApiRequest,
    res: NextApiResponse,
    token: any
) {
    try {
        const birthdays = await getUsersBirthdays(token.userId)
        if (!birthdays) {
            res.status(400).send({ message: "The user doesn't have birthdays" })
        } else {
            res.status(200).send(birthdays)
        }
    } catch (error) {
        res.status(400).send({ error: error })
    }
}
const authorizedHandler = authMiddleware(getHandler)

const handler = method({
    get: authorizedHandler,
})

export default CORSMiddleware(handler)
