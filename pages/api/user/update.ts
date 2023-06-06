import type { NextApiRequest, NextApiResponse } from 'next'
import method from 'micro-method-router'
import {
    authMiddleware,
    bodySchemaMiddleware,
    CORSMiddleware,
} from '@/middlewares'
import { updateProfileData } from '@/controllers/user.controller'
import { newUserBodySchema } from '@/lib/yupSchemas'
import { emailCleaner } from '@/lib/utils'

//Updates user info
async function patchHandler(
    req: NextApiRequest,
    res: NextApiResponse,
    token: any
) {
    try {
        const email = emailCleaner(req.body.email)
        const userUpdated = await updateProfileData(
            token.userId,
            email,
            req.body.fullName
        )
        res.status(200).send(userUpdated)
    } catch (error) {
        res.status(400).send({ error: error })
    }
}

const authorizedHandler = authMiddleware(patchHandler)

const validateHandler = bodySchemaMiddleware(
    newUserBodySchema,
    authorizedHandler
)

const handler = method({
    patch: validateHandler,
})

export default CORSMiddleware(handler)
