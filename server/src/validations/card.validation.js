import { body } from "express-validator";

const LINK_REGEX = /^[a-z0-9_]+$/;

const existingCardValidation = () => {
  return [
    body("publicLink")
      .matches(LINK_REGEX)
      .notEmpty()
      .withMessage("Public Link is required."),
  ];
};

// const createCardValidation = () => {
//   return [
//     body("publicLink")
//       .matches(LINK_REGEX)
//       .notEmpty()
//       .withMessage("Link is required."),
//   ];
// };

export { existingCardValidation };
