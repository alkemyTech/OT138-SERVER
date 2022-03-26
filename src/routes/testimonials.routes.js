const express = require("express");
const router = express.Router();
import {
  getTestimony,
  postTestimony,
  putTestimony,
  deleteTestimony,
  getOneTestimony,
} from "../controllers/testimony.controller";
import fileStorageMiddleware from "../middlewares/fileStorage.middleware";

router.get("/testimonials", getTestimony);
router.get("/testimonials/:id", getOneTestimony);
router.post("/testimonials", fileStorageMiddleware("image"), postTestimony);
router.put("/testimonials/:id", fileStorageMiddleware("image"), putTestimony);
router.delete("/testimonials/:id", deleteTestimony);

export default router;

/**
 * @swagger
 * 
 * /api/testimonials:
 *  get:
 *      description: Get all the testimonies
 *      summary: Get all the testimonies
 *      tags:
 *      - Testimonials
 *      parameters:
 *      - in: query
 *        name: limit
 *        type: integer
 *        required: true
 *      - in: query
 *        name: page
 *        type: integer
 *        required: true
 *      responses:
 *        200:
 *          description: A success response object with an array with the testimonials data
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
 *  post:
 *    description: Creates a new testimonial
 *    summary: Create a testimonial
 *    tags:
 *    - Testimonials
 *    consumes: multipart/form-data
 *    parameters:
 *    - in: formData
 *      name: name
 *      type: string
 *      required: true
 *    - in: formData
 *      name: image
 *      type: file
 *      required: true
 *    - in: formData
 *      name: content
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: A success response object
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *            status:
 *              type: string
 *            message:
 *              type: string
 *            result:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                image:
 *                  type: string
 *                content:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 * 
 * /api/testimonials/{id}:
 *  get:
 *    description: Get a testimony
 *    summary: Get a testimony
 *    tags:
 *    - Testimonials
 *    parameters:
 *    - in: path
 *      name: id
 *      type: integer
 *      required: true
 *    responses:
 *      200:
 *        description: An success responses that contains an testimony object
 *        schema:
 *          properties:
 *            error:
 *              type: boolean
 *            status:
 *              type: string
 *            message:
 *              type: string
 *            result:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                content:
 *                  type: string
 *                image:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *  put:
 *    description: Updates a testimony
 *    summary: Updates a testimony
 *    tags:
 *    - Testimonials
 *    consumes: multipart/form-data
 *    parameters:
 *    - in: formData
 *      name: name
 *      type: string
 *      required: true
 *    - in: formData
 *      name: content
 *      type: string
 *      required: true
 *    - in: formData
 *      name: image
 *      type: file
 *      required: true
 *    responses:
 *      200:
 *        description: Returns an success response object
 *        schema:
 *          properties:
 *            error:
 *              type: boolean
 *            status:
 *              type: string
 *            message:
 *              type: string
 *            result:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                image:
 *                  type: string
 *                content:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *        
 */