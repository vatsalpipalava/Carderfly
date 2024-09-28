import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Card } from "../models/card.model.js";
import { Subscribe } from "../models/subscribe.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { razorpay } from "../app.js";
import crypto from "crypto";
import { Coupon } from "../models/coupon.model.js";
import { Invoice } from "../models/invoice.model.js";

const subscriptionDetails = [
  {
    planId: "inr_starter",
    amount: "₹399",
    duration: "3 Months",
    razorpayAmount: 39900,
    month: 3,
    currency: "INR",
  },
  {
    planId: "inr_standard",
    amount: "₹599",
    duration: "6 Months",
    razorpayAmount: 59900,
    month: 6,
    currency: "INR",
  },
  {
    planId: "inr_premium",
    amount: "₹999",
    duration: "12 Months",
    razorpayAmount: 99900,
    month: 12,
    currency: "INR",
  },
  {
    planId: "usd_starter",
    amount: "$7",
    duration: "3 Months",
    razorpayAmount: 700,
    month: 3,
    currency: "USD",
  },
  {
    planId: "usd_standard",
    amount: "$10",
    duration: "6 Months",
    razorpayAmount: 1000,
    month: 6,
    currency: "USD",
  },
  {
    planId: "usd_premium",
    amount: "$15",
    duration: "12 Months",
    razorpayAmount: 1500,
    month: 12,
    currency: "USD",
  },
];

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

const calculateAmount = asyncHandler(async (req, res) => {
  const userId = req._id;
  const cardId = req.params.cardId;
  const planId = req.params.planId;
  const { country, state, taxNo, coupon } = req.query;

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

  const subscription = subscriptionDetails.find(
    (subscriptionDetail) => subscriptionDetail.planId === planId
  );

  if (!subscription) {
    throw new ApiError(404, "Invalid Subscription.");
  }

  let subTotal = subscription.razorpayAmount;
  let discountAmount = 0;

  let couponName;
  let couponDiscount;
  let couponCode;
  if (coupon) {
    const validCoupon = await Coupon.findOne({ code: coupon });
    if (validCoupon) {
      discountAmount = (subTotal * validCoupon.discount) / 100;
      couponName = validCoupon.name;
      couponDiscount = validCoupon.discount;
      couponCode = validCoupon.code;
    }
  }

  const discountedAmount = subTotal - discountAmount;

  const taxRate = 18;
  const totalExcludingTax = Math.round(discountedAmount / (1 + taxRate / 100));

  // Calculate tax (GST breakdown)
  const taxAmount = discountedAmount - totalExcludingTax;

  let cgst = null,
    sgst = null,
    igst = null;

  if (country === "IN") {
    if ((taxNo && taxNo.startsWith("24")) || state === "GJ") {
      const halfTaxAmount = Math.round(taxAmount / 2);
      cgst = { taxPercentage: 9, taxAmount: halfTaxAmount };
      sgst = { taxPercentage: 9, taxAmount: halfTaxAmount };
    } else {
      igst = { taxPercentage: 18, taxAmount: Math.round(taxAmount) };
    }
  } else {
    igst = { taxPercentage: 18, taxAmount: Math.round(taxAmount) };
  }

  const finalTotal = discountedAmount;

  // const finalRoundOff = Math.floor(finalTotal / 100) * 100;

  // const roundOff = finalRoundOff - finalTotal;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        card: {
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
        invoice: {
          plan: subscription.planId,
          currency: subscription.currency,
          coupon: {
            name: couponName,
            discount: couponDiscount,
            code: couponCode,
          },
          subTotal: subTotal,
          discount: Math.round(discountAmount),
          totalExcludingTax: totalExcludingTax,
          tax: {
            cgst: cgst,
            sgst: sgst,
            igst: igst,
          },
          taxAmount: Math.round(taxAmount),

          // roundOff: roundOff,
          total: Math.round(finalTotal),
        },
      },
      "Final amount is retrieved."
    )
  );
});

const checkoutSession = asyncHandler(async (req, res) => {
  const userId = req._id;
  const cardId = req.params.cardId;
  const { invoice } = req.body;

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

  const options = {
    amount: invoice.total,
    currency: invoice.currency,
    notes: {
      userId: userId,
      cardId: cardId,
      planId: invoice.plan,
      coupon: invoice?.coupon?.code,
      couponDiscount: invoice?.coupon?.discount,
      subTotal: invoice?.subTotal,
      discount: invoice?.discount,
      totalExcludingTax: invoice.totalExcludingTax,
      cgstPercentage: invoice?.tax?.cgst?.taxPercentage,
      cgst: invoice?.tax?.cgst?.taxAmount,
      sgstPercentage: invoice?.tax?.sgst?.taxPercentage,
      sgst: invoice?.tax?.sgst?.taxAmount,
      igstPercentage: invoice?.tax?.igst?.taxPercentage,
      igst: invoice?.tax?.igst?.taxAmount,
      total: invoice.total,
    },
  };

  try {
    const response = await razorpay.orders.create(options);
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          userId: userId,
          id: response.id,
          currency: response.currency,
          amount: response.amount,
        },
        "Checkout Session Created."
      )
    );
  } catch (error) {
    throw new ApiError(error.statusCode, error.error);
  }
});

const paymentVerification = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const cardId = req.params.cardId;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const response = await razorpay.orders.fetch(razorpay_order_id);
    console.log(response);

    const selectedSubscription = subscriptionDetails.find(
      (subscriptionDetail) =>
        subscriptionDetail.planId === response.notes.planId
    );

    const { planId, amount, duration, month } = selectedSubscription;

    const startDate = new Date(response.created_at * 1000);
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
      subscriptionAmount: response.amount,
      subscriptionCurrency: response.currency,
      subscriptionDuration: duration,
      razorpayOrderId: response.id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      startDate: startDate,
      endDate: endDate,
    });

    const subscribe = await subscription.save();

    const card = await Card.findOne({ _id: cardId, userId: userId });

    card.subscribeId = subscribe._id;
    card.isPublic = true;
    await card.save();

    const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id);

    // Fetch the last invoice
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });

    let newInvoiceNumber;
    if (lastInvoice) {
      // Extract the number and increment
      const lastNumber = parseInt(lastInvoice.invoiceNumber.split("-")[1], 10);
      newInvoiceNumber = `CD-${(lastNumber + 1).toString().padStart(4, "0")}`;
    } else {
      // If no invoices exist, start with CD-0001
      newInvoiceNumber = "CD-0001";
    }

    const invoice = new Invoice({
      invoice: razorpayPayment,
      invoiceNumber: newInvoiceNumber,
    });
    await invoice.save();

    res.redirect(
      `${process.env.SEC_FRONTEND_URL}/checkout/payment/success/subscribe/card/${cardId}/${razorpay_payment_id}`
    );
  } else {
    res.redirect(`${process.env.SEC_FRONTEND_URL}/dashboard/my-cards`);
  }
});

const successPayment = asyncHandler(async (req, res) => {
  const userId = req._id;

  const cardId = req.params.cardId;
  const razorpayPaymentId = req.params.razorpayPaymentId;

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

  const subscribe = await Subscribe.findOne({
    razorpayPaymentId: razorpayPaymentId,
  });

  if (!subscribe) {
    throw new ApiError(404, "Cards not found.");
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

  const adminUserId = process.env.ADMIN_USER_ID;
  if (card.userId.toString() === adminUserId) {
    return res.status(200).json(new ApiResponse(200, card, "Access granted to admin."));
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
  calculateAmount,
  checkoutSession,
  paymentVerification,
  successPayment,
  subscribedCard,
  subscribedCardListDashboard,
};
