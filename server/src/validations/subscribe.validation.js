import { body } from "express-validator";

const checkoutSessionValidation = () => {
  return [
    body("subscriptionPlanId")
      .notEmpty()
      .withMessage("Subscription Plan ID is required")
      .isIn([
        "starter",
        "standard",
        "premium",
        "usd_starter",
        "usd_standard",
        "usd_premium",
      ])
      .withMessage("Invalid subscription plan ID"),
  ];
};

export { checkoutSessionValidation };
