import express from "express";
import { publicDataController } from "../controllers/publicData.controller";

const router = express.Router();

router.get("/organizations/1/public", publicDataController);

/**
 * @swagger
 * /api/organizations/1/public:
 *  get:
 *    description: Public ORganization Data endpoint
 *    responses:
 *      '200':
 *        description: A successful response with public organization data.
 */

export default router;
