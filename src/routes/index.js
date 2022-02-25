import express from "express";
import authRoutes from "./auth.routes";
import publicData from "./public.routes";
import newsRoutes from "./news.routes";
import userRoutes from "./user.routes";
import sendGrid from "./sendGrid.routes";
import categoryRoutes from "./category.routes";

const router = express.Router();

/* Auth Routes */
router.use(authRoutes);

/* News Routes */
router.use(newsRoutes);

/* Users Routes*/
router.use(userRoutes);
/* Public Data Routes */
router.use(publicData);
/* Public Data Routes */

/*SendGrid Routes*/
router.use(sendGrid);

/* Category Routes */
router.use(categoryRoutes);

export default router;
