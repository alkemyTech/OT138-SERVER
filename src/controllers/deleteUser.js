import { User } from "../models";

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