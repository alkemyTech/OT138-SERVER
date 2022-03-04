import {testimony} from "../models";



export const getTestimony = async (req,res) =>{

    try {
        
        const testimonyData = await testimony.findAll({attributes:["id","image","content"]})
        if(!testimonyData){
            res.status(200).json({
            error: true,
            errorCode: "REQ001",
            errorFields: [],
            status: "404",
            message: "News not found",
            result: testimony,
            });
        
            }else{
            res.status(200).json({
            error: false,
            errorCode: "",
            errorFields: [],
            status: "200",
            message: "Testimonials found",
            result: testimonyData,
            });}

    } catch (error) {
            res.status(200).json({
            error: true,
            errorCode: "SRV001",
            errorFields: [],
            status: "500",
            message: "Server error",
            result: error,
          });

    }
}



export const postTestimony = async (req,res) =>{

    try {
        const {name,image,content} = req.body;
        if(!name || !image || !content){
            res.status(200).json({
            error: true,
            errorCode: "REQ002",
            errorFields: [],
            status: "404",
            message: "invalid request",
            result: [],
            })
        }else{

            const testimonyData = await testimony.create({name,image,content,createdAt:new Date(),updatedAt:new Date()})
            if(!testimonyData){
            res.status(200).json({
            error: true,
            errorCode: "REQ001",
            errorFields: [],
            status: "404",
            message: "resource not found",
            result: testimony,
            });
            
            }else{
            res.status(200).json({
            error: false,
            errorCode: "",
            errorFields: [],
            status: "200",
            message: "testimonial saved successfully",
            result: testimonyData,
            });}
        }


    } catch (error) {
            res.status(200).json({
            error: true,
            errorCode: "SRV001",
            errorFields: [],
            status: "500",
            message: "Server error",
            result: error,
          });

    }
}
