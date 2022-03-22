"use strict";

import express from "express";
import {
  retrieve,
  update,
  create,
  destroy,
  list,
} from "../controllers/news.controller";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware";
import fileStorageMiddleware from "../middlewares/fileStorage.middleware";

const router = express.Router();

router.get("/news", list);
router.get("/news/:id", retrieve);
router.put("/news/:id", isLoggedIn, isAdmin, fileStorageMiddleware("image"), update);
router.delete("/news/:id", isLoggedIn, isAdmin, destroy);
router.post("/news", isLoggedIn, isAdmin, fileStorageMiddleware("image"), create);

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
 *      post:
 *          summary: Create a new entry of type "news"
 *          parameters:
 *            - in: body
 *              schema:
 *                  type: object
 *                  required:
 *                      - name
 *                      - content
 *                  properties:
 *                      name:
 *                          type: string
 *                      categoryId:
 *                          type: integer
 *                      image:
 *                          type: string
 *                      content:
 *                          type: string
 *          responses:
 *              '200':
 *                  description: Object with successfully status description
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 */

export default router;
