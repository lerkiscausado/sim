const jwt= require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey =getProperties()

/**
 * Parametro Objeto Usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            [propertiesKey.id]:user[propertiesKey.id],
            role: user. role,
        },
        JWT_SECRET,
        {
            expiresIn:"12h"
        }
    )
    return sign
}


/**
 * Parametro Token de session JWT
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) =>{
    try {
        return jwt.verify(tokenJwt,JWT_SECRET)
    } catch (error) {
        return null
    }
}

module.exports = { tokenSign ,verifyToken}