const UserAdmin = require("../models/userAdmin");

module.exports.getUsers =  async function List(req,res){
await UserAdmin.findAll({attributes:["Name","Email"]}).then((response)=>{
res.json(response);
}).catch((e)=>{
res.json(e);
})}



