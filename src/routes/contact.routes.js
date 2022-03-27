"use strict";

import express from "express";
import {
  list,
  createContactsController,
} from "../controllers/contact.controller";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/contacts", isLoggedIn, isAdmin, list);
router.post("/contacts", createContactsController);

/**
 * @swagger
 * /api/contacts:
 *      get:
 *          summary: Get the list of contacts. Paginated by default
 *          tags:
 *            - Contact
 *          parameters:
 *          - name: limit
 *            in: query
 *            description: "Limits the number of results per page"
 *            type: integer
 *          - name: page
 *            in: query
 *            description: "Number of page to get"
 *            type: integer
 *          responses:
 *              '200':
 *                  description: A list of contacts
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 */

/**
 * @swagger
 * /api/contacts:
 *  post:
 *    description: Create Contacts endpoint.
 *    summary: Creates a Contact
 *    tags:
 *      - Contact
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
