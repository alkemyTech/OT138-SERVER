import express from "express";
const router = express.Router();
import {profile} from "../controllers/user.controller";


router.get("/users",profile);


export default router;