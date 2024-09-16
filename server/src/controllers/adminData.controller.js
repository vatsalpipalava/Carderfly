import mongoose from "mongoose";
import { Subscribe } from "../models/subscribe.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Card } from "../models/card.model.js";

const getRecentSubscriptions = asyncHandler(async (req, res) => {
  const subscribedCards = await Subscribe.aggregate([
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
      $match: {
        subscriptionStatus: "inProgress",
      },
    },
    {
      $sort: {
        startDate: -1,
      },
    },
    {
      $limit: 10,
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

  if (!subscribedCards) {
    throw new ApiError(404, "Recent subscribed cards not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedCards,
        "Recent subscribed cards retrieved successfully."
      )
    );
});

const getCustomers = asyncHandler(async (req, res) => {
  const {
    search,
    loginType,
    isEmailVerified,
    page = 1,
    limit = 10,
  } = req.query;

  let searchCriteria = {};

  if (search) {
    searchCriteria.$or = [
      { email: { $regex: search, $options: "i" } },
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
    ];
  }

  if (loginType) {
    const loginTypeArray = loginType.split(",");
    searchCriteria.loginType = { $in: loginTypeArray };
  }

  if (isEmailVerified) {
    const isEmailVerifiedArray = isEmailVerified.split(",");
    searchCriteria.isEmailVerified = { $in: isEmailVerifiedArray };
  }

  // Pagination setup
  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);
  const skip = (pageInt - 1) * limitInt;

  const users = await User.find(searchCriteria)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitInt)
    .select(
      "-password -refreshToken -emailVerifyOTP -emailOTPExpire -forgotPasswordToken -emailVerificationToken"
    )
    .exec();

  const totalUsers = await User.countDocuments(searchCriteria);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users,
        currentPage: pageInt,
        totalPages: Math.ceil(totalUsers / limitInt),
        totalUsers,
      },
      "Customers retrieved successfully."
    )
  );
});

const getSubscriptionCards = asyncHandler(async (req, res) => {
  const {
    search,
    planId,
    // status,
    startDateSort,
    endDateSort,
    page = 1,
    limit = 10,
  } = req.query;

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

  // if (status) {
  //   const statusArray = status.split(",");
  //   searchCriteria.subscriptionStatus = { $in: statusArray };
  // }

  const sort = {};
  if (startDateSort) {
    sort.startDate = startDateSort === "asc" ? 1 : -1; // Ascending or descending
  } else if (endDateSort) {
    sort.endDate = endDateSort === "asc" ? 1 : -1; // Ascending or descending
  } else {
    sort.startDate = -1; // Default sorting by recent startDate
  }

  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);
  const skip = (pageInt - 1) * limitInt;

  const totalPipeline = [
    {
      $match: { subscriptionStatus: "inProgress" },
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
    // {
    //   $addFields: {
    //     "card.publicLink": "$card.publicLink",
    //   },
    // },
    {
      $match: searchCriteria,
    },
  ];

  const totalResult = await Subscribe.aggregate([
    ...totalPipeline,
    { $count: "total" },
  ]);
  const totalSubscriptionCards = totalResult[0]?.total || 0;

  const subscriptionCards = await Subscribe.aggregate([
    ...totalPipeline,
    {
      $sort: sort,
    },
    { $skip: skip },
    { $limit: limitInt },
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
        "card.publicLink": 1,
        "card.profileImg": 1,
        "card.firstName": 1,
        "card.lastName": 1,
        "card.email": 1,
        "card.businessName": 1,
        "card.jobTitle": 1,
        "card.isPublic": 1,
        "card.isBlocked": 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        subscriptionCards,
        currentPage: pageInt,
        totalPages: Math.ceil(totalSubscriptionCards / limitInt),
        totalSubscriptionCards,
      },
      "Subscription cards retrieved successfully."
    )
  );
});

const getAllCards = asyncHandler(async (req, res) => {
  const { search, isPublic, isBlocked, page = 1, limit = 10 } = req.query;

  let searchCriteria = {};
  if (search) {
    const searchRegex = new RegExp(search, "i");
    searchCriteria.$or = [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { businessName: searchRegex },
      { jobTitle: searchRegex },
      { email: searchRegex },
    ];
  }

  if (isPublic) {
    const isPublicArray = isPublic.split(",").map((value) => value === "true");
    searchCriteria.isPublic = { $in: isPublicArray };
  }

  if (isBlocked) {
    const isBlockedArray = isBlocked
      .split(",")
      .map((value) => value === "true");
    searchCriteria.isBlocked = { $in: isBlockedArray };
  }

  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);
  const skip = (pageInt - 1) * limitInt;

  const totalPipeline = [
    {
      $addFields: {
        email: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$primaryActions",
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
        email: "$email.value",
      },
    },
    {
      $match: searchCriteria,
    },
  ];

  const totalResult = await Card.aggregate([
    ...totalPipeline,
    { $count: "total" },
  ]);
  const totalAllCards = totalResult[0]?.total || 0;

  const allCards = await Card.aggregate([
    ...totalPipeline,
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limitInt },
    {
      $project: {
        _id: 1,
        userId: 1,
        profileImg: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        businessName: 1,
        jobTitle: 1,
        isPublic: 1,
        isBlocked: 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        allCards,
        currentPage: pageInt,
        totalPages: Math.ceil(totalAllCards / limitInt),
        totalAllCards,
      },
      "All cards retrieved successfully."
    )
  );
});

const getInactiveCards = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;

  let searchCriteria = {};
  if (search) {
    const searchRegex = new RegExp(search, "i");
    searchCriteria.$or = [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { businessName: searchRegex },
      { jobTitle: searchRegex },
      { email: searchRegex },
    ];
  }

  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);
  const skip = (pageInt - 1) * limitInt;

  const totalPipeline = [
    {
      $match: { isPublic: false },
    },
    {
      $addFields: {
        email: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$primaryActions",
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
        email: "$email.value",
      },
    },
    {
      $match: searchCriteria,
    },
  ];

  const totalResult = await Card.aggregate([
    ...totalPipeline,
    { $count: "total" },
  ]);
  const totalInactiveCards = totalResult[0]?.total || 0;

  const inactiveCards = await Card.aggregate([
    ...totalPipeline,
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limitInt },
    {
      $project: {
        _id: 1,
        userId: 1,
        profileImg: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        businessName: 1,
        jobTitle: 1,
        isPublic: 1,
        isBlocked: 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        inactiveCards,
        currentPage: pageInt,
        totalPages: Math.ceil(totalInactiveCards / limitInt),
        totalInactiveCards,
      },
      "All cards retrieved successfully."
    )
  );
});

const blockingCard = asyncHandler(async (req, res) => {
  const { cardId } = req.params;

  if (!mongoose.isValidObjectId(cardId)) {
    throw new ApiError(400, "Invalid card ID.");
  }

  const card = await Card.findById(cardId);
  if (!card) {
    throw new ApiError(404, "Card not found.");
  }

  if (card.isBlocked) {
    throw new ApiError(404, "Card is already blocked.");
  }

  if (!card.isPublic) {
    throw new ApiError(404, "Card is not public.");
  }

  card.isBlocked = true;
  card.isPublic = false;
  card.blockedDate = new Date();
  await card.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Card Blocked Successfully."));
});

const blockCards = asyncHandler(async (req, res) => {
  const { search, planId, blockDateSort, page = 1, limit = 10 } = req.query;

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

  const sort = {};
  if (blockDateSort) {
    sort.blockDateSort = blockDateSort === "asc" ? 1 : -1;
  }

  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);
  const skip = (pageInt - 1) * limitInt;

  const totalPipeline = [
    {
      $match: { subscriptionStatus: "inProgress" },
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
      $match: { "card.isBlocked": true },
    },
    {
      $match: searchCriteria,
    },
  ];

  const totalResult = await Subscribe.aggregate([
    ...totalPipeline,
    { $count: "total" },
  ]);

  const totalBlockedCards = totalResult[0]?.total || 0;

  const blockedCards = await Subscribe.aggregate([
    ...totalPipeline,
    {
      $sort: sort,
    },
    { $skip: skip },
    { $limit: limitInt },
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
        "card.publicLink": 1,
        "card.profileImg": 1,
        "card.firstName": 1,
        "card.lastName": 1,
        "card.email": 1,
        "card.businessName": 1,
        "card.jobTitle": 1,
        "card.isPublic": 1,
        "card.isBlocked": 1,
        "card.blockedDate": 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        blockedCards,
        currentPage: pageInt,
        totalPages: Math.ceil(totalBlockedCards / limitInt),
        totalBlockedCards,
      },
      "Blocked cards retrieved successfully."
    )
  );
});

const unBlockCard = asyncHandler(async (req, res) => {
  const { cardId } = req.params;

  if (!mongoose.isValidObjectId(cardId)) {
    throw new ApiError(400, "Invalid card ID.");
  }

  const card = await Card.findById(cardId);
  if (!card) {
    throw new ApiError(404, "Card not found.");
  }

  if (!card.isBlocked) {
    throw new ApiError(400, "Card is already unblocked.");
  }

  card.isBlocked = false;
  card.isPublic = true;
  card.blockedDate = null;
  await card.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Card Unblocked Successfully."));
});

export {
  getRecentSubscriptions,
  getCustomers,
  getSubscriptionCards,
  getAllCards,
  getInactiveCards,
  blockingCard,
  blockCards,
  unBlockCard,
};
