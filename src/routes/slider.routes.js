import express from "express";
const router = express.Router();
import {SliderGet,SliderPut,SliderDelete} from "../controllers/slides.controller";


router.get("/slides",SliderGet);
router.put("/slides",SliderPut);
router.delete("/slides",SliderDelete);

export default router;