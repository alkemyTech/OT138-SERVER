'use strict';

import express from "express";
import { retrieve, update, retrieveAll, create } from "../controllers/news.controller";
import { updateNewsValidator } from '../middlewares/news.middleware';
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware';
const router = express.Router();

router.get("/news/:id", retrieve);
router.put("/news/:id", updateNewsValidator, isLoggedIn, isAdmin, update);

router.get("/news", retrieveAll);
router.post("/news", updateNewsValidator, isLoggedIn, isAdmin, create);

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
 * /api/news:
 *      get:
 *          summary: Get all the entries of type 'news'
 *          responses:
 *              '200':
 *                  description: Array of all entries of type 'news'
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 */

export default router;