import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { Subscribe } from "../models/subscribe.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Invoice } from "../models/invoice.model.js";
import { fileURLToPath } from "url";
import logger from "../utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getInvoices = asyncHandler(async (req, res) => {
  const userId = req._id;
  const { search, planId, status, startDateSort, endDateSort } = req.query;

  let searchCriteria = {};
  if (search) {
    const searchRegex = new RegExp(search, "i");
    searchCriteria.$or = [
      { "card.firstName": searchRegex },
      { "card.lastName": searchRegex },
      { "card.businessName": searchRegex },
      { "card.jobTitle": searchRegex },
      { "card.email": searchRegex },
      { startDate: searchRegex },
      { endDate: searchRegex },
    ];
  }

  if (planId) {
    const planIdsArray = planId.split(",");
    searchCriteria.subscriptionPlanId = { $in: planIdsArray };
  }

  if (status) {
    const statusArray = status.split(",");
    searchCriteria.subscriptionStatus = { $in: statusArray };
  }

  // Define sorting criteria
  const sort = {};
  if (startDateSort) {
    sort.startDate = startDateSort === "asc" ? 1 : -1; // Ascending or descending
  } else if (endDateSort) {
    sort.endDate = endDateSort === "asc" ? 1 : -1; // Ascending or descending
  } else {
    sort.startDate = -1; // Default sorting by recent startDate
  }

  // Perform aggregation
  const subscribes = await Subscribe.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "cards", // Collection to join
        localField: "cardId",
        foreignField: "_id",
        as: "card",
      },
    },
    {
      $unwind: "$card",
    },
    {
      $addFields: {
        "card.email": {
          $arrayElemAt: [
            {
              $filter: {
                input: "$card.primaryActions",
                as: "action",
                cond: { $eq: ["$$action._id", "email"] },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $addFields: {
        "card.email": "$card.email.value",
      },
    },
    {
      $match: searchCriteria,
    },
    {
      $sort: sort,
    },
    {
      $project: {
        _id: 1,
        cardId: 1,
        userId: 1,
        subscriptionPlanId: 1,
        subscriptionStatus: 1,
        subscriptionAmount: 1,
        subscriptionCurrency: 1,
        startDate: 1,
        endDate: 1,
        "card.profileImg": 1,
        "card.firstName": 1,
        "card.lastName": 1,
        "card.email": 1,
        "card.businessName": 1,
        "card.jobTitle": 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, subscribes, "Invoices retrieved successfully."));
});

const invoice = asyncHandler(async (req, res) => {
  const userId = req._id;
  const subscribeId = req.params.subscribeId;

  if (!mongoose.isValidObjectId(subscribeId)) {
    throw new ApiError(400, "Invalid subscribe ID.");
  }

  const subscribe = await Subscribe.findOne({
    _id: subscribeId,
    userId: userId,
  });

  if (!subscribe) {
    throw new ApiError(404, "Subscription not found.");
  }

  const invoice = await Invoice.findOne({
    "invoice.id": subscribe.razorpayPaymentId,
  });

  // const payment = await razorpay.orders.fetchPayments(subscribe.razorpayOrderId);
  // console.log("🚀 ~ invoice ~ payment:", payment)
  // console.log("🚀 ~ invoice ~ payment:", payment.items[0].card)

  return res
    .status(200)
    .json(new ApiResponse(200, invoice, "Invoice retrieved successfully!"));
});

const getEInvoice = asyncHandler(async (req, res) => {
  const invoiceId = req.params.invoiceId;
  const invoice = await Invoice.findById(invoiceId);

  if (!invoice) {
    throw new ApiError(404, "Invoice not found");
  }

  const create = new Date(invoice.invoice.created_at * 1000);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedCreateDate = create.toLocaleDateString("en-US", options);

  const getCurrencySymbol = () => {
    switch (invoice.invoice.currency) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      default:
        return "";
    }
  };

  const getPlanName = () => {
    switch (invoice.invoice.notes?.planId) {
      case "inr_premium":
        return "Premium";
      case "usd_premium":
        return "Premium";
      case "inr_standard":
        return "Standard";
      case "usd_standard":
        return "Standard";
      case "inr_starter":
        return "Starter";
      case "usd_starter":
        return "Starter";
      default:
        break;
    }
  };

  const obj = {
    invoiceNumber: invoice.invoiceNumber,
    invoiceDate: formattedCreateDate,
    customerName: invoice.invoice.notes.name,
    customerBusinessName: invoice.invoice.notes?.businessName,
    customerAddress1: invoice.invoice.notes?.addressLine1,
    customerAddress2: invoice.invoice.notes?.addressLine2,
    customerCountry: invoice.invoice.notes.country,
    customerState: invoice.invoice.notes.state,
    customerPhone: invoice.invoice.contact,
    customerEmail: invoice.invoice?.email,
    customerTaxNo: invoice.invoice.notes?.taxNo,
    plan: getPlanName(),
    currency: getCurrencySymbol(),
    subTotal: (invoice.invoice.notes?.subTotal / 100).toFixed(2),
    couponCode: invoice.invoice.notes?.coupon,
    couponDiscount: invoice.invoice.notes?.couponDiscount,
    discount: (invoice.invoice.notes?.discount / 100).toFixed(2),
    totalExcludingTax: (invoice.invoice.notes.totalExcludingTax / 100).toFixed(
      2
    ),
    cgstPercentage: invoice.invoice.notes?.cgstPercentage,
    cgst: (invoice.invoice.notes?.cgst / 100).toFixed(2),
    sgstPercentage: invoice.invoice.notes?.sgstPercentage,
    sgst: (invoice.invoice.notes?.sgst / 100).toFixed(2),
    igstPercentage: invoice.invoice.notes?.igstPercentage,
    igst: (invoice.invoice.notes?.igst / 100).toFixed(2),
    total: (invoice.invoice.notes.total / 100).toFixed(2),
  };
  res.render("invoice", obj);
});

const invoicePdfDownload = asyncHandler(async (req, res) => {
  const invoiceId = req.params.invoiceId;

  const invoice = await Invoice.findById(invoiceId);

  if (!invoice) {
    throw new ApiError(404, "Invoice not found");
  }

  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
  });
  const page = await browser.newPage();
  await page.goto(
    `${process.env.BACKEND_URL}/api/v1/invoice/e-invoice/${invoiceId}`,
    {
      waitUntil: "networkidle2",
    }
  );

  const pdfUrl = path.join(
    __dirname,
    "../../public/temp",
    `Invoice_${invoice.invoiceNumber}` + ".pdf"
  );

  await page.pdf({
    path: pdfUrl,
    format: "A4",
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=Invoice_${invoice.invoiceNumber}.pdf`,
  });

  res.sendFile(pdfUrl, (err) => {
    if (err) {
      logger.error(`Error downloading the PDF", ${err}`);
    } else {
      fs.unlink(pdfUrl, (err) => {
        if (err) {
          logger.error(`File deleted successfully:", ${err}`);
        } else {
          logger.info(`File deleted successfully:", ${pdfUrl}`);
        }
      });
    }
  });
});

export { getInvoices, invoice, getEInvoice, invoicePdfDownload };
