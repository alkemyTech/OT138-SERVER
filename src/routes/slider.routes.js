import express from "express";
const router = express.Router();
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware';
import { SliderGet, SliderPut, SliderDelete, SliderPost} from "../controllers/slides.controller";
import fileStorageMiddleware from "../middlewares/fileStorage.middleware";


router.get("/slides",SliderGet);
router.post("/slides", isLoggedIn, isAdmin, fileStorageMiddleware("image"), SliderPost);
router.put("/slides/:id", isLoggedIn, isAdmin, fileStorageMiddleware("image"), SliderPut);
router.delete("/slides/:id", isLoggedIn, isAdmin, SliderDelete);

export default router;