import { Router } from "express";
import { getInvoices, invoice } from "../controllers/invoice.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-invoices").get(verifyJWT, getInvoices);

router.route("/:subscribeId/billing-invoice").get(verifyJWT, invoice);

export default router;
