import mongoose from "mongoose";
import { Subscribe } from "../models/subscribe.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

  const invoice = await stripe.invoices.retrieve(subscribe.stripeInvoiceId);

  return res
    .status(200)
    .json(new ApiResponse(200, invoice, "Invoice retrieved successfully!"));
});

export { getInvoices, invoice };
