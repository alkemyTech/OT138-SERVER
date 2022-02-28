'use strict';

import { Category } from '../models';

/**
 * List all categories
 */
export const list = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json({
            error: false,
            status: "200",
            data: categories
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