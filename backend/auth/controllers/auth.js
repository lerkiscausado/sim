const { matchedData } = require("express-validator");
const {encrypt, compare} = require("../utils/handlePassword");
const { tokenSign }= require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { usersModel, storageModel, rolesModel, personasModel, slotsModel } = require("../models")
const ENGINE_DB=process.env.ENGINE_DB;

/**
 * controlador de Rgistro de Usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) =>{
    try {
        req=matchedData(req);
        const password = await encrypt(req.password)
        const body ={...req, password}
        console.log(body)
        const dataUser = await usersModel.create(body)
        dataUser.set("password",undefined, {strict:false})
    
        const data ={
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send({data})    
    } catch (error) {
        handleHttpError(res,"ERROR_REGISTER_USER")
    }
    
}

/**
 * Controlodor de Login sesion
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req =matchedData(req)
        let user;
        if (ENGINE_DB==='nosql'){
            user = await usersModel.findOne({email: req.email}).select("password name role email")
        }else{
            user = await usersModel.findOne(
                { 
                    where: { email: req.email },
                }
            )
            //user= await usersModel.findOneData(req.email)
        }

        
        
        if(!user){
            handleHttpError(res, "USER_NOT_EXIST", 404)
            return
        }
        
        const hashPassword = user.get('password');        
        const check = await compare(req.password, hashPassword)
        if(!check){
            handleHttpError(res,"PASSWORD_INVALID", 401)
            return
        }
        user.set('password', undefined, { strict:false })
        const data ={
            token: await tokenSign(user),
            user
        }
        res.send({ data })
    } catch (error) {
        handleHttpError(res,"ERROR_LOGIN_USER")
    }
}
/**
 * Obtener lista de base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems =async (req, res)=>{
    try {        
        const data = await usersModel.findAllData({})
        res.send({ data })    
    } catch (e) {
        handleHttpError(res,"ERROR_GET_ITEMS")
    }    
};

/**
 * Obtener Detalle de base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItem =async (req, res)=>{
    try {        
        req=matchedData(req);
        const {id}=req;        
        const data = await usersModel.findOneData(id)
        res.send({ data })    
    } catch (e) {
        handleHttpError(res,"ERROR_GET_ITEM")
    }    
};

const updateItem =async(req, res)=>{
    try {
        //const password = await encrypt(req.password)
        
        const { id, ...body } =matchedData(req)      
        body.password = await encrypt(body.password)
        console.log(id,body)          
        const data = await usersModel.findByIdAndUpdate(id, body);        
        res.send({data}) 
    } catch (error) {
        handleHttpError(res,"ERROR_UPDATE_ITEM")
    }  
};
const updateSesion =async(req, res)=>{
    try {        
        
        const { id, ...body } =matchedData(req)              
        console.log(id,req.body)          
        const data = await usersModel.updateSesion(id, req.body);        
        res.send({data}) 
    } catch (error) {
        handleHttpError(res,"ERROR_UPDATE_SESION")
    }  
};
module.exports = { registerCtrl, loginCtrl , getItems, getItem, updateItem, updateSesion }