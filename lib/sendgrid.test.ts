import { sendCodeByEmail, sendReminderByEmail } from './sendgrid'

describe('SendGrid test', () => {
    test('it has to send the code and return true', async () => {
        const payload = true
        const mockEmail = 'leandromartin_17@hotmail.com'
        const mockCode = 12345
        const out = await sendCodeByEmail(mockEmail, mockCode)
        expect(out).toBe(payload)
    })

    test('it has to send the reminder and return true', async () => {
        const payload = true
        const mockEmail = 'leandromartin_17@hotmail.com'
        const mockName = 'José'
        const out = await sendReminderByEmail(mockEmail, mockName)
        expect(out).toBe(payload)
    })
})
