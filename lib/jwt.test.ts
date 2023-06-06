import { generateToken, decodeToken } from './jwt'
import { decodedTokenObject } from '@/interfaces'

describe('JWT test', () => {
    test('it has to generate the token and decode it', () => {
        const payload = { userId: '1234abcd' }
        const token = generateToken(payload)
        const out = decodeToken(token as string)
        expect(out).toStrictEqual(payload)
    })
})
