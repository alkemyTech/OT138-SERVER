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
import fileStorageMiddleware from "../middlewares/fileStorage.middleware";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/refresh", refresh);
router.post("/auth/login",  loginValidator, login);
router.post("/auth/imloggedin", isLoggedIn, imLoggedIn);
router.get("/auth/me", isLoggedIn, profile);
router.delete("/auth/account", isLoggedIn, deleteAccount);
router.put("/auth/account", isLoggedIn, fileStorageMiddleware("image"), updateAccount);
router.post("/auth/logout", isLoggedIn, logout);

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    description: User Registration endpoint
 *    summary: Creates an user
 *    tags:
 *      - Authentication
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
 *    summary: Refresh user token
 *    tags:
 *      - Authentication
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
 *    summary: Login
 *    tags:
 *    - Authentication
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
 *        description: A success response object with user data
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *            status:
 *              type: string
 *            message:
 *              type: string
 *            result:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    firstName:
 *                      type: string
 *                    lastName:
 *                      type: string
 *                    phone:
 *                      type: string
 *                    email:
 *                      type: string
 *                    image:
 *                      type: string
 *                    roleId:
 *                      type: string
 *                    createdAt:
 *                     type: string
 *                    updatedAt:
 *                      type: string
 *                    roleName:
 *                      type: string
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string
 *                
 */

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *    description: Signs off the current user
 *    summary: Logout
 *    tags:
 *      - Authentication
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *            status:
 *              type: string
 *            message:
 *              type: string
 *            result:
 *              type: object
 *              description: An empty object
 */

export default router;
