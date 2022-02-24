import express from "express";
import { validate } from "express-validation";
import {
  imLoggedIn,
  login,
  profile,
  refresh,
  register,
  registerValidation,
} from "../controllers/auth.controller";
import { isLoggedIn, isAdmin, loginValidator } from "../middlewares/auth.middleware";
const router = express.Router();

router.post(
  "/auth/register",
  validate(registerValidation, {}, {}, {}, {}),
  register
);

router.post("/auth/refresh", refresh);

router.post("/auth/login", loginValidator, login);

router.post("/auth/imloggedin", isLoggedIn, imLoggedIn);

router.get("/auth/me", isLoggedIn, profile);

/* This route protected by middleware is fully illustrative */
router.get("/auth/protected", isLoggedIn, (req, res) => {
  res.json({ email: req.user.email, protected: true });
});

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

/**
 * @swagger
 * /api/auth/refresh:
 *  post:
 *    description: User Refresh Token
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *             - email
 *               refreshToken
 *          properties:
 *            email:
 *              type: string
 *            refreshToken:
 *              type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    description: User Login Route
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *             - email
 *               password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */

export default router;
