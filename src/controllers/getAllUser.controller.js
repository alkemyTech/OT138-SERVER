import { User } from "../models";


export const list = async (req, res) => {
  try {

  const user = await User.findAll();

  if (!user) {
  res.status(200).json({
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
