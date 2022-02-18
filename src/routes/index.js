import express from "express";
import authRoutes from "./auth.routes";
const router = express.Router();

/* Auth Routes */
router.use(authRoutes);

/* Auth Routes */

export default router;
