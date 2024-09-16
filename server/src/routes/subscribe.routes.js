import { Router } from "express";
import {
  calculateAmount,
  checkValidSubscription,
  checkoutSession,
  paymentVerification,
  subscribedCard,
  subscribedCardListDashboard,
  successPayment,
} from "../controllers/subscribe.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/card/subscription-valid/:cardId")
  .get(verifyJWT, checkValidSubscription);

router
  .route("/final-amount/card/:cardId/:planId")
  .get(verifyJWT, calculateAmount);

router
  .route("/checkout/subscription/card/:cardId")
  .post(verifyJWT, checkoutSession);

router.route("/payment-verification/:cardId/:userId").post(paymentVerification);

router
  .route("/payment/success/card/:cardId/:razorpayPaymentId")
  .get(verifyJWT, successPayment);

router.route("/subscribed/card/:publicLink").get(subscribedCard);

router
  .route("/recent-subscribe-dashboard")
  .get(verifyJWT, subscribedCardListDashboard);

export default router;
