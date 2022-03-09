import express from "express";
import {
  publicDataController,
  updatePublicDataController,
} from "../controllers/publicData.controller";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/organizations/1/public", publicDataController);
router.put(
  "/organizations/1/public",
  isLoggedIn,
  isAdmin,
  updatePublicDataController
);
/**
 * @swagger
 * /api/organizations/1/public:
 *  get:
 *    description: Public ORganization Data endpoint
 *    responses:
 *      '200':
 *        description: A successful response with public organization data.
 */

/**
 * @swagger
 *  /api/organizations/1/public:
 *  put:
 *    description: Update Organization Data.
 *    summary: Update Organization Data.
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: body
 *      description: "Updates Organization Data"
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            example: "New Organization Name"
 *          image:
 *            type: string
 *            example: "http://placeimg.com/640/480/nature"
 *            description: "A URL to an image"
 *    responses:
 *      '200':
 *        description: A successful response.
 */
export default router;
