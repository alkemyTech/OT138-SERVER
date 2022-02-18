import express from "express";
import { publicDataController } from "../controllers/publicData.controller";

const router = express.Router();

router.get("/organizations/1/public", publicDataController);

export default router;
