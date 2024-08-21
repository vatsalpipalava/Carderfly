import { Router } from "express";
import { validateInput } from "../middlewares/expressValidator.middleware.js";
import {
  adminRegisterValidation,
  adminLoginValidation,
} from "../validations/adminUser.validation.js";
import {
  registerAdminUser,
  loginAdminUser,
  logoutAdminUser,
  handleAdminRefreshToken,
} from "../controllers/adminUser.controller.js";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(validateInput(adminRegisterValidation()), registerAdminUser);

router
  .route("/login")
  .post(validateInput(adminLoginValidation()), loginAdminUser);

router.route("/logout").get(verifyAdminJWT, logoutAdminUser);

router.route("/refresh").get(handleAdminRefreshToken);

export default router;
