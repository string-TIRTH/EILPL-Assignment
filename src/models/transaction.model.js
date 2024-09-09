const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    bookName: {
        type: String,
        required: true
    },
    issueDate: {
        type: String,
        required: true
    },
    rentPerDay: {
        type: Number,
        required:true
    },
    returnDate: {
        type: String,
    },
    payAbleAmount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["Issued", "Returned"],
        default: "Issued"
    },
})

TransactionSchema.index({ bookName: 1 });  
TransactionSchema.index({ userId: 1 });  
TransactionSchema.index({ issueDate: 1 });  


const TransactionModel = mongoose.model('transaction', TransactionSchema)
module.exports = TransactionModel