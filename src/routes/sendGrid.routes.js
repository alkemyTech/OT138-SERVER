import  express from "express";
const router = express.Router();
import {ContactForm} from "../controllers/sendGrid.controller"; 

router.post("/sendgrid/contact-form",ContactForm);

export default router;