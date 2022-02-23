import express from "express";
import { createActivitiesController } from "../controllers/activities.controller";

const router = express.Router();

router.post("/activities", createActivitiesController);

/**
 * @swagger
 * /api/activities:
 *  post:
 *    description: Create Activities endpoint.
 *    responses:
 *      '200':
 *        description: A successful response with public organization data.
 */

export default router;
