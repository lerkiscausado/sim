const { check } =require("express-validator")
const validateResults=require("../utils/handleValidator")

const validatorRegister=[
    check("nombreUsuario").exists().notEmpty().isLength({min:3, max:99}),    
    check("password").exists(),
    check("email").exists().notEmpty().isEmail(),    
    check("idRol").exists(),
    check("idStorage").exists(),   
    check("estadoSesion").exists(), 
    check("estado").exists(),
    (req, res, next)=> validateResults(req,res,next)
]

const validatorLogin=[
    check("password").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    (req, res, next)=> validateResults(req,res,next)
]

const validatorGetItem=[
    check("id").exists().notEmpty(),
    (req, res, next)=> validateResults(req,res,next)
]

const validatorUpdateItem=[    
    check("nombreUsuario").exists(),    
    check("idRol").exists().notEmpty(),
    check("idStorage").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("estadoSesion").exists().notEmpty(),
    check("estado").exists().notEmpty(),
    (req, res, next)=> validateResults(req,res,next)
]

module.exports ={ validatorRegister , validatorLogin, validatorGetItem, validatorUpdateItem };