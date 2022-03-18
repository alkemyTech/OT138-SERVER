import express from "express";
const router = express.Router();
import { listUsers, deleteUser, updateUser, getUser } from "../controllers/user.controller";
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware';

// Routes for admin
router.get("/users", isLoggedIn, isAdmin, listUsers);
router.get("/users/:id", isLoggedIn, isAdmin, getUser);
router.put("/users/:id", isLoggedIn, isAdmin, updateUser);
router.delete("/users/:id", isLoggedIn, isAdmin, deleteUser);

export default router;