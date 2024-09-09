const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rentPerDay: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
})
const BookModel = mongoose.model('book', BookSchema)
module.exports = BookModel