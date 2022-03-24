import express from "express";
import {
  instantPaymentNotification,
  processPayment,
} from "../controllers/mercadopago.controller";
import { checkIsLoggedIn } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/payment/new", checkIsLoggedIn, processPayment);
router.post("/ipn", instantPaymentNotification);

export default router;
