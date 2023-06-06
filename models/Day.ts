import mongoose from 'mongoose'

const { Schema, model } = mongoose
mongoose.Promise = global.Promise

const daySchema = new Schema({
    date: {
        type: String,
        require: true,
    },
    birthdays: {
        type: Array,
    },
})

export default mongoose.models.Day || model('Day', daySchema)
