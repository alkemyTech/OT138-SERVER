import express from "express";
import { createContactsController } from "../controllers/contacts.controller";

const router = express.Router();

router.post("/contacts", createContactsController);
//router.get("/activities/:id?", getActivitiesController);

/**
 * @swagger
 * /api/contacts:
 *  post:
 *    description: Create Contacts endpoint.
 *    summary: Creates a Contact
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: body
 *      description: "Adds Contacts to database"
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            example: "John Doe"
 *          phone:
 *            type: string
 *            example: "+54 9 11 3578 5412"
 *          email:
 *            type: string
 *            example: "john.doe@example.com"
 *          message:
 *            type: string
 *            example: "A message left by the contact"
 *    responses:
 *      '200':
 *        description: A successful response.
 */

export default router;
