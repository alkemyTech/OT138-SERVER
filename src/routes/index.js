import express from "express";
import authRoutes from "./auth.routes";
import newsRoutes from "./news.routes";
import userRoutes from "./user.routes";
const router = express.Router();

/* Auth Routes */
router.use(authRoutes);

/* News Routes */
router.use(newsRoutes);


/* Users Routes*/
router.use(userRoutes);

export default router;
