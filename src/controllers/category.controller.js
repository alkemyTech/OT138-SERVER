'use strict';
import {paginate} from '../helpers'
import { Category } from '../models';

/**
 * List all categories
 */
export const list = async (req, res) => {
    try {
        const categories = await paginate(Category, req.query.limit, req.query.page)
        return res.status(200).json({
            error: false,
            status: "200",
            result: categories
        })
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            error: true,
            status: "500",
            message: "Internal error",
        });
    }
}

/**
 * Create a new Category
 * Receives the properties name and description in the body of the request
 */
export const create = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newCategory = await Category.create({
            name,
            description,
            createdAt: new Date()
        });

        return res.status(200).json({
            error: false,
            status: "200",
            data: newCategory,
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            error: true,
            status: "500",
            message: "Internal error",
        });
    }
}

/**
 * Updates an existing category
 * Receives the properties name and description in the body of the request
 */
export const update = async (req, res) => {
    const { name, description } = req.body;

    try {
        const instance = await Category.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!instance) {
            return res.status(200).json({
                error: true,
                status: "404",
                errorCode: "REQ001",
                message: "Category not found"
            })
        }

        instance.set({
            ...req.body,
            deletedAt: instance.deletedAt,
            createdAt: instance.createdAt,
            updatedAt: Date.now()
        });

        await instance.save();

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
            errorCode: "SRV001",
            message: "Internal error",
        });
    }
}

/**
 * Delete the category with id passed as a param in the request.
 */
export const destroy = async (req, res) => {
    try {
        const instance = await Category.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!instance) {
            return res.status(200).json({
                error: true,
                status: "404",
                errorCode: "REQ001",
                message: "Category not found"
            })
        }

        await instance.destroy();

        return res.status(200).json({
            error: false,
            status: "200",
            message: "Category deleted successfuly",
        });
    } catch (err) {
        console.error(err);
        return res.status(200).json({
            error: true,
            status: "500",
            errorCode: "SRV001",
            message: "Internal error",
        });
    }
}