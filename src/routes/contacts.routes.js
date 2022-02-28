'use strict';

import express from "express";
import { list } from "../controllers/contacts.controller";
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware';
const router = express.Router();

router.get("/contacts", isLoggedIn, isAdmin, list);

/**
 * @swagger
 * /api/contacts:
 *      get:
 *          summary: Get all contacts
 *          responses:
 *              '200':
 *                  description: A list of all contacts
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 */

export default router;