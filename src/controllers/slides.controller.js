import {Slide} from "../models"
import {paginate} from '../helpers'

//GET ALL SLIDER
export const SliderGet =  async (req,res) => {

    try {
        const slider = await paginate(Slide, req.query.limit, req.query.page)
        res.status(200).json({
        error:false,
        message:"",
        status:"200",
        slider
        })
    } catch (error) {
        res.status(200).json({
        error: true,
        status: "500",
        message: "Internal error",
        slider:[],
        content:error
        });
    }
}


//POST SLIDER
export const SliderPost =  async (req,res) => {

    const {text,order,organizationID, image} = req.body;

    if(!image || !text || !order || !organizationID){
        res.status(200).json({
        message:"Error al crear el Slider",
        error: true,
        status: "404",
        })
    } else{
       try { 
        await Slide.create({imageURL:image,text:text,order:order,organizationID:organizationID,createdAt:new Date(),updatedAt:new Date()})
            res.status(200).json({
            message:"Slider created successfully",
            error:false,
            status:"200"
        })
        }catch (error) {
            res.status(200).json({
            message:error,
            error:true,
            status:"500"
        })
       }
    }

}



//PUT SLIDER
export const SliderPut =  async (req,res) => {
    const { image, text, order, organizationID } = req.body;
    const id = req.params.id;
    if(!id || !image || !text || !order || !organizationID){
        res.status(200).json({
        error: true,
        status: "404",
        message: "The corresponding data is not received",
        });
    } else {
    try { 
        await Slide.update({imageURL:image,text:text,order:order,organizationID:organizationID,updatedAt:new Date()},{where:{id:id}});
            res.status(200).json({
            message:"Slider updated successfully",
            error:false,
            status:"200"
        })
    } catch (error) {
    res.status(200).json({
        message:error,
        error:true,
        status:"500"
    })
}}


}

//DELETE SLIDER
export const SliderDelete = async (req,res) =>{

       const id = req.params.id;
       if(!id){
       res.status(200).json({
       message:"ID is not provided",
       error:true,
       status:"400"
       })
       }else{
       Slide.destroy({where:{id}})
       .then((response)=>{
       if(response === 0){
       res.status(200).json({message:"There is no slider",status:"500",error:true})
       }else{
       res.status(200).json({message:"Slider removed",error:false,status:"200",response})
       }})
       .catch((error)=>{res.status(200).json({message:error,status:"500",error:true})})
       }
       }