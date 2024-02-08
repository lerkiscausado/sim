require("dotenv").config()
const express =require("express")
const cors =require("cors")
const dbConnectNoSql =require("./config/mongo");
const { dbConnectMySql } = require("./config/mysql");
//const swaggerUI=require("swagger-ui-express");
//const openApiConfiguration = require("./docs/swagger");

const ENGINE_DB=process.env.ENGINE_DB;
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))

const port = process.env.PORT || 3000
/**
 * Definir Rutas de Documentacion
 */
//app.use("/documentation",swaggerUI.serve,swaggerUI.setup(openApiConfiguration))
/**
 * Rutas
 */
app.use("/auth/api",require("./routes"))

app.listen(port, ()=>{
    console.log("Server Online http://localhost:"+port)
})

ENGINE_DB ==="nosql" ? dbConnectNoSql() : dbConnectMySql();