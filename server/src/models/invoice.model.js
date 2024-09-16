import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
  {
    invoice: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    invoiceNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
