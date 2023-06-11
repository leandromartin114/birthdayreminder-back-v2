import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const URI = process.env.MONGO_URI as string

if (!URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectToMongo() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default connectToMongo

// export const connectToMongo = async () => {
//     try {
//         await mongoose.connect(URI)
//         console.log('Connected to MongoDB')
//     } catch (error) {
//         console.error('Connection failed: ' + error)
//         process.exit(1)
//     }
// }
