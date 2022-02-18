'use strict';

import express from "express";
import { retrieve } from "../controllers/news.controller";
const router = express.Router();

router.get("/news/:id", retrieve);

/**
 * @swagger
 * /api/news/{id}:
 *  get:
 *    summary: Get an article by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the article to get
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */

export default router;