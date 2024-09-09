const express = require("express");
const router = express.Router();
const { validationPOST, validationGET } = require("../middlewares/validation.middleware.js"); 
const bookValidator = require("../validators/book.validator.js"); 

const BookController = require("../controllers/book.controller");
    router.post("/create",validationPOST(bookValidator.createBook),BookController.createBook); 
    router.get("/findBook/name",validationGET(bookValidator.findBookByName),BookController.findBookByName); 
    router.get("/findBook/rent",validationGET(bookValidator.findByRent),BookController.findByRent); 
    router.get("/findBook/category-name-rent/",validationGET(bookValidator.findBookByCategoryNameRent),BookController.findBookByCategoryNameRent); 
    router.get("/allBooks",BookController.getAllBooks); 
module.exports = router