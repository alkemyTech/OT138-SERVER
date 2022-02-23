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