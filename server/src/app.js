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
import { ObjectId } from "mongodb";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

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

// <----------------------------- Stripe Webhook ------------------------------------>
const subscriptionDetails = [
  {
    planId: "starter",
    amount: "₹399",
    duration: "3 Months",
    stripeAmount: 39900,
    month: 3,
  },
  {
    planId: "standard",
    amount: "₹599",
    duration: "6 Months",
    stripeAmount: 59900,
    month: 6,
  },
  {
    planId: "premium",
    amount: "₹999",
    duration: "12 Months",
    stripeAmount: 99900,
    month: 12,
  },
  {
    planId: "usd_starter",
    amount: "$7",
    duration: "3 Months",
    stripeAmount: 700,
    month: 3,
  },
  {
    planId: "usd_standard",
    amount: "$10",
    duration: "6 Months",
    stripeAmount: 1000,
    month: 6,
  },
  {
    planId: "usd_premium",
    amount: "$15",
    duration: "12 Months",
    stripeAmount: 1500,
    month: 12,
  },
];

app.post(
  "/api/v1/subscribe/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      const checkoutSessionCompleted = event.data.object;

      const checkoutSessionId = checkoutSessionCompleted.id;
      const customerId = checkoutSessionCompleted.customer;
      const subscriptionId = checkoutSessionCompleted.subscription;
      const invoiceId = checkoutSessionCompleted.invoice;
      const stripeAmount = checkoutSessionCompleted.amount_subtotal;
      const creates_at = checkoutSessionCompleted.created;

      const userIdString = checkoutSessionCompleted.metadata.userId;
      const cardIdString = checkoutSessionCompleted.metadata.cardId;

      try {
        const subscriptionMetadataUpdate = await stripe.subscriptions.update(
          subscriptionId,
          {
            cancel_at_period_end: true,
            metadata: {
              userId: userIdString,
              cardId: cardIdString,
            },
          }
        );

        const userId = new ObjectId(userIdString);
        const cardId = new ObjectId(cardIdString);

        const selectedSubscription = subscriptionDetails.find(
          (subscriptionDetail) =>
            subscriptionDetail.stripeAmount === stripeAmount
        );

        const { planId, amount, duration, month } = selectedSubscription;

        const startDate = new Date(creates_at * 1000);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + month);

        // Determine subscription status
        const currentDate = new Date();
        let subscriptionStatus;
        if (currentDate > endDate) {
          subscriptionStatus = "expired";
        } else {
          subscriptionStatus = "inProgress";
        }

        const subscription = new Subscribe({
          userId: userId,
          cardId: cardId,
          subscriptionPlanId: planId,
          subscriptionStatus: subscriptionStatus,
          subscriptionAmount: amount,
          subscriptionDuration: duration,
          stripeSessionId: checkoutSessionId,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          stripeInvoiceId: invoiceId,
          startDate: startDate,
          endDate: endDate,
        });

        const subscribe = await subscription.save();

        const card = await Card.findOne({ _id: cardId, userId: userId });
        if (!card) {
          return response.status(500).json({
            success: false,
            status: 500,
            message: "Failed to update card schema",
          });
        }

        card.subscribeId = subscribe._id;
        card.isPublic = true;
        // const updateCard = await Card.findOneAndUpdate({_id: cardId, userId: userId}, {subscribeId: subscribe._id, isPublic: true});
        await card.save();

        return response.status(200).json({
          success: true,
          message: "Subscription and Card updated successfully",
        });
      } catch (error) {
        return response.status(500).json({
          success: false,
          message: "An error occurred while processing the subscription",
          error: error.message,
        });
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const customerSubscriptionDeleted = event.data.object;

      const user_Id = customerSubscriptionDeleted.metadata.userId;
      const card_Id = customerSubscriptionDeleted.metadata.cardId;

      if (!user_Id && !card_Id) {
        return response.status(500).json({
          success: false,
          status: 400,
          message: "CARD_ID and USER_ID not found",
        });
      }

      try {
        const subscription = await Subscribe.findOne({
          userId: user_Id,
          cardId: card_Id,
        });
        if (!subscription) {
          return response.status(404).json({
            success: false,
            message: "Subscription not found",
          });
        }

        subscription.subscriptionStatus = "expired";
        await subscription.save();

        const card = await Card.findOne({ _id: card_Id, userId: user_Id });
        if (!card) {
          return response.status(404).json({
            success: false,
            message: "Card not found",
          });
        }

        card.isPublic = false;
        card.subscribeId = null;
        card.isBlocked = false;
        card.blockedDate = null;
        await card.save();

        return response.status(200).json({
          success: true,
          message: "Subscription and Card updated successfully",
        });
      } catch (error) {
        return response.status(500).json({
          success: false,
          message: "An error occurred while updating subscription and card",
        });
      }
    }

    // Handle the event
    // switch (event.type) {
    //   case "checkout.session.completed":

    //     break;

    //   case "customer.subscription.deleted":

    //     break;
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  }
);

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

import { Subscribe } from "./models/subscribe.model.js";
import { Card } from "./models/card.model.js";

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

export { app };
