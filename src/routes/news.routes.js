'use strict';

import express from "express";
import { retrieve, update } from "../controllers/news.controller";
import { updateNewsValidator } from '../middlewares/news.middleware';
const router = express.Router();

router.get("/news/:id", retrieve);
router.put("/news/:id", updateNewsValidator, update);

/**
 * @swagger
 * /api/news/{id}:
 *      get:
 *        summary: Get an entry by ID
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric ID of the entry to get
 *        responses:
 *          '200':
 *            description: Entry with the given ID
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *      put:
 *        summary: Update an entry
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric ID of the entry to update
 *          - in: body
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                content:
 *                  type: string
 *                image:
 *                  type: string
 *                categoryId:
 *                  type: integer
 *                type:
 *                  type: string
 *        responses:
 *          '200':
 *            description: The updated entry
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 */

export default router;