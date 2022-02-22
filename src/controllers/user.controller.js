import { User } from "../models";



//GET USERS
export const profile = async (req, res) => {
  try {

  const user = await User.findAll({attributes:["firstName","lastName","email","image","createdAt","updatedAt","deletedAt",]});
  if (!user) {
  res.status(400).json({
  error: true,
  status: false,
  message: "The user was not found.",
  user: null,
  });
  }else{
  res.status(200).json({
  status: true,
  user,
  })}

  }catch (error) {
  return res.status(200).json({
  status: false,
  content: error,
  })}
};




//DELETE USERS
export const userDelete = async (req,res) =>{
  const id = req.params.id;
  if(!id){
  res.status(400).json({
  error:true,
  message:"ID is not provided"
  })
  }else{
  User.destroy({where:{id}})
  .then((result)=>{
  if(!result){
  res.status(404).json({message:"No user"});
  }else{
  res.status(200).json({message:"deleted users",result});
  }})
  .catch((error)=>{
  res.status(400).json({message:error});
  });
    
  }

}