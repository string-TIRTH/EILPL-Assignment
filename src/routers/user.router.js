const express = require("express");
const router = express.Router();
const { validationPOST, validationGET } = require("../middlewares/validation.middleware.js"); 
const userValidator = require("../validators/user.validator.js"); 
const UserController = require("../controllers/user.controller");
    router.post("/create",validationPOST(userValidator.createUser),UserController.createUser); 
    router.post("/allUsers",UserController.getAllUsers); 
module.exports = router