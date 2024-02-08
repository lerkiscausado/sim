const { Sequelize } = require("sequelize")

const database = process.env.MYSQL_DATABASE;
const username  = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect:"mysql",
        timezone: '-05:00',
    }
)

const dbConnectMySql = async () =>{
    try {
        await sequelize.authenticate()
        console.log("** MYSQL CONEXION CORRECTA **")
    } catch (error) {
        console.log("Mysql ERROR de Conexion", error)
    }
}

module.exports = { sequelize, dbConnectMySql }