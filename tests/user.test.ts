import request from 'supertest'
import * as dotenv from 'dotenv'
dotenv.config()

describe('User tests', () => {
    const email = 'leandromartin_17@hotmail.com'
    const mockData = {
        email: 'leandromartin_17@hotmail.com',
        fullName: 'Leandrito',
    }

    test('profile should return an object with the user data', async () => {
        const res = await request(process.env.API_URL)
            .get('/user/profile')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'bearer ' + process.env.TEST_TOKEN)
        expect(res.status).toBe(200)
        expect(res.body.email).toStrictEqual(email)
    })

    test('update should return an object with the updated data', async () => {
        const res = await request(process.env.API_URL)
            .patch('/user/update')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'bearer ' + process.env.TEST_TOKEN)
            .send(mockData)
        expect(res.status).toBe(200)
        expect(res.body.email).toStrictEqual(email)
    })

    test('birthdays should return an array with all the birthdays saved by the user', async () => {
        const res = await request(process.env.API_URL)
            .get('/user/birthdays')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'bearer ' + process.env.TEST_TOKEN)
        expect(res.status).toBe(200)
    })
})
