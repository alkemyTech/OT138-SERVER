import express from "express";
import authRoutes from "./auth.routes";
import usersRoutes from "./users.routes";
const router = express.Router();

/* Auth Routes */
router.use(authRoutes);
router.use(usersRoutes);
/* Auth Routes */

export default router;
