import express from "express";
const router = express.Router();
import {profile,userDelete} from "../controllers/user.controller";


router.get("/users",profile);
router.delete("/users/:id",userDelete)


export default router;