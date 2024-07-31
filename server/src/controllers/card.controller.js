import mongoose from "mongoose";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import vCardsJS from "vcards-js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Card } from "../models/card.model.js";

const baseURL = process.env.BACKEND_URL;

// Create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to handle base64 image conversion and storage
const convertAndStoreImages = (images, fieldName, publicLink, storedFiles) => {
  return images.map((base64Image, index) => {
    const fileName = `${fieldName}-${Date.now()}-${index}.png`; // You can change the extension as needed
    const filePath = base64ToFile(base64Image, fileName, publicLink);
    storedFiles.push(filePath); // Track the stored file
    return `${baseURL}/${filePath.replace(/\\/g, "/")}`; // Convert backslashes to forward slashes for URL
  });
};

const base64ToFile = (base64String, fileName, publicLink) => {
  const matches = base64String.match(
    /^data:image\/([A-Za-z-+/]+);base64,(.+)$/
  );
  if (!matches) {
    throw new Error("Invalid base64 string");
  }

  const imageBuffer = Buffer.from(matches[2], "base64");
  // const dirPath = path.join("uploads", publicLink);
  const dirPath = path.join(__dirname, "..", "..", "public", "temp", publicLink);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, fileName);
  fs.writeFileSync(filePath, imageBuffer);

  return filePath;
};

const deleteStoredFiles = (files) => {
  files.forEach((file) => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
};

// Helper function to check if a string is a base64 image
const isBase64Image = (str) => {
  return (
    typeof str === "string" && /^data:image\/([A-Za-z-+/]+);base64,/.test(str)
  );
};

const createCard = async (req, res) => {
  const storedFiles = [];

  const userId = req._id;
  try {
    const {
      templateId,
      publicLink,
      profileImg,
      backCoverImg,
      logoImg,
      firstName,
      lastName,
      jobTitle,
      businessName,
      businessAddress,
      businessDescription,
      primaryActions,
      secondaryActions,
      sections,
      colors,
    } = req.body;

    if (!publicLink) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Public link is required."));
    }

    const existingCard = await Card.findOne({ publicLink });
    if (existingCard) {
      return res
        .status(409)
        .json(new ApiResponse(409, {}, "Public link already exists."));
    }

    // Convert base64 images and store the file paths
    const profileImgPath = profileImg
      ? convertAndStoreImages(
          [profileImg],
          "profileImg",
          publicLink,
          storedFiles
        )[0]
      : null;
    const backCoverImgPath = backCoverImg
      ? convertAndStoreImages(
          [backCoverImg],
          "backCoverImg",
          publicLink,
          storedFiles
        )[0]
      : null;
    const logoImgPath = logoImg
      ? convertAndStoreImages([logoImg], "logoImg", publicLink, storedFiles)[0]
      : null;

    // Convert and store section images
    const updatedSections = sections.map((section) => {
      const updatedSubSections = section.subSections.map((subSection) => {
        const subSectionImgPath = subSection.image
          ? convertAndStoreImages(
              [subSection.image],
              "subSectionImg",
              publicLink,
              storedFiles
            )[0]
          : null;
        return { ...subSection, image: subSectionImgPath };
      });
      return { ...section, subSections: updatedSubSections };
    });

    // Create the card document
    const newCard = new Card({
      userId,
      templateId,
      publicLink,
      profileImg: profileImgPath,
      backCoverImg: backCoverImgPath,
      logoImg: logoImgPath,
      firstName,
      lastName,
      jobTitle,
      businessName,
      businessAddress,
      businessDescription,
      primaryActions,
      secondaryActions,
      sections: updatedSections,
      colors,
    });

    // Save the card to the database
    await newCard.save();

    return res
      .status(201)
      .json(
        new ApiResponse(201, { card: newCard }, "Card created successfully!")
      );
  } catch (error) {
    console.error("Error creating card:", error);
    // Clean up stored files
    deleteStoredFiles(storedFiles);
    res
      .status(500)
      .json(new ApiError(500, "Server error. Could not create card."));
  }
};

const existingCard = asyncHandler(async (req, res) => {
  const { publicLink } = req.body;
  const existingPublicLink = await Card.findOne({ publicLink });
  if (existingPublicLink) {
    throw new ApiError(409, "Public link already taken.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, publicLink, "Link is available."));
});

// const getCards = asyncHandler(async (req, res) => {
//   const userId = req._id;
//   const { search } = req.query;

//   // Construct the search query
//   let searchQuery = { userId: userId };

//   if (search) {
//     searchQuery.$or = [
//       { firstName: { $regex: search, $options: "i" } },
//       { lastName: { $regex: search, $options: "i" } },
//       { jobTitle: { $regex: search, $options: "i" } },
//       { "primaryActions.value": { $regex: search, $options: "i" } },
//     ];
//   }

//   const cards = await Card.find(searchQuery)
//     .sort({ updatedAt: -1 })
//     .select(
//       "_id userId templateId publicLink profileImg backCoverImg firstName lastName jobTitle primaryActions isPublic isBlocked createdAt updatedAt"
//     );

//   if (!cards || cards.length === 0) {
//     throw new ApiError(404, "Cards not found.");
//   }

//   const transformedCards = cards.map((card) => {
//     const primaryActions = card.primaryActions.filter(
//       (action) => action._id === "email" || action._id === "mobile"
//     );

//     return {
//       _id: card._id,
//       userId: card.userId,
//       templateId: card.templateId,
//       publicLink: card.publicLink,
//       profileImg: card.profileImg,
//       backCoverImg: card.backCoverImg,
//       firstName: card.firstName,
//       lastName: card.lastName,
//       jobTitle: card.jobTitle,
//       primaryActions: primaryActions.map((action) => ({
//         _id: action._id,
//         value: action.value,
//       })),
//       isPublic: card.isPublic,
//       isBlocked: card.isBlocked,
//       createdAt: card.createdAt,
//       updatedAt: card.updatedAt,
//     };
//   });

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         { cards: transformedCards },
//         "Cards retrieved successfully."
//       )
//     );
// });

const getCards = asyncHandler(async (req, res) => {
  const userId = req._id;
  const { search, active, inactive, blocked } = req.query;

  // Construct the search query
  let searchQuery = { userId: userId };

  if (search) {
    searchQuery.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { jobTitle: { $regex: search, $options: "i" } },
      { "primaryActions.value": { $regex: search, $options: "i" } },
    ];
  }

  // Add status filters
  const statusFilters = [];
  if (active === "true") {
    statusFilters.push({ isPublic: true });
  }
  if (inactive === "true") {
    statusFilters.push({ isPublic: false });
  }
  if (blocked === "true") {
    statusFilters.push({ isBlocked: true });
  }

  if (statusFilters.length > 0) {
    searchQuery.$and = [{ $or: statusFilters }];
  }

  const cards = await Card.find(searchQuery)
    .sort({ updatedAt: -1 })
    .select(
      "_id userId templateId publicLink profileImg backCoverImg firstName lastName jobTitle primaryActions isPublic isBlocked createdAt updatedAt"
    );

  if (!cards || cards.length === 0) {
    throw new ApiError(404, "Cards not found.");
  }

  const transformedCards = cards.map((card) => {
    const primaryActions = card.primaryActions.filter(
      (action) => action._id === "email" || action._id === "mobile"
    );

    return {
      _id: card._id,
      userId: card.userId,
      templateId: card.templateId,
      publicLink: card.publicLink,
      profileImg: card.profileImg,
      backCoverImg: card.backCoverImg,
      firstName: card.firstName,
      lastName: card.lastName,
      jobTitle: card.jobTitle,
      primaryActions: primaryActions.map((action) => ({
        _id: action._id,
        value: action.value,
      })),
      isPublic: card.isPublic,
      isBlocked: card.isBlocked,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    };
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cards: transformedCards },
        "Cards retrieved successfully."
      )
    );
});

const getNotSubscribedCard = asyncHandler(async (req, res) => {
  const userId = req._id;
  const cardId = req.params.cardId;

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

  return res
    .status(200)
    .json(new ApiResponse(200, card, "Card retrieved successfully."));
});

const editCard = async (req, res) => {
  const storedFiles = [];

  const userId = req._id;
  const { cardId } = req.params;

  if (!mongoose.isValidObjectId(cardId)) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid card ID."));
  }

  try {
    const {
      templateId,
      publicLink,
      profileImg,
      backCoverImg,
      logoImg,
      firstName,
      lastName,
      jobTitle,
      businessName,
      businessAddress,
      businessDescription,
      primaryActions,
      secondaryActions,
      sections,
      colors,
    } = req.body;

    if (!publicLink) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Public link is required."));
    }

    const existingCard = await Card.findOne({ _id: cardId, userId });
    if (!existingCard) {
      return res.status(404).json(new ApiResponse(404, {}, "Card not found."));
    }

    // Extract file paths from URLs
    const extractFilePath = (url) => {
      if (url) {
        const urlParts = url.split(`${baseURL}/`);
        return urlParts.length > 1
          ? urlParts[1].replace(/\//g, path.sep)
          : null;
      }
      return null;
    };

    // Track old image paths
    const oldProfileImgPath = extractFilePath(existingCard.profileImg);
    const oldBackCoverImgPath = extractFilePath(existingCard.backCoverImg);
    const oldLogoImgPath = extractFilePath(existingCard.logoImg);
    const oldSectionImages = existingCard.sections
      .map((section) =>
        section.subSections.map((subSection) =>
          extractFilePath(subSection.image)
        )
      )
      .flat()
      .filter(Boolean); // Remove null values

    // Update public link check if it's changed
    if (existingCard.publicLink !== publicLink) {
      const publicLinkExists = await Card.findOne({ publicLink });
      if (publicLinkExists) {
        return res
          .status(409)
          .json(new ApiResponse(409, {}, "Public link already exists."));
      }
    }

    // Convert base64 images and store the file paths only if the image data is in base64 format
    const profileImgPath = isBase64Image(profileImg)
      ? convertAndStoreImages(
          [profileImg],
          "profileImg",
          publicLink,
          storedFiles
        )[0]
      : profileImg || existingCard.profileImg;
    const backCoverImgPath = isBase64Image(backCoverImg)
      ? convertAndStoreImages(
          [backCoverImg],
          "backCoverImg",
          publicLink,
          storedFiles
        )[0]
      : backCoverImg || existingCard.backCoverImg;
    const logoImgPath = isBase64Image(logoImg)
      ? convertAndStoreImages([logoImg], "logoImg", publicLink, storedFiles)[0]
      : logoImg || existingCard.logoImg;

    // Convert and store section images only if the image data is in base64 format
    const updatedSections = sections.map((section, sectionIndex) => {
      const updatedSubSections = section.subSections.map(
        (subSection, subSectionIndex) => {
          const subSectionImgPath = isBase64Image(subSection.image)
            ? convertAndStoreImages(
                [subSection.image],
                "subSectionImg",
                publicLink,
                storedFiles
              )[0]
            : subSection.image ||
              existingCard.sections[sectionIndex].subSections[subSectionIndex]
                .image;
          return { ...subSection, image: subSectionImgPath };
        }
      );
      return { ...section, subSections: updatedSubSections };
    });

    // Update the card document
    existingCard.templateId = templateId;
    existingCard.publicLink = publicLink;
    existingCard.profileImg = profileImgPath;
    existingCard.backCoverImg = backCoverImgPath;
    existingCard.logoImg = logoImgPath;
    existingCard.firstName = firstName;
    existingCard.lastName = lastName;
    existingCard.jobTitle = jobTitle;
    existingCard.businessName = businessName;
    existingCard.businessAddress = businessAddress;
    existingCard.businessDescription = businessDescription;
    existingCard.primaryActions = primaryActions;
    existingCard.secondaryActions = secondaryActions;
    existingCard.sections = updatedSections;
    existingCard.colors = colors;

    // Save the updated card to the database
    await existingCard.save();

    // Delete old images if new images were uploaded
    if (isBase64Image(profileImg) && oldProfileImgPath)
      deleteStoredFiles([oldProfileImgPath]);
    if (isBase64Image(backCoverImg) && oldBackCoverImgPath)
      deleteStoredFiles([oldBackCoverImgPath]);
    if (isBase64Image(logoImg) && oldLogoImgPath)
      deleteStoredFiles([oldLogoImgPath]);
    // Improved logic to delete old section images
    const newSectionImages = updatedSections
      .map((section) =>
        section.subSections.map((subSection) =>
          extractFilePath(subSection.image)
        )
      )
      .flat()
      .filter(Boolean); // Remove null values

    oldSectionImages.forEach((oldImagePath) => {
      if (!newSectionImages.includes(oldImagePath)) {
        deleteStoredFiles([oldImagePath]);
      }
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { card: existingCard },
          "Card updated successfully!"
        )
      );
  } catch (error) {
    console.error("Error updating card:", error);
    // Clean up stored files
    deleteStoredFiles(storedFiles);
    res
      .status(500)
      .json(new ApiError(500, "Server error. Could not update card."));
  }
};

const downloadVcf = asyncHandler(async (req, res) => {
  const cardId = req.params.cardId;

  if (!mongoose.isValidObjectId(cardId)) {
    throw new ApiError(404, "Invalid card ID.");
  }

  const card = await Card.findById(cardId);

  if (!card) {
    throw new ApiError(404, "Card not found");
  }

  const vCard = generateVCard(card);

  const tempFileName = `temp_${cardId}.vcf`;
  fs.writeFileSync(tempFileName, vCard.toString());

  res.download(tempFileName, `${card.publicLink}.vcf`, (err) => {
    if (err) {
      throw new ApiError(500, "Failed to download VCF file.");
    }
    fs.unlinkSync(tempFileName);
  });
});

function generateVCard(card) {
  const vCard = vCardsJS();
  
  const mobile = card?.primaryActions.find((action) => action._id === "mobile");
  const office = card?.primaryActions.find((action) => action._id === "office");
  const email = card?.primaryActions.find((action) => action._id === "email");
  const website = card?.primaryActions.find(
    (action) => action._id === "website"
  );
  const location = card?.primaryActions.find(
    (action) => action._id === "location"
  );
  
  vCard.firstName = card?.firstName;
  vCard.lastName = card?.lastName;
  vCard.photo.attachFromUrl(`${card?.profileImg}`, "JPEG");

  vCard.organization = card?.businessName;
  vCard.title = card?.jobTitle;

  vCard.workEmail = email?.value;
  vCard.workPhone = office?.value;
  vCard.cellPhone = mobile?.value;

  vCard.workAddress.street = card?.businessAddress || '';

  vCard.url = website?.value;
  vCard.workUrl = location?.value;

  vCard.note = card?.businessDescription;

  vCard.logo.attachFromUrl(`${card?.logoImg}`, "JPEG");
  vCard.socialUrls['carderfly'] = `https://carderfly.com/${card?.publicLink}`;

  return vCard.getFormattedString();
}

export {
  createCard,
  existingCard,
  getCards,
  getNotSubscribedCard,
  editCard,
  downloadVcf,
};
