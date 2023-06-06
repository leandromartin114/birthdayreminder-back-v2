import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteBirthday } from '@/controllers/birthday.controller'
import { authMiddleware, CORSMiddleware } from '@/middlewares'

//Deletes a birthday
async function deleteHandler(
    req: NextApiRequest,
    res: NextApiResponse,
    token: any
) {
    try {
        const birthday = await deleteBirthday(
            token.userId,
            req.body.date,
            req.body.fullName
        )
        if (!birthday) {
            res.status(400).send({ message: 'There was a problem' })
        } else {
            res.status(200).send({ message: 'Birthday deleted' })
        }
    } catch (error) {
        res.status(400).send({ error: error })
    }
}

const authorizedHandler = authMiddleware(deleteHandler)

const handler = method({
    delete: authorizedHandler,
})

export default CORSMiddleware(handler)
