import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { fileURLToPath } from "url";
import { corsOptions } from "./config/options.js";
import { credentials } from "./middlewares/credentials.middleware.js";
import logger from "./utils/logger.js";
import Razorpay from "razorpay";
import "./cron/expireSubscriptions.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const app = express();

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "10mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static files
app.use("/public", express.static(path.join(__dirname, "..", "public")));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(cookieParser());

// required for passport
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes import
import rootRoutes from "./routes/root.routes.js";
import healthRoutes from "./routes/health.routes.js";
import userRoutes from "./routes/user.routes.js";
import cardRoutes from "./routes/card.routes.js";
import subscribeRoutes from "./routes/subscribe.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import adminUserRoutes from "./routes/adminUser.routes.js";
import adminDataRoutes from "./routes/adminData.routes.js";
import backupRoutes from "./routes/backup.routes.js";

// routes declaration
app.use("/", rootRoutes);
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/card", cardRoutes);
app.use("/api/v1/subscribe", subscribeRoutes);
app.use("/api/v1/invoice", invoiceRoutes);
app.use("/api/v1/admin", adminUserRoutes);
app.use("/api/v1/admin-data", adminDataRoutes);
app.use("/api/v1/backup", backupRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

export { app, razorpay };
