import express from "express";
import { getDonations } from "../controllers/donations.controller";

const router = express.Router();

router.get("/donations", getDonations);

export default router;
