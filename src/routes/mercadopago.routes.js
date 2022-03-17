import express from "express";
import {
  instantPaymentNotification,
  processPayment,
} from "../controllers/mercadopago.controller";
import { isLoggedIn } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/payment/new", isLoggedIn, processPayment);
router.post("/ipn", instantPaymentNotification);

export default router;
