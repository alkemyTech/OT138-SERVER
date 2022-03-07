'use strict';

import express from "express";
import { list } from "../controllers/contact.controller";
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware';
const router = express.Router();

router.get("/contacts", isLoggedIn, isAdmin, list);

/**
 * @swagger
 * /api/contacts:
 *      get:
 *          summary: Get the list of contacts. Paginated by default
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

export default router;