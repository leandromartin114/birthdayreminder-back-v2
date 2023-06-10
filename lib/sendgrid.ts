import sgMail from '@sendgrid/mail'
import * as dotenv from 'dotenv'
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_APIKEY as string)

// Sending the code for auth/login
export async function sendCodeByEmail(email: string, code: number) {
    const msg = {
        to: email,
        from: 'birthdayreminder.web@gmail.com',
        subject: 'Código de validación',
        html: `<div style={display: "flex", align-items: "center", justify-items: "center", padding: 20px}>
            <img width="100px" height="100px" src="https://res.cloudinary.com/deooec1tp/image/upload/v1685025629/Birthday%20Reminder/birthdayreminder_slub4j.png" alt="logo"/>
            <h1>${code}</h1>
            <p>Con este código podés loguearte. Recordá que el mismo es válido durante 10 minutos</p>
        </div>
        `,
    }
    await sgMail.send(msg)
    return true
}

// Sending the reminder of a birthday by email
export async function sendReminderByEmail(email: string, fullName: string) {
    const msg = {
        to: email,
        from: 'birthdayreminder.web@gmail.com',
        subject: 'Recuerda este cumpleaños',
        html: `<div style={display: "flex", align-items: "center", justify-items: "center", padding: 20px}>
            <img width="100px" height="100px" src="https://res.cloudinary.com/deooec1tp/image/upload/v1685025629/Birthday%20Reminder/birthdayreminder_slub4j.png" alt="logo"/>
            <h1>Hoy es el cumpleaños de ${fullName}</h1>
            <p>Recordá saludar a esta persona especial y conseguirle un regalo</p>
        </div>
        `,
    }
    await sgMail.send(msg)
    return true
}

// Sending all the reminders
export async function sendAllReminders(array: []) {
    array.forEach(async (b: any) => {
        await sendReminderByEmail(b.email, b.fullName)
    })
    return true
}
