import express from "express";
import authRoutes from "./auth.routes";
import newsRoutes from "./news.routes";
const router = express.Router();

/* Auth Routes */
router.use(authRoutes);
/* Auth Routes */

/* News Routes */
router.use(newsRoutes);

export default router;
