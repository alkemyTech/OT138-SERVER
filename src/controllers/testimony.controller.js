import {testimony} from "../models";





//GET TESTIMONY
export const getTestimony = async (req,res) =>{

    try {
        
        const testimonyData = await testimony.findAll({attributes:["id","name","image","content"]})
        if(!testimonyData){
            res.status(200).json({
            error: true,
            errorCode: "REQ001",
            errorFields: [],
            status: "404",
            message: "Testimonials not found",
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




//GET ONE TESTIMONY
export const getOneTestimony = async (req,res) =>{

    
        
        const {id} = req.params;
        const testimonyData = await testimony.findOne({where:{id:id}})
        if(!testimonyData){
            res.status(200).json({
            error: true,
            errorCode: "REQ001",
            errorFields: [],
            status: "404",
            message: "Testimonials not found",
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

   

        }


//CREATE TESTIMONY
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


    }catch (error) {
            res.status(200).json({
            error: true,
            errorCode: "SRV001",
            errorFields: [],
            status: "500",
            message: "Server error",
            result: error,
          });
    }}






//UPDATED TESTIMONY
export const putTestimony = async (req,res) =>{

            const {id} = req.params;
            const {name,image,content} = req.body;
            if(!id || !name || !image || !content){
            res.status(200).json({
            error: true,
            errorCode: "REQ002",
            errorFields: [],
            status: "404",
            message: "invalid request",
            result: [],
            })

            }else{

            const consultation = await testimony.findOne({where:{id:id}});
            if(!consultation){
            res.status(200).json({
            error: true,
            errorCode: "REQ001",
            errorFields: [],
            status: "404",
            message: "resource not found",
            result: [],
            })

            }else{
            try {
            await testimony.update({name:name,image:image,content:content},{where:{id:id}});
            res.status(200).json({
            error: false,
            errorCode: "",
            errorFields: [],
            status: "200",
            message: "Updated testimony",
            result: null,
            })

        } catch (error) {
            
            res.status(200).json({
            error: true,
            errorCode: "SRV001",
            errorFields: [],
            status: "500",
            message: "Server error",
            result: error,
            });
        }}}
   
}






//DELETE TESTIMONY        
export const deleteTestimony = async (req,res) =>{

        
            const {id} = req.params;
            if(!id){
            res.status(200).json({
            error: true,
            errorCode: "REQ002",
            errorFields: [],
            status: "404",
            message: "invalid request",
            result: [],
            })

           }else{

           try {
            const testimonyData = await testimony.destroy({where:{id:id}});
            if(!testimonyData){
            res.status(200).json({
            error: true,
            errorCode: "REQ001",
            errorFields: [],
            status: "404",
            message: "the id does not exist",
            result: testimony,
            })


            }else{
            res.status(200).json({
            error: false,
            errorCode: "",
            errorFields: [],
            status: "200",
            message: "testimonial deleted",
            result: null,
            })}
          

        }catch (error) {
            
            res.status(200).json({
            error: true,
            errorCode: "SRV001",
            errorFields: [],
            status: "500",
            message: "Server error",
            result: error,
            });}

         }}
    
