import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    templateId: {
      type: String,
      required: [true, "Template is required."],
    },
    publicLink: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "Public link is required."],
    },
    profileImg: {
      type: String,
    },
    backCoverImg: {
      type: String,
    },
    logoImg: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required."],
    },
    jobTitle: {
      type: String,
      required: [true, "Job Title is required."],
    },
    businessName: {
      type: String,
      required: [true, "Business Name is required."],
    },
    businessAddress: {
      type: String,
      required: [true, "Business Address is required."],
    },
    businessDescription: {
      type: String,
      required: [true, "Business Description is required."],
    },
    primaryActions: [
      {
        _id: String,
        value: String,
      },
    ],
    secondaryActions: [
      {
        _id: String,
        value: String,
      },
    ],
    sections: [
      {
        _id: String,
        sectionName: String,
        subSections: [
          {
            _id: String,
            image: String,
            heading: String,
          },
        ],
      },
    ],
    colors: {
      buttonBg: {
        type: String,
      },
      background: {
        type: String,
      },
      text: {
        type: String,
      },
      buttonText: {
        type: String,
      },
      cardBg: {
        type: String,
      },
      cardText: {
        type: String,
      },
      // cardSeparator: {
      //   type: String
      // },
      cardIcon: {
        type: String,
      },
      featureText: {
        type: String,
      },
      featureSeparator: {
        type: String,
      },
      footerBg: {
        type: String,
      },
      footerIcon: {
        type: String,
      },
      qrCode: {
        type: String,
      },
    },
    subscribeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscribe",
      default: null,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    blockedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Card = mongoose.model("Card", cardSchema);
