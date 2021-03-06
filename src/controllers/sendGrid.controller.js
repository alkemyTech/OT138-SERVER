const {sgMail,Message1,Message2} = require("../config/sendGrid");


//CONTACT FORM
export const ContactForm = async (req,res)=>{

    const {name,email,message} = req.body;
    if(!email || !message){
    res.status(400).json({message:"The corresponding data is not received",error: true,status: "400",})
    }else{
    try { 
    await sgMail.send(Message1(name,email,message))
    res.status(200).json({message:"Email sent",error: false,status: "200"})
    } catch (error) {   
    res.status(404).json({message:error,error: true,status: "404"})
    }

}}




//CONTACT FORM
export const RegistrationForm = async (req,res)=>{

    const {email} = req.body;
    if(!email){
    res.status(400).json({message:"The corresponding data is not received",error: true,status: "400",})
    }else{
    try { 
    await sgMail.send(Message2(email))
    res.status(200).json({message:"Email sent",error: false,status: "200"})
    } catch (error) {   
    res.status(404).json({message:error,error: true,status: "404"})
    }

}}

