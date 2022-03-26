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
 *        tags:
 *          - News
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
 *        tags:
 *          - News
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
 *      delete:
 *        summary: Deletes a new
 *        description: Deletes a entry of type 'news'
 *        tags:
 *          - News
 *        parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *          required: true
 *        responses:
 *          200:
 *            description: A success response object
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: boolean
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *      
 * /api/news:
 *    get:
 *      summary: Get all the entries of type 'news'
 *      tags:
 *      - News
 *      parameters:
 *        - in: query
 *          name: limit
 *          type: integer
 *          required: true
 *        - in: query
 *          name: page
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: A success response object with an array of all the entries that fits on limit and pagination
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: boolean
 *              status:
 *                type: string
 *              message:
 *                type: string
 *              result:
 *                type: object
 *                properties:
 *                  next:
 *                    type: object
 *                    properties:
 *                      page:
 *                        type: integer
 *                      limit:
 *                        type: integer
 *                  items:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        name:
 *                          type: string
 *                        content:
 *                          type: string
 *                        image:
 *                          type: string
 *                        categoryId:
 *                          type: integer
 *                        type: 
 *                          type: string
 *                        deletedAt:
 *                          type: string
 *                        createdAt:
 *                          type: string
 *                        updatedAt: 
 *                          type: string
 *                                
 *    post:
 *      summary: Create a new entry of type "news"
 *      tags:
 *        - News
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: body
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - content
 *            properties:
 *              name:
 *                type: string
 *              categoryId:
 *                  type: integer
 *              image:
 *                type: string
 *              content:
 *                type: string
 *      responses:
 *        200:
 *          description: Object with successfully status description
 *          schema:
 *            type: object
 *            properties:
 *                error:
 *                  type: boolean
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *                result:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    name:
 *                      type: string
 *                    content:
 *                      type: string
 *                    image:
 *                      type: string
 *                    categoryId:
 *                      type: integer
 *                    type: 
 *                      type: string
 *                    deletedAt:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                    updatedAt: 
 *                      type: string
 *                    
 *                    
 */

export default router;
