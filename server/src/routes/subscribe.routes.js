import { Router } from "express";
import {
  checkValidSubscription,
  checkoutSession,
  subscribedCard,
  subscribedCardListDashboard,
  successPayment,
} from "../controllers/subscribe.controller.js";
import { validateInput } from "../middlewares/expressValidator.middleware.js";
import { checkoutSessionValidation } from "../validations/subscribe.validation.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/card/subscription-valid/:cardId")
  .get(verifyJWT, checkValidSubscription);

router
  .route("/checkout/subscription/card/:cardId")
  .post(verifyJWT, validateInput(checkoutSessionValidation()), checkoutSession);

router
  .route("/payment/success/card/:cardId/:sessionId")
  .get(verifyJWT, successPayment);

router.route("/subscribed/card/:publicLink").get(subscribedCard);

router
  .route("/recent-subscribe-dashboard")
  .get(verifyJWT, subscribedCardListDashboard);

export default router;
