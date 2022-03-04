import {testimony} from "../models";



export const getTestimony = async (req,res) =>{

    const testominio = await testimony.findAll({attributes:["id","image","content"]})
    res.send(testominio)

}

