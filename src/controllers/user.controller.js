import { User } from "../models";


export const profile = async (req, res) => {
  try {

  const user = await User.findAll({attributes:["firstName","lastName","email","image","createdAt","updatedAt","deletedAt",]});

  if (!user) {
  res.status(200).json({
  error: true,
  status: "404",
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