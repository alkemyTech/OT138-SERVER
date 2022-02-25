'use strict';

import express from "express";
import { create } from "../controllers/category.controller";
import { createCategoryValidator } from '../middlewares/category.middleware';
const router = express.Router();

router.post("/categories", createCategoryValidator, create);

/**
 * @swagger
 * /api/category:
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