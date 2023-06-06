import mongoose from 'mongoose'

const { Schema, model } = mongoose
mongoose.Promise = global.Promise

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: { unique: true },
    },
    fullName: {
        type: String,
        require: true,
    },
    birthdays: {
        type: Array,
    },
})

export default mongoose.models.User || model('User', userSchema)
