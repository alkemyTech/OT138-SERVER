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
 */

/**
 * @swagger
 * /api/activities:
 *  get:
 *    description: "Gets Activities from database. Requires limit and page parameters to paginate results."
 *    summary: "Gets activities from database"
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
 *                pervious:
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
 */

export default router;
