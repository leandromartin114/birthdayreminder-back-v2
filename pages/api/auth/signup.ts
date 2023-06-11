import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { signupAndSendCode } from '@/controllers/auth-controller'
import { bodySchemaMiddleware, CORSMiddleware } from '@/middlewares'
import { newUserBodySchema } from '@/lib/yupSchemas'
import { emailCleaner } from '@/lib/utils'
import connectToMongo from '@/database/mongo'

//Searches user and if it does not exist, creates a new one
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToMongo()
        const email = emailCleaner(req.body.email)
        const code = await signupAndSendCode(email, req.body.fullName)
        if (code.error) {
            res.status(400).send({ message: 'The user already exists' })
        } else {
            res.status(200).send({
                message: 'the code was sent to ' + email,
                code: code,
            })
        }
    } catch (error) {
        return res.status(400).send({ error })
    }
}

const validateHandler = bodySchemaMiddleware(newUserBodySchema, postHandler)

const handler = method({
    post: validateHandler,
})

export default CORSMiddleware(handler)
