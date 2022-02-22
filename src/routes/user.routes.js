import express from "express";
const router = express.Router();
import {list} from "../controllers/getAllUser.controller";
import {userDelete} from "../controllers/deleteUser";


router.get("/users",list);
router.delete("/users/:id",userDelete);

export default router;