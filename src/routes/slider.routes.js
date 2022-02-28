import express from "express";
const router = express.Router();
import {SliderGet,SliderPut,SliderDelete,SliderPost} from "../controllers/slides.controller";


router.get("/slides",SliderGet);
router.post("/slides",SliderPost);
router.put("/slides/:id",SliderPut);
router.delete("/slides/:id",SliderDelete);

export default router;