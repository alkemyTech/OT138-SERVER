import express from "express";
import {
  createActivitiesController,
  getOneActivityController,
  getActivitiesController,
  updateActivitiesController,
  deleteActivityController,
} from "../controllers/activities.controller";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware";
import fileStorageMiddleware from "../middlewares/fileStorage.middleware";

const router = express.Router();

router.post("/activities", isLoggedIn, isAdmin, fileStorageMiddleware("image"), createActivitiesController);
router.get("/activities/:id", getOneActivityController);
router.get("/activities", getActivitiesController);
router.put("/activities/:id?", isLoggedIn, isAdmin, fileStorageMiddleware("image"), updateActivitiesController);
router.delete("/activities/:id", isLoggedIn, isAdmin, deleteActivityController);

/**
 * @swagger
 * /api/activities:
 *  post:
 *    description: Create Activities endpoint.
 *    summary: Creates an Activity
 *    tags:
 *      - Activities
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: body
 *      description: "Adds Activities to database"
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            example: "Activity name"
 *          content:
 *            type: string
 *            example: "A description of the content of the activity"
 *          image:
 *            type: string
 *            example: "http://placeimg.com/640/480"
 *            description: "URL to image"

 *    responses:
 *      '200':
 *        description: A successful response.
 * 
 *  get:
 *    description: "Gets Activities from database. Requires limit and page parameters to paginate results."
 *    summary: "Gets activities from database"
 *    tags:
 *    - Activities
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - name: limit
 *      in: query
 *      description: "Limits the number of results per page"
 *      type: integer
 *      required: true
 *    - name: page
 *      in: query
 *      description: "Number of page to get"
 *      type: integer
 *      required: true
 *    responses:
 *      '200':
 *        description: An object containing the Activities
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *              example: false
 *            status:
 *              type: string
 *              example: "200"
 *            message:
 *              type: string
 *              example: "success"
 *            result:
 *              type: object
 *              properties:
 *                previous:
 *                  type: object
 *                  properties:
 *                    page:
 *                      type: integer
 *                      example: 2
 *                    limit:
 *                      type: integer
 *                      example: 10
 *                next:
 *                  type: object
 *                  properties:
 *                    page:
 *                      type: integer
 *                      example: 4
 *                    limit:
 *                      type: integer
 *                      example: 10
 *                count:
 *                  type: integer
 *                  example: 3
 *                totalNumberOfPages:
 *                  type: integer
 *                  example: 7
 *                activities:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        example: 102
 *                      name:
 *                        type: string
 *                        example: "Activity Name"
 *                      content:
 *                        type: string
 *                        example: "A description of the content of the activity"
 *                      image:
 *                        type: string
 *                        example: "http://placeimg.com/640/480"
 * 
 * /api/actividades/{id}:
 *  get:
 *    description: Get a activity data
 *    summary: Get an activity data
 *    tags:
 *      - Activities
 *    consumes:
 *    - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        type: integer
 *        required: true
 *        description: Entry id
 *    responses:
 *      200:
 *        description: A success response object with the activity data
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
 *                content:
 *                  type: string
 *                image:
 *                  type: string
 * 
 *  put:
 *    description: Updates an activity entry
 *    summary: Update an activity
 *    tags:
 *    - Activities
 *    consumes:
 *    - multipart/form-data
 *    parameters:
 *    - in: formData
 *      name: name
 *      type: string
 *      description: The activity name
 *      required: true
 *    - in: formData
 *      name: content
 *      type: string
 *      description: The activity content
 *      required: true
 *    - in: formData
 *      name: image
 *      type: file
 *      description: Image file
 *      required: true
 *    responses:
 *      200:
 *        description: A success object response with the updated instance
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
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
 *                deletedAt:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *  delete:
 *    description: Deletes an activity entry
 *    summary: Deletes an activity
 *    tags:
 *      - Activities
 *    consumes: application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        type: integer
 *        required: true
 *        description: Id of the entry to delete
 *    responses:
 *      200:
 *        description: A success object response
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *              example: false
 *            status:
 *              type: string
 *              example: "200"
 *            message:
 *              type: string
 *              example: Activity deleted
 *            result: 
 *              type: integer
 *      
 */

export default router;
