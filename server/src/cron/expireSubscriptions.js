import cron from "node-cron";
import { Card } from "../models/card.model.js";
import { Subscribe } from "../models/subscribe.model.js";
import logger from "../utils/logger.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Set up the cron job to run at midnight
cron.schedule("0 0 * * *", async () => {
  logger.info("Running subscription expiration check at midnight.");

  try {
    // Find subscriptions that have expired (endDate is less than the current date)
    const expiredSubscriptions = await Subscribe.find({
      endDate: { $lte: new Date() }, // Find subscriptions where endDate has passed
      subscriptionStatus: "inProgress", // Only consider active subscriptions
    });

    // Iterate over the expired subscriptions and update the corresponding cards
    for (const subscription of expiredSubscriptions) {
      await Card.updateOne(
        { _id: subscription.cardId },
        {
          $set: {
            isPublic: false, // Set the card as not public
            subscribeId: null, // Remove the subscription reference
            isBlocked: false,
            blockedDate: null,
          },
        }
      );

      // Update the subscription status to 'expired'
      await Subscribe.updateOne(
        { _id: subscription._id },
        { $set: { subscriptionStatus: "expired" } }
      );
    }

    logger.info(
      `Processed ${expiredSubscriptions.length} expired subscriptions.`
    );
  } catch (error) {
    logger.error(
      error.message || "An error occurred while updating subscriptions."
    );
  }
});
