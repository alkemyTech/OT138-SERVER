"use strict";

import { Entry } from "../models";
import { paginate, responses } from "../helpers";

/**
 * Returns an instance of the Entry given by the 'id' param or an error object if not found.
 */
export const retrieve = async (req, res) => {
    const entryId = req.params.id;

    try {
        const instance = await Entry.findByPk(entryId);

        if (!instance) {
            return res.status(200).json({
                ...responses.notFound,
                message: 'Entry not found'
            });
        }

        return res.status(200).json({
            ...responses.success,
            result: instance,
        });
    } catch (err) {
        console.error(err);
        return res.status(200).json({
            ...responses.internalError,
        });
    }
};

/**
 * Updates an instance of the Entry given by the 'id' param with the data sent in the request body.
 */
export const update = async (req, res) => {
    const entryId = req.params.id;

    try {
        const instance = await Entry.findByPk(entryId);

        if (!instance) {
            return res.status(200).json({
                ...responses.notFound,
                message: 'Entry not found'
            });
        }

        // Update fields
        instance.set({
            ...req.body,
            deletedAt: instance.deletedAt,
            createdAt: instance.createdAt,
            updatedAt: Date.now(),
        });

        await instance.save();

        return res.status(200).json({
            ...responses.success,
            message: 'News entry updated',
            result: instance,
        });
    } catch (err) {
        console.error(err);
        return res.status(200).json({
            ...responses.internalError
        });
    }
};

export const create = async (req, res) => {
    try {
        await Entry.create({
            ...req.body,
            type: "news",
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        res.status(200).json({
            ...responses.success,
            message: 'News entry created',
            result: instances
        });
    } catch (err) {
        console.log(err);
        res.status(200).json({
            ...responses.internalError
        });
    }
};

export const destroy = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(200).json({
            ...responses.badRequest,
            message: 'Invalid id'
        });
    }

    try {
        const entry = await Entry.findOne({ where: { id: id } });

        if (!entry) {
            return res.status(200).json({
                ...responses.notFound,
                message: 'Entry not found'
            })
        }

        await Entry.destroy({ where: { id: id }, force: true });

        return res.status(200).json({
            ...responses.success,
            message: 'Entry deleted'
        });
    } catch (err) {
        return res.status(200).json({
            ...responses.internalError
        });
    }
};

export const list = async (req, res) => {
    try {
        const news = await paginate(
            Entry,
            req.query.limit,
            req.query.page,
            null,
            {
                type: "news",
            }
        );

        return res.status(200).json({
            ...responses.success,
            result: news
        });

    } catch (error) {
        return res.status(200).json({
            ...responses.internalError
        });
    }
};
