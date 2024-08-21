import { Router } from "express";
import {
  exportAllDbs,
  exportAllImages,
} from "../controllers/backup.controller.js";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/export/db").get(verifyAdminJWT, exportAllDbs);

router.route("/export/images").get(verifyAdminJWT, exportAllImages);

export default router;
