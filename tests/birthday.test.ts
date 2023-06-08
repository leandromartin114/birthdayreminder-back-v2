import request from 'supertest'
import * as dotenv from 'dotenv'
dotenv.config()

describe('Birthday tests', () => {
    const mockBirthday = {
        fullName: 'uno mas',
        date: '12-17',
    }
    const newMessage = 'Birthday saved'
    const deleteMessage = 'Birthday deleted'

    test('birthday/new should return a message confirming the bd saved', async () => {
        const res = await request(process.env.API_URL)
            .post('/birthday/new')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'bearer ' + process.env.TEST_TOKEN)
            .send(mockBirthday)
        expect(res.status).toBe(201)
        expect(res.body.message).toStrictEqual(newMessage)
    })

    test('birthday/delete should return a message confirming the bd deleted', async () => {
        const res = await request(process.env.API_URL)
            .delete('/birthday/delete')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'bearer ' + process.env.TEST_TOKEN)
            .send(mockBirthday)
        expect(res.status).toBe(200)
        expect(res.body.message).toStrictEqual(deleteMessage)
    })
})
