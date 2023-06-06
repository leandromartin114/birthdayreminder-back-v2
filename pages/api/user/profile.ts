import type { NextApiRequest, NextApiResponse } from 'next'
import method from 'micro-method-router'
import { authMiddleware, CORSMiddleware } from '@/middlewares'
import { getProfileData } from '@/controllers/user.controller'

//Gets user info
async function getHandler(
    req: NextApiRequest,
    res: NextApiResponse,
    token: any
) {
    try {
        const userData = await getProfileData(token.userId)
        if (userData) {
            res.status(200).send(userData)
        } else {
            res.status(400).send({ message: "There isn't user data" })
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
