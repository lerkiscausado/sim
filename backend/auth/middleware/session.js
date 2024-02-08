const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey =getProperties()

const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "NEDD_SESSION",401)            
            return
        }
        const token = req.headers.authorization.split(" ").pop();
        const dataToken = await verifyToken(token)

        if(!dataToken){
            handleHttpError(res, "NOT_TOKEN_DATA", 401)            
            return
        }
        const query ={
            [propertiesKey.id]:dataToken[propertiesKey.id]
        }     
        // Consulta de usuarios Login
        const user = await usersModel.findOneData(dataToken[propertiesKey.id])
        //const user = await usersModel.findOne(query)
        //console.log("SESION USUARIO:", user.dataValues)     
        req.user=user
        next()
    } catch (error) {
        handleHttpError(res, "ERROR_SESSION", 401)        
    }
}


module.exports = authMiddleware
