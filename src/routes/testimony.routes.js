const express = require("express");
const router = express.Router();
import {getTestimony,postTestimony} from "../controllers/testimony.controller";


router.get("/testimony",getTestimony);
router.post("/testimony",postTestimony);


export default router;