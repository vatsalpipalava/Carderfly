import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     // upload the file on cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     // file has been uploaded successful
//     // console.log("File is uploaded on cloudinary", response.url);
//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     // fs.unlinkSync(localFilePath);
//     if (fs.existsSync(localFilePath)) {
//       fs.unlinkSync(localFilePath);
//     }
//     // remove the locally saved temp file as the upload operation got failed
//     return null;
//   }
// };

const uploadOnCloudinary = async (publicLink, filePath) => {
  try {
    if (!filePath) return null;
    const result = await cloudinary.uploader.upload(filePath, {
      folder: publicLink, // Optional: specify a folder in Cloudinary
    });
    fs.unlinkSync(filePath);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

// Function to delete images from Cloudinary
const deleteImagesFromCloudinary = async (publicIds) => {
  try {
    const deletePromises = publicIds.map((publicId) =>
      cloudinary.uploader.destroy(publicId)
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
  }
};

export { uploadOnCloudinary, deleteImagesFromCloudinary };
