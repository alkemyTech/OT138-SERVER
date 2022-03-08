import express from "express";
const router = express.Router();
import { list, deleteUser, deleteUserByAdmin, updateProfileByUser, updateProfileByAdmin } from "../controllers/user.controller";
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware';

// Routes for users
router.put("/users/:id", isLoggedIn, updateProfileByUser);
router.delete("/users/:id", isLoggedIn, deleteUser);

// Routes for admin
router.get("/users", isLoggedIn, isAdmin, list);
router.put("/users/:id", isLoggedIn, isAdmin, updateProfileByAdmin);
router.delete("/users/protected/:id", isLoggedIn, isAdmin, deleteUserByAdmin);

export default router;