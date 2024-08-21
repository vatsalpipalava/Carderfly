import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { fileURLToPath } from "url";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportAllDbs = asyncHandler(async (req, res) => {
  // Get all collection names
  const collections = await mongoose.connection.db.listCollections().toArray();

  if (collections.length === 0) {
    throw new ApiError(404, "No collections found in the database.");
  }

  // Create a backup directory if it doesn't exist
  const backupDir = path.join(__dirname, "..", "public", "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Create a ZIP file to store all JSON backups
  const date = new Date().toISOString().split("T")[0];
  const zipFileName = `carderfly-db-${date}.zip`;
  const zipFilePath = path.join(backupDir, zipFileName);
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", () => {
    // Send the ZIP file for download
    res.download(zipFilePath, (err) => {
      if (err) {
        throw new ApiError(500, "Error in file download.");
      }

      // Remove the ZIP file after download
      fs.unlinkSync(zipFilePath);
    });
  });

  archive.on("error", (err) => {
    throw new ApiError(500, err);
  });

  archive.pipe(output);

  // Export each collection to a JSON file and add it to the ZIP archive
  for (const collectionInfo of collections) {
    const collectionName = collectionInfo.name;
    const collection = mongoose.connection.collection(collectionName);
    const data = await collection.find({}).toArray();
    const jsonData = JSON.stringify(data, null, 2);
    const jsonFileName = `${collectionName}-${date}.json`;

    // Write JSON data to the archive
    archive.append(jsonData, { name: jsonFileName });
  }

  // Finalize the archive
  archive.finalize();
});

const exportAllImages = asyncHandler(async (req, res) => {
  // Define the uploads directory
  const uploadsDir = path.join("uploads");

  if (!fs.existsSync(uploadsDir)) {
    throw new ApiError(404, "Uploads directory not found.");
  }

  // Create a backup directory if it doesn't exist
  const backupDir = path.join(__dirname, "..", "public", "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Create a ZIP file for the uploads folder
  const date = new Date().toISOString().split("T")[0];
  const zipFileName = `carderfly-images-${date}.zip`;
  const zipFilePath = path.join(backupDir, zipFileName);
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", () => {
    // Send the ZIP file for download
    res.download(zipFilePath, (err) => {
      if (err) {
        throw new ApiError(500, "Error in file download.");
      }

      // Remove the ZIP file after download
      fs.unlinkSync(zipFilePath);
    });
  });

  archive.on("error", (err) => {
    throw new ApiError(500, err);
  });

  archive.pipe(output);

  // Append the entire uploads folder to the archive
  archive.directory(uploadsDir, false);

  // Finalize the archive
  archive.finalize();
});

export { exportAllDbs, exportAllImages };
