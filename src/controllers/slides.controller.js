import {Slide} from "../models"


//GET SLIDER
export const SliderGet =  async (req,res) => {
    try {
        const slider = await Slide.findAll({attribute:["id","imageURl","text"]});
        if(!slider){
        res.status(200).json({
        message: "An error ocurred in the extraction",
        slider: [],
        error: true,
        status: "500"
        })}else{
        res.status(200).json({
        message:"Slides was successfully found.",
        slider,
        error:false,
        status:"200"
        })}
        
    }catch (error) {
        
        res.status(200).json({
        message:"An error ocurred in the extraction",
        slider:[],
        error:true,
        status:"500",
        content:error
        })
    }
}


//POST SLIDER
export const SliderPost =  async (req,res) => {
       const {imageURL,text,order,organizationID} = req.body;
       if(!imageURL || !text || !order || !organizationID){
       res.status(200).json({
       message:"The corresponding data is not received",
       error: true,
       status: "404",
       })

       }else{
       try { 
       await Slide.create({imageURL:imageURL,text:text,order:order,organizationID:organizationID,createdAt:new Date(),updatedAt:new Date()})
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

        const {imageURL,text} = req.body;
        const id = req.params.id;
        if(!id || !imageURL || !text){
        res.status(200).json({
        error: true,
        status: "404",
        message: "The corresponding data is not received",
        });
        }else{
        try { 
        await Slide.update({imageURL:imageURL,text:text,updatedAt:new Date()},{where:{id:id}});
        res.status(200).json({
        message:"Slider updated successfully",
        error:false,
        status:"200"
        })

        }catch (error) {
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
      .then((response)=>{res.status(200).json({message:"Slider removed",error:false,status:"200",response})})
      .catch((error)=>{res.status(200).json({message:error,status:"500",error:true})})
      }
  }