const express = require("express");
const router = express.Router();
const BookController = require("../controllers/book.controller");
    router.post("/create",BookController.createBook); 
    router.get("/findBook/name",BookController.findBookByName); 
    router.get("/findBook/rent",BookController.findByRent); 
    router.get("/findBook/category-name-rent/",BookController.findBookByCategoryNameRent); 
module.exports = router