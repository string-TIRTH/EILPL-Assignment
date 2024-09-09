const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transaction.controller");
    router.post("/issueBook",TransactionController.issueBook); 
    router.post("/returnBook",TransactionController.returnBook); 
    router.get("/issues/bookName",TransactionController.getIssueListByBookName); 
    router.get("/issues/userId",TransactionController.getIssueListByUserId); 
    router.get("/rent/bookName",TransactionController.rentGeneratedByBookName); 
    router.get("/issues/range",TransactionController.getIssuesByDateRange); 
module.exports = router