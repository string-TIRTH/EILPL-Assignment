const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
const bookRouter = require('./routers/book.router')
const userRouter = require('./routers/user.router')
const transactionRouter = require('./routers/transaction.router')
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use('/books',bookRouter)
app.use('/users',userRouter)
app.use('/transactions',transactionRouter)
