const { sequelize } = require("../../config/mysql")
const { DataTypes } = require("sequelize")

const User = sequelize.define(
    "users",
    {
        nombreUsuario:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },              
        email:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },        
        password:{
            type:DataTypes.STRING
        },        
        idRol:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idStorage:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estadoSesion:{
            type:DataTypes.STRING,
            allowNull: false,            
        },
        estado:{
            type:DataTypes.STRING,
            allowNull: false,            
        },
    },{
        timestamps:true,
    }
)
User.findOneData = async function(id){        
    return await User.findOne({
        where:{ id:id}
    })
}
User.findAllData = async function(){
    return await User.findAll({})
}
User.findByIdAndUpdate =async function(id, body){
    return await User.update( 
        { 
            nickName: body.nickName,
            idRol: body.idRol,
            idStorage: body.idStorage,
            password:body.password,
            estado:body.estado
        }, 
        {where: { id }}
    );
}
//relaciones
module.exports = User;