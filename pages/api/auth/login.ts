import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { loginAndSendCode } from '@/controllers/auth-controller'
import { emailCleaner } from '@/lib/utils'
import { CORSMiddleware } from '@/middlewares'
import { connectToMongo, closeDBConnection } from '@/database/mongo'

//Searches user by email and if it does exist generates a code and sends it by email
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToMongo()
        const email = emailCleaner(req.body.email)
        const code = await loginAndSendCode(email)
        if (code.error) {
            res.status(400).send({ message: "the user doesn't exist" })
        } else {
            res.status(200).send({
                message: 'the code was sent to ' + email,
                code: code,
            })
        }
        await closeDBConnection()
    } catch (error) {
        return res.status(400).send({ message: 'error: ' + error })
    }
}

const handler = method({
    post: postHandler,
})

export default CORSMiddleware(handler)
