import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { newBirthday } from '@/controllers/birthday-controller'
import { authMiddleware, CORSMiddleware } from '@/middlewares'
import connectToMongo from '@/database/mongo'

//Creates a new birthday
async function postHandler(
    req: NextApiRequest,
    res: NextApiResponse,
    token: any
) {
    try {
        await connectToMongo()
        const birthday = await newBirthday(
            token.userId,
            req.body.date,
            req.body.fullName
        )
        if (!birthday) {
            res.status(400).send({ message: 'There was a problem' })
        } else {
            res.status(201).send({ message: 'Birthday saved' })
        }
    } catch (error) {
        res.status(400).send({ error: error })
    }
}

const authorizedHandler = authMiddleware(postHandler)

const handler = method({
    post: authorizedHandler,
})

export default CORSMiddleware(handler)
