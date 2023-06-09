import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGO_URI as string

export const connectToMongo = async () => {
    try {
        mongoose.connect(uri)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Connection failed: ' + error)
    }
}

export const closeDBConnection = async () => {
    try {
        mongoose.disconnect()
        console.log('db connection closed')
    } catch (error) {
        console.error('Error in closeDBConnection => ', error)
    }
}
