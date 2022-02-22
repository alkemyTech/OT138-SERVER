import express from "express";
const router = express.Router();
import {list} from "../controllers/getAllUser.controller";


router.get("/users",list);


export default router;