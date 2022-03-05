'use strict';

import express from "express";
import { getMembersController, createMemberController, updateMemberController, deleteMemberController} from '../controllers/members.controller';
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/members/:limit/:offset", getMembersController);
router.post("/members", isLoggedIn, isAdmin, createMemberController);
router.put("/members/:id", isLoggedIn, isAdmin, updateMemberController);
router.delete("/members/:id", isLoggedIn, isAdmin, deleteMemberController);

export default router;