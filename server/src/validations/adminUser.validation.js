import { body } from "express-validator";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const adminRegisterValidation = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email format.")
      .notEmpty()
      .withMessage("Email is required."),
    body("firstName")
      .isLength({ min: 2, max: 20 })
      .withMessage("Enter valid first name.")
      .notEmpty()
      .withMessage("Email is required."),
    body("password")
      .matches(PWD_REGEX)
      .withMessage(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .notEmpty()
      .withMessage("Password is required."),
  ];
};

const adminLoginValidation = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email format.")
      .notEmpty()
      .withMessage("Email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ];
};

export { adminRegisterValidation, adminLoginValidation };
