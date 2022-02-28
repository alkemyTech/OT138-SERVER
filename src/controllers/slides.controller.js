import {Slide} from "../models"


//GET SLIDER
export const SliderGet =  async (req,res) => {
    try {
        const slider = await Slide.findAll({attribute:["id","imageURl","text"]});
        if(!slider){
        res.status(400).json({
        message:"There is no slider",
        slider:[],
        error:true,
        status:"400"
        })}else{

        res.status(200).json({
        message:"Slides was successfully found.",
        slider,
        error:false,
        status:"200"
        })}
        
    }catch (error) {
        
        res.status(500).json({
        message:"An error ocurred in the extraction",
        slider:[],
        error:false,
        status:"500",
        content:error
        })
    }
}


//PUT SLIDER
export const SliderPut =  async (req,res) => {
    
        const {id,imageURL,text} = req.body;
        if(!id || !imageURL || !text){
        res.status(404).json({
        error: true,
        status: "404",
        message: "The corresponding data is not received",
        });
        }else{

        try { 
        const slider = await Slide.update({imageURL:imageURL,text:text,updatedAt:new Date()},{where:{id:id}});
        if(!slider){
        res.status(400).json({
        message:"There was an error updating the slider",
        error:true,
        status:"400"
        })
        }else{
        res.status(200).json({
        message:"Slider updated successfully",
        error:false,
        status:"200"
        })}

        }catch (error) {
        res.status(500).json({
        message:error,
        error:true,
        status:"500"
        })
    
    }}
}

//DELETE SLIDER
export const SliderDelete = async (req,res) =>{

      const {id} = req.body;
      if(!id){
      res.status(400).json({
      message:"ID is not provided",
      error:true,
      status:"400"
      })
      }else{
      Slide.destroy({where:{id}})
     .then((response)=>{res.status(200).json({message:"Slider removed",error:false,status:"200",response})})
     .catch((error)=>{res.status(500).json({message:error,status:"500",error:true})})
     }
}