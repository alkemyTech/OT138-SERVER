import express from "express";
import authRoutes from "./auth.routes";
import publicData from "./public.routes";
import newsRoutes from "./news.routes";
import userRoutes from "./user.routes";
import activitiesRoutes from "./activities.routes";

const router = express.Router();

/* Auth Routes */
router.use(authRoutes);

/* News Routes */
router.use(newsRoutes);

/* Users Routes*/
router.use(userRoutes);
/* Public Data Routes */
router.use(publicData);
/* Activities Routes */
router.use(activitiesRoutes);

export default router;
