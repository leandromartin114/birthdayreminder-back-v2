import request from 'supertest'
import * as dotenv from 'dotenv'
dotenv.config()

describe('Auth tests', () => {
    test('login should return the code and token endpoint should return token in an obj', async () => {
        const email = 'leandromartin_17@hotmail.com'
        const res = await request(process.env.API_URL)
            .post('/auth/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ email: email })
        const code = res.body.code
        const res2 = await request(process.env.API_URL)
            .post('/auth/token')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ email: email, code: code })
        expect(res2.status).toBe(200)
    })

    test('signup should return a message saying that the user already exists', async () => {
        const mockData = {
            email: 'leomessi@email.com',
            fullName: 'Lionel Messi',
        }
        const payload = 'The user already exists'
        const res = await request(process.env.API_URL)
            .post('/auth/signup')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(mockData)
        expect(res.status).toBe(400)
        expect(res.body.message).toStrictEqual(payload)
    })
})
