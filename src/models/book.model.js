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
        type: Number,
        required: true
    }
})

BookSchema.index({ bookName: 1 });  
BookSchema.index({ rentPerDay: 1 });  
BookSchema.index({ category: 1, bookName: 1, rentPerDay: 1 });

const BookModel = mongoose.model('book', BookSchema)
module.exports = BookModel