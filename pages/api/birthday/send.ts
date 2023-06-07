import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendBirthdayReminders } from '@/controllers/birthday-controller'
import { CORSMiddleware } from '@/middlewares'

//Sends all birthdays
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const send = await sendBirthdayReminders()
        if (send === 'Nonexistent day') {
            res.status(200).send({ message: 'Nonexistent day' })
        }
        if (send === 'No birthdays today') {
            res.status(200).send({ message: 'No birthdays today' })
        } else if (send === 'Remainders sended') {
            res.status(200).send({ message: 'Remainders sended' })
        }
    } catch (error) {
        res.status(400).send({ error: error })
    }
}

const handler = method({
    get: getHandler,
})

export default CORSMiddleware(handler)
