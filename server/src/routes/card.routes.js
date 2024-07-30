import { Router } from "express";
import {
  createCard,
  downloadVcf,
  editCard,
  existingCard,
  getCards,
  getNotSubscribedCard,
} from "../controllers/card.controller.js";
import { validateInput } from "../middlewares/expressValidator.middleware.js";
import { existingCardValidation } from "../validations/card.validation.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-card").post(upload.none(), verifyJWT, createCard);

router
  .route("/exist-card")
  .post(validateInput(existingCardValidation()), verifyJWT, existingCard);

router.route("/get-cards").get(verifyJWT, getCards);

router.route("/view-card/:cardId").get(verifyJWT, getNotSubscribedCard);

router.route("/edit-card/:cardId").put(upload.none(), verifyJWT, editCard);

router.route("/vcf-download/:cardId").get(downloadVcf);

export default router;
