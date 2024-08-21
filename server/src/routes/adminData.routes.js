import { Router } from "express";
import {
  blockCards,
  blockingCard,
  getAllCards,
  getCustomers,
  getInactiveCards,
  getRecentSubscriptions,
  getSubscriptionCards,
  unBlockCard,
} from "../controllers/adminData.controller.js";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/get-recent-subscribed-cards")
  .get(verifyAdminJWT, getRecentSubscriptions);

router.route("/get-all-customers").get(verifyAdminJWT, getCustomers);

router
  .route("/get-all-subscription-cards")
  .get(verifyAdminJWT, getSubscriptionCards);

router.route("/get-all-cards").get(verifyAdminJWT, getAllCards);

router.route("/get-all-inactive-cards").get(verifyAdminJWT, getInactiveCards);

router.route("/block-card/:cardId").put(verifyAdminJWT, blockingCard);

router.route("/get-all-blocked-cards").get(verifyAdminJWT, blockCards);

router.route("/unblock-card/:cardId").put(verifyAdminJWT, unBlockCard);

export default router;
