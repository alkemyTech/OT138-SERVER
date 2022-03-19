import express from "express";
import {
  imLoggedIn,
  login,
  profile,
  refresh,
  register,
  logout,
  deleteAccount,
  updateAccount
} from "../controllers/auth.controller";
import { isLoggedIn, loginValidator } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/refresh", refresh);
router.post("/auth/login",  loginValidator, login);
router.post("/auth/imloggedin", isLoggedIn, imLoggedIn);
router.get("/auth/me", isLoggedIn, profile);
router.delete("/auth/account", isLoggedIn, deleteAccount);
router.put("/auth/account", isLoggedIn, updateAccount);
router.post("/auth/logout", isLoggedIn, logout);

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

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *    description: Signs off the current user
 *    responses:
 *      '200':
 *        description: A successful response
 */

export default router;
