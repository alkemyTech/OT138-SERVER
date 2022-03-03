"use strict";

import { Entry } from "../models";

/**
 * Returns an instance of the Entry given by the 'id' param or an error object if not found.
 */
export const retrieve = async (req, res) => {
    const entryId = req.params.id;

    try {
        const instance = await Entry.findByPk(entryId);

        if (!instance) {
            return res.status(200).json({
                error: true,
                status: "404",
                message: "Entry not found",
            });
        }

        return res.status(200).json({
            error: false,
            status: "200",
            data: instance,
        });

    } catch (err) {
        console.error(err);
        return res.status(200).json({
            error: true,
            status: "500",
            message: "Internal error",
        });
    }
}

/**
 * Updates an instance of the Entry given by the 'id' param with the data sent in the request body.
 */
 export const update = async (req, res) => {
    const entryId = req.params.id;

    try {
        const instance = await Entry.findByPk(entryId);

        if (!instance) {
            return res.status(200).json({
                error: true,
                status: "404",
                message: "Entry not found",
            });
        }

        // Update fields
        instance.set({
            ...req.body,
            deletedAt: instance.deletedAt,
            createdAt: instance.createdAt,
            updatedAt: Date.now()
        })

        await instance.save()

        return res.status(200).json({
            error: false,
            status: "200",
            data: instance,
        });

    } catch (err) {
        console.error(err);
        return res.status(200).json({
            error: true,
            status: "500",
            message: "Internal error",
        });
    }
}

/**
Finds all the instances of Entry of type 'news' and retrieve its name, image and createdAt fields,
or an error if the instances wasn't found, or if there is a server error.
*/
export const retrieveAll = async (req, res) => {

    try{
        const instances = await Entry.findAll({
            where: {type: 'news'},
            attributes: ['name', 'image', 'createdAt']
        });
        if(!instances){
            res.status(200).json({
                error: true,
                status: "404",
                message: "Entries not found"
            })
        } else{
            res.json({
                error: false,
                status: "200",
                data: instances
            })
        }
    } catch(error){
        res.status(200).json({
            error: true,
            status: "500",
            message: "Internal server error"
        })
    }
}

export const create = async (req, res) => {

    try{
        await Entry.create({
            ...req.body,
            type: 'news',
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        res.status(200).json({
            error: false,
            status: "200"
        })

    } catch(err) {
        console.log(err);
        res.status(200).json({
            error: true,
            status: "500",
            message: "Internal server error"
        })
    }
}

export const deleteNews = async (req,res) => {


    const {id} = req.params;
    if(!id){
    res.status(200).json({
    message:"ID is not provided",
    error:true,
    status:"404"
    })
    }else{
    await Entry.destroy({where:{id:id},force:true})
    .then((response)=>{
    if(response === 0){
    res.status(200).json({error:true,errorCode:"REQ001",errorFields:[],status:"404",message:"Entry does not exist",result:{response}})
    }else{
    res.status(200).json({error:false,status:"200",errorFields:[],message:"Entry was removed",result:{response}})
    }})
    .catch((error)=>{
    res.status(200).json({error:true,errorCode:"SRV001",errorFields:[],status:"500",message:"Could not connect to server",result:{error}})
    })
    }



}
