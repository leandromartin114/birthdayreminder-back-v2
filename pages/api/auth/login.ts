import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { loginAndSendCode } from '@/controllers/auth.controller'
import { emailCleaner } from '@/lib/utils'
import { CORSMiddleware } from '@/middlewares'

//Searches user by email and if it does exist generates a code and sends it by email
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const email = emailCleaner(req.body.email)
        const code = await loginAndSendCode(email)
        if (code) {
            return res
                .status(200)
                .send({ message: 'the code was sent to ' + email, code: code })
        } else {
            return res.status(400).send({ message: "the user doesn't exist" })
        }
    } catch (error) {
        return res.status(400).send({ message: 'error: ' + error })
    }
}

const handler = method({
    post: postHandler,
})

export default CORSMiddleware(handler)
