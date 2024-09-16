import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
      required: [true, "Coupon code is required."],
      unique: true,
    },
    discount: {
      type: Number,
      required: [true, "Discount percentage is required."],
      min: [0, "Discount must be at least 0%."],
      max: [100, "Discount cannot exceed 100%."],
    },
    expiresAt: {
      type: Date,
      required: [true, "Discount expires date is required."],
      index: { expires: "0" },
    },
  },
  {
    timestamps: true,
  }
);

export const Coupon = mongoose.model("Coupon", couponSchema);
