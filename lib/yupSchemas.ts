import * as yup from 'yup'

const newUserBodySchema = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        fullName: yup.string().required(),
    })
    .noUnknown(true)
    .strict()

const getTokenBodySchema = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        code: yup.number().required(),
    })
    .noUnknown(true)
    .strict()

const birthdayBodySchema = yup
    .object()
    .shape({
        date: yup.string().required(),
        fullName: yup.string().required(),
    })
    .noUnknown(true)
    .strict()

export { newUserBodySchema, getTokenBodySchema, birthdayBodySchema }
