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
      type: Number,
    },
    subscriptionCurrency: {
      type: String,
      enum: ["INR", "USD"],
    },
    subscriptionDuration: {
      type: String,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
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
