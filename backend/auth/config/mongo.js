const mongoose = require("mongoose")


const dbconnect =() => {
    const DB_URI= process.env.DB_URI;
    mongoose.connect(
        DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        },(err,res)=>{
            if(!err){
                console.log("** NOSQL CONEXION CORRECTA **")
            }else{
                console.log("** ERROR CONEXION **")
            }
        });
}

module.exports= dbconnect