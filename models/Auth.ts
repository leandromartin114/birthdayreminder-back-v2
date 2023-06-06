import mongoose from 'mongoose'

const { Schema, model } = mongoose
mongoose.Promise = global.Promise

const authSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: { unique: true },
    },
    code: {
        type: Number,
        require: true,
    },
    expires: {
        type: Date,
        require: true,
    },
    userId: {
        type: String,
        require: true,
    },
})

export default mongoose.models.Auth || model('Auth', authSchema)
