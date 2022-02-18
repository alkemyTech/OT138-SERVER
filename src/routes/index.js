import express from "express";
import authRoutes from "./auth.routes";
import newsRoutes from "./news.routes";
const router = express.Router();

/* Auth Routes */
router.use(authRoutes);

/* News Routes */
router.use(newsRoutes);

export default router;
