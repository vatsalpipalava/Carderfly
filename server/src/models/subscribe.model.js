import mongoose, { Schema } from "mongoose";

const subscribeSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: true,
    },
    subscriptionPlanId: {
      type: String,
    },
    subscriptionStatus: {
      type: String,
      enum: ["inProgress", "expired"],
    },
    subscriptionAmount: {
      type: String,
    },
    subscriptionDuration: {
      type: String,
    },
    stripeSessionId: {
      type: String,
    },
    stripeCustomerId: {
      type: String,
    },
    stripeSubscriptionId: {
      type: String,
    },
    stripeInvoiceId: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Subscribe = mongoose.model("Subscribe", subscribeSchema);
