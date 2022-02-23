import express from "express";
import authRoutes from "./auth.routes";
import publicData from "./public.routes";
import newsRoutes from "./news.routes";
<<<<<<< HEAD
import userRoutes from "./user.routes";
=======

>>>>>>> ec3e87f413dffc4476947e48e12d50843170bc41
const router = express.Router();

/* Auth Routes */
router.use(authRoutes);

/* News Routes */
router.use(newsRoutes);

<<<<<<< HEAD

/* Users Routes*/
router.use(userRoutes);
=======
/* Public Data Routes */
router.use(publicData);
/* Public Data Routes */
>>>>>>> ec3e87f413dffc4476947e48e12d50843170bc41

export default router;
