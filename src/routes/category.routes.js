'use strict';

import express from "express";
import { list, create, update, destroy } from "../controllers/category.controller";
import { categoryValidator } from '../middlewares/category.middleware';
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware';
const router = express.Router();

router.get("/categories", isLoggedIn, isAdmin, list);
router.post("/categories", isLoggedIn, isAdmin, categoryValidator, create);
router.put("/categories/:id", isLoggedIn, isAdmin, categoryValidator, update);
router.delete("/categories/:id", isLoggedIn, isAdmin, destroy);

/**
 * @swagger
 * /api/categories:
 *      get:
 *        summary: List all categories
 *        tags:
 *          - Categories
 *        responses:
 *          '200':
 *            description: List with all categories
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *      post:
 *        summary: Create a category
 *        tags:
 *          -  Categories
 *        parameters:
 *          - in: body
 *            schema:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *        responses:
 *          '200':
 *            description: The new category
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 * 
 * /api/categories/{id}: 
 *      put:
 *        summary: Update an existing category
 *        tags:
 *          -  Categories
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id of the category to update
 *          - in: body
 *            schema:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *        responses:
 *          '200':
 *            description: The updated category
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *      delete:
 *        summary: Removes a category
 *        tags:
 *          -  Categories
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id of the category to delete
 *        responses:
 *          '200':
 *            description: Success message if the category was removed
 */

export default router;