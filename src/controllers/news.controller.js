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