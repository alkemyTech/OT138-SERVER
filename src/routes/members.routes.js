'use strict';

import express from "express";
import { getMembersController, createMemberController, updateMemberController, deleteMemberController} from '../controllers/members.controller';
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/members", getMembersController);
router.post("/members", isLoggedIn, isAdmin, createMemberController);
router.put("/members/:id", isLoggedIn, isAdmin, updateMemberController);
router.delete("/members/:id", isLoggedIn, isAdmin, deleteMemberController);

export default router;

/**
 * @swagger
 * /api/members/:
 *  get:
 *      description: "Retrieves all the members data (optional: pagination)"
 *      parameters:
 *        - name: limit
 *          in: query
 *          description: "Amount of records to retrieve"
 *          type: integer
 *          required: false
 *        - name: offset
 *          in: query
 *          description: "Amount of records to skip"
 *          type: integer
 *          required: false
 *      responses:
 *          "200":
 *              description: "An object that contains the members data array"
 *              schema:
 *                  type: object
 *                  properties:
 *                      error:
 *                          type: boolean
 *                          example: false
 *                      status:
 *                          type: string
 *                          example: "200"
 *                      data:
 *                          type: array
 *                          example: [{name: "Person1", image: "images.com/person1.jpg"}, {name: "Person2", image: "images.com/person2.jpg"}]
 *          
 * /api/members:
 *  post:
 *      description: "Creates a new member record"
 *      parameters:
 *        - name: name
 *          in: body
 *          description: "Member name"
 *          type: string
 *          required: true
 *        - name: image
 *          in: body
 *          description: "Member photo url"
 *          type: string
 *          required: true
 *      responses:
 *          "200":
 *              description: "A successfull response"
 *              schema:
 *                  type: object
 *                  properties:
 *                      error: 
 *                          type: boolean
 *                          example: false
 *                      status:
 *                          type: string
 *                          example: "200"
 *                      message:
 *                          type: string
 *                          example: "Member created successfully"
 */
 
/**
 * @swagger
 * /api/members/{id}:
 *  put:
 *      description: "Update a member record"
 *      parameters:
 *        - in: path
 *          name: id
 *          description: "Id of the record to modify"
 *          type: integer
 *          required: true
 *        - in: body
 *          description: "Member name and image"
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *                      example: "Jane Doe"
 *                  image:
 *                      type: string
 *                      required: true
 *                      example: "https://fakeimages.com/jane_doe.jpg"
 *      responses:
 *          "200":
 *              description: "A successfull response"
 *              schema:
 *                  properties:
 *                      error: 
 *                          type: boolean
 *                          example: false
 *                      status:
 *                          type: string
 *                          example: "200"
 *                      message:
 *                          type: string
 *                          example: "Member updated successfully"
 *                      
 */

/**
 * @swagger
 * /api/members/{id}:
 *  delete:
 *      description: "Deletes a member record"
 *      parameters:
 *        - in: path
 *          name: id
 *          description: "Id of the record to delete"
 *          type: integer
 *          required: true
 *      responses:
 *          "200":
 *              description: "A successfull response"
 *              schema:
 *                  properties:
 *                      error:
 *                          type: boolean
 *                          example: false
 *                      status:
 *                          type: string
 *                          example: "200"
 *                      message:
 *                          type: string
 *                          example: "The member entry was successfully deleted"
 */