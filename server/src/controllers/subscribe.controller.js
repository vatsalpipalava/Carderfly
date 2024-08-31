import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Card } from "../models/card.model.js";
import { Subscribe } from "../models/subscribe.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripePriceId = {
  starter: process.env.STRIPE_PRICE_STARTER_ID,
  standard: process.env.STRIPE_PRICE_STANDARD_ID,
  premium: process.env.STRIPE_PRICE_PREMIUM_ID,
};

const checkValidSubscription = asyncHandler(async (req, res) => {
  const userId = req._id;
  const cardId = req.params.cardId;

  if (!mongoose.isValidObjectId(cardId)) {
    throw new ApiError(400, "Invalid card ID.");
  }

  const card = await Card.findOne({
    _id: cardId,
    userId: userId,
  }).select(
    "_id userId templateId publicLink profileImg backCoverImg firstName lastName jobTitle primaryActions isPublic isBlocked createdAt updatedAt"
  );

  if (!card) {
    throw new ApiError(404, "Cards not found.");
  }

  if (card.isPublic) {
    throw new ApiError(409, "Already Subscribed.");
  }

  const mobile = card?.primaryActions.find((action) => action._id === "mobile");
  const email = card?.primaryActions.find((action) => action?._id === "email");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: card._id,
        userId: card.userId,
        templateId: card.templateId,
        publicLink: card.publicLink,
        profileImg: card.profileImg,
        backCoverImg: card.backCoverImg,
        firstName: card.firstName,
        lastName: card.lastName,
        jobTitle: card.jobTitle,
        mobile: mobile.value,
        email: email.value,
        isPublic: card.isPublic,
        isBlocked: card.isBlocked,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
      },
      "Card Subscription is Valid."
    )
  );
});

const checkoutSession = asyncHandler(async (req, res) => {
  const userId = req._id;
  const email = req.email;
  const cardId = req.params.cardId;
  const { subscriptionPlanId } = req.body;

  if (!mongoose.isValidObjectId(cardId)) {
    throw new ApiError(400, "Invalid card ID.");
  }

  const card = await Card.findOne({
    _id: cardId,
    userId: userId,
  });

  if (!card) {
    throw new ApiError(404, "Cards not found.");
  }

  if (card.isPublic) {
    throw new ApiError(409, "Already Subscribed.");
  }

  const priceId = stripePriceId[subscriptionPlanId];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    customer_email: email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
        tax_rates: ["txr_1PqV3TSFtTo05V1cCrNCPZwL"],
      },
    ],
    metadata: {
      userId: userId,
      cardId: cardId,
    },
    success_url: `${process.env.SEC_FRONTEND_URL}/checkout/payment/success/subscribe/card/${cardId}/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SEC_FRONTEND_URL}/dashboard/my-cards`,
    // automatic_tax: {
    //   enabled: true,
    // },
    tax_id_collection: {
      enabled: true,
    },
    allow_promotion_codes: true,
    phone_number_collection: {
      enabled: true,
    },
    billing_address_collection: "required",
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        sessionId: session.id,
        url: session.url,
      },
      "Checkout Session Created."
    )
  );
});

const successPayment = asyncHandler(async (req, res) => {
  const userId = req._id;
  const { cardId, sessionId } = req.params;

  if (!mongoose.isValidObjectId(cardId)) {
    throw new ApiError(400, "Invalid card ID.");
  }

  const card = await Card.findOne({
    _id: cardId,
    userId: userId,
    isPublic: true,
  }).select(
    "_id userId templateId publicLink profileImg backCoverImg firstName lastName jobTitle primaryActions isPublic isBlocked createdAt updatedAt"
  );

  if (!card) {
    throw new ApiError(404, "Cards not found.");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session) {
    throw new ApiError(419, "Session expired.");
  }

  const mobile = card?.primaryActions.find((action) => action._id === "mobile");
  const email = card?.primaryActions.find((action) => action?._id === "email");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: card._id,
        userId: card.userId,
        templateId: card.templateId,
        publicLink: card.publicLink,
        profileImg: card.profileImg,
        backCoverImg: card.backCoverImg,
        firstName: card.firstName,
        lastName: card.lastName,
        jobTitle: card.jobTitle,
        mobile: mobile.value,
        email: email.value,
        isPublic: card.isPublic,
        isBlocked: card.isBlocked,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
      },
      "Card Success Page is Valid."
    )
  );
});

const subscribedCard = asyncHandler(async (req, res) => {
  const link = req.params.publicLink;

  const card = await Card.findOne({ publicLink: link, isPublic: true });

  if (!card) {
    throw new ApiError(404, "Card Not Found.");
  }

  const cardSubscriptionId = card.subscribeId;

  if (!cardSubscriptionId) {
    throw new ApiError(
      404,
      "Subscription id not found in card, Unauthorized access"
    );
  }

  const subscribe = await Subscribe.findById(cardSubscriptionId);

  if (!subscribe) {
    throw new ApiError(
      404,
      "Subscription details not found, Unauthorized access."
    );
  }

  const subscriptionEndDate = subscribe.endDate;

  const currentDate = new Date();

  if (subscriptionEndDate < currentDate) {
    throw new ApiError(410, "Subscription expired.");
  }

  return res.status(200).json(new ApiResponse(200, card, "Access."));
});

const subscribedCardListDashboard = asyncHandler(async (req, res) => {
  const userId = req._id;

  const subscribedList = await Subscribe.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        subscriptionStatus: "inProgress",
      },
    },
    {
      $lookup: {
        from: "cards",
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
      $project: {
        _id: 1,
        cardId: 1,
        userId: 1,
        subscriptionPlanId: 1,
        startDate: 1,
        "card.profileImg": 1,
        "card.firstName": 1,
        "card.lastName": 1,
        "card.email": 1,
        "card.businessName": 1,
        "card.jobTitle": 1,
      },
    },
    {
      $sort: { startDate: -1 }, // Sort by startDate in descending order
    },
    {
      $limit: 5, // Limit the results to 5
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedList,
        "Recent subscribed 5 cards retrieved successfully."
      )
    );
});

export {
  checkValidSubscription,
  checkoutSession,
  successPayment,
  subscribedCard,
  subscribedCardListDashboard,
};
