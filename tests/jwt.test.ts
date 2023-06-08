import { generateToken, decodeToken } from '../lib/jwt'

describe('JWT test', () => {
    test('it has to generate the token and decode it', () => {
        const payload = { userId: '1234abcd' }
        const token = generateToken(payload)
        const out = decodeToken(token)
        const userId = out['userId']
        expect(userId).toStrictEqual(payload.userId)
    })
})
