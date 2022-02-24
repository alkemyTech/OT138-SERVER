import  express from "express";
const router = express.Router();
import {ContactForm,RegistrationForm} from "../controllers/sendGrid.controller"; 


router.post("/sendgrid/contact-form",ContactForm);
router.post("/sendgrid/register-form",RegistrationForm);

export default router;