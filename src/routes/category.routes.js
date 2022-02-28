'use strict';

import express from "express";
import { create, list } from "../controllers/category.controller";
import { createCategoryValidator } from '../middlewares/category.middleware';
const router = express.Router();

router.get("/categories", list);
router.post("/categories", createCategoryValidator, create);

/**
 * @swagger
 * /api/categories:
 *      get:
 *        summary: List all categories
 *        responses:
 *          '200':
 *            description: List with all categories
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *      post:
 *        summary: Create a category
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
 */

export default router;