import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CORSMiddleware } from '@/middlewares'

//Home
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        return res
            .status(200)
            .send({ message: 'Welcome to the Birthdayreminder API' })
    } catch (error) {
        return res.status(400).send({ message: 'error: ' + error })
    }
}

const handler = method({
    get: getHandler,
})

export default CORSMiddleware(handler)
