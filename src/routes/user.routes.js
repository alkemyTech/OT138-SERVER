import express from "express";
const router = express.Router();
import { list, userDelete } from "../controllers/user.controller";
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware';


router.get("/users", isLoggedIn, isAdmin, list);
router.delete("/users/:id", isLoggedIn, isAdmin, userDelete);

export default router;