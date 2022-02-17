import express from "express";
import { validate } from "express-validation";
import { register, registerValidation } from "../controllers/auth.controller";
const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    description: User Registration endpoint
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *             - userName
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post(
  "/auth/register",
  validate(registerValidation, {}, {}, {}, {}),
  register
);

export default router;
