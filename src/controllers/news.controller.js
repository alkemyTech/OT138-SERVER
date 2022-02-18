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