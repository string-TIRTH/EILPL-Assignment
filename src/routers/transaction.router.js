const express = require("express");
const router = express.Router();
const { validationPOST, validationGET } = require("../middlewares/validation.middleware.js"); 
const transactionValidator = require("../validators/transaction.validator.js"); 

const TransactionController = require("../controllers/transaction.controller");
    router.post("/issueBook",validationPOST(transactionValidator.issueBook),TransactionController.issueBook); 
    router.post("/returnBook",validationPOST(transactionValidator.returnBook),TransactionController.returnBook); 
    router.get("/issues/bookName",validationGET(transactionValidator.getIssueListByBookName),TransactionController.getIssueListByBookName); 
    router.get("/issues/userId",validationGET(transactionValidator.getIssueListByUserId),TransactionController.getIssueListByUserId); 
    router.get("/rent/bookName",validationGET(transactionValidator.rentGeneratedByBookName),TransactionController.rentGeneratedByBookName); 
    router.get("/issues/range",validationGET(transactionValidator.getIssuesByDateRange),TransactionController.getIssuesByDateRange); 
module.exports = router