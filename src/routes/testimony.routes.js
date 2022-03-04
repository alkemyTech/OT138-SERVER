const express = require("express");
const router = express.Router();
import {getTestimony} from "../controllers/testimony";


router.get("/testimony",getTestimony);


export default router;