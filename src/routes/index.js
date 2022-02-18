import express from "express";
import authRoutes from "./auth.routes";
import publicData from "./public.routes";
const router = express.Router();

/* Auth Routes */
router.use(authRoutes);
/* Auth Routes */

/* Public Data Routes */
router.use(publicData);
/* Public Data Routes */

export default router;
