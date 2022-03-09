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

export default router;
