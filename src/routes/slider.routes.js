import express from "express";
const router = express.Router();
import {SliderGet,SliderPut,SliderDelete,SliderPost} from "../controllers/slides.controller";
import fileStorageMiddleware from "../middlewares/fileStorage.middleware";


router.get("/slides",SliderGet);
router.post("/slides", fileStorageMiddleware("image"), SliderPost);
router.put("/slides/:id", fileStorageMiddleware("image"), SliderPut);
router.delete("/slides/:id",SliderDelete);

export default router;