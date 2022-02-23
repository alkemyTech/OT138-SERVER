import express from "express";
const router = express.Router();
import {list,userDelete} from "../controllers/user.controller";


router.get("/users",list);
router.delete("/users/:id",userDelete);

export default router;