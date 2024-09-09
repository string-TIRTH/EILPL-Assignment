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
    returnDate: {
        type: String,
    },
    payAbleAmount: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Issued", "Returned"],
        default: "Issued"
    },
})
const TransactionModel = mongoose.model('transaction', TransactionSchema)
module.exports = TransactionModel