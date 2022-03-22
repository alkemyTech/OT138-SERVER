const express = require("express");
const router = express.Router();
import {
  getTestimony,
  postTestimony,
  putTestimony,
  deleteTestimony,
  getOneTestimony,
} from "../controllers/testimony.controller";
import fileStorageMiddleware from "../middlewares/fileStorage.middleware";

router.get("/testimonials", getTestimony);
router.get("/testimonials/:id", getOneTestimony);
router.post("/testimonials", fileStorageMiddleware("image"), postTestimony);
router.put("/testimonials/:id", fileStorageMiddleware("image"), putTestimony);
router.delete("/testimonials/:id", deleteTestimony);

export default router;
