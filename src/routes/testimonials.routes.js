const express = require("express");
const router = express.Router();
import {
  getTestimony,
  postTestimony,
  putTestimony,
  deleteTestimony,
  getOneTestimony,
} from "../controllers/testimony.controller";

router.get("/testimonials", getTestimony);
router.get("/testimonials/:id", getOneTestimony);
router.post("/testimonials", postTestimony);
router.put("/testimonials/:id", putTestimony);
router.delete("/testimonials/:id", deleteTestimony);

export default router;
