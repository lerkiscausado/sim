const express = require("express");
const router = express.Router();
const { validatorRegister, validatorLogin, validatorUpdateItem, validatorGetItem }= require("../validators/auth");
const { registerCtrl, loginCtrl , getItems, getItem, updateItem, updateSesion} = require("../controllers/auth");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");


router.post("/register", validatorRegister, registerCtrl)
router.post("/login",validatorLogin, loginCtrl);
router.get("/users", authMiddleware,getItems)
//router.get("/users/:id", authMiddleware,validatorGetItem, getItem) 
//router.put("/users/:id", authMiddleware,validatorGetItem,validatorUpdateItem,updateItem) 
//router.put("/sesion/:id", authMiddleware,validatorGetItem,updateSesion) 

module.exports= router;