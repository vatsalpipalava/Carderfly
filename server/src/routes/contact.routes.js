import { Router } from "express";
import { contactForm, supportForm } from "../controllers/contact.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/contact-form").post(contactForm);

router.route("/support-form").post(verifyJWT, supportForm);

export default router;
