import { body } from "express-validator";

const checkoutSessionValidation = () => {
  return [
    body("subscriptionPlanId")
      .notEmpty()
      .withMessage("Subscription Plan ID is required")
      .isIn(["starter", "standard", "premium"])
      .withMessage("Invalid subscription plan ID"),
  ];
};

export { checkoutSessionValidation };
