import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendBirthdayReminders } from '@/controllers/birthday-controller'
import { CORSMiddleware } from '@/middlewares'
import connectToMongo from '@/database/mongo'

//Sends all birthdays
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToMongo()
        const send = await sendBirthdayReminders()
        if (send === null) {
            res.status(200).send({ message: 'Nonexistent day' })
        } else if (send === false) {
            res.status(200).send({ message: 'No birthdays today' })
        } else if (send === true) {
            res.status(200).send({ message: 'Remainders sended' })
        } else {
            res.status(400).send({ message: 'There was a problem' })
        }
    } catch (error) {
        res.status(400).send({ error: error })
    }
}

const handler = method({
    get: getHandler,
})

export default CORSMiddleware(handler)
