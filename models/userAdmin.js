const {Model,DataTypes,Sequelize} = require("sequelize");


//WE DEFINE THE PARAMETERS TO THE DATABASE CONNECTION
//USANDO LOS PROPIEDADES DEL ARCHIVO //.env.example// NO ME FUNCIONO
const sequelize = new Sequelize("ong","root","",{
host:"localhost",
dialect:"mysql"
});



//WE DEFINE THE TABLE
sequelize.define("users",{
Id:{type:Sequelize.INTEGER,primaryKey:true},
Name:Sequelize.STRING,
Email:Sequelize.STRING,
Password:Sequelize.STRING
},{freezeTableName: true,tableName:"users"});



//BASE CONNECTION
sequelize.authenticate()
.then(()=>{console.log("CONNECTED TO THE DATABASE")})
.catch((e)=>{console.log("ERRROR IN: ",e)})
    


//WE STARTED THE MODEL
class UserAdmin extends Model{};
UserAdmin.init({
Id:{type:DataTypes.NUMBER,primaryKey:true},
Name:DataTypes.STRING,
Email:DataTypes.STRING,
Password:DataTypes.STRING
},{sequelize,tableName:"users"});



module.exports = UserAdmin;