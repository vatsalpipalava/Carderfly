import { Router } from "express";
import { exportAllBackups } from "../controllers/backup.controller.js";

const router = Router();

router.route("/export/all-collections").get(exportAllBackups);

export default router;
