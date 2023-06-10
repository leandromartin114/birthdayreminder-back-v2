import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendBirthdayReminders } from '@/controllers/birthday-controller'
import { CORSMiddleware } from '@/middlewares'
import { connectToMongo } from '@/database/mongo'

//Sends all birthdays
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToMongo()
        const send = await sendBirthdayReminders()
        if (send.error) {
            res.status(400).send({ message: 'Error' })
        }
        if (send === 'Nonexistent day') {
            res.status(200).send({ message: 'Nonexistent day' })
        }
        if (send === 'No birthdays today') {
            res.status(200).send({ message: 'No birthdays today' })
        }
        if (send === 'Remainders sended') {
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
