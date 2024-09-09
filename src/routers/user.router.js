const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
    router.post("/create",UserController.createUser); 
    router.post("/allUsers",UserController.getAllUsers); 
module.exports = router