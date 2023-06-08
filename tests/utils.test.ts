import { emailCleaner } from '../lib/utils'

describe('Utils test', () => {
    test('it has to return a valid lowercase email', async () => {
        const payload = 'email@email.com'
        const emailMock = 'EMaiL@emaIl.com '
        const out = emailCleaner(emailMock)
        expect(out).toBe(payload)
    })
})
