import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportAllBackups = async (req, res) => {
  try {
    // Get all collection names
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    if (collections.length === 0) {
      return res
        .status(404)
        .json({ error: "No collections found in the database" });
    }

    // Create a backup directory if it doesn't exist
    const backupDir = path.join(__dirname, "..", "public", "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Create a ZIP file to store all JSON backups
    const date = new Date().toISOString().split("T")[0]; // e.g., 2024-08-13
    const zipFileName = `backup-${date}.zip`;
    const zipFilePath = path.join(backupDir, zipFileName);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      // Send the ZIP file for download
      res.download(zipFilePath, (err) => {
        if (err) {
          console.error("Error in file download: ", err);
          res.status(500).json({ error: "Error in file download" });
        }

        // Remove the ZIP file after download
        fs.unlinkSync(zipFilePath);
      });
    });

    archive.on("error", (err) => {
      throw err;
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
  } catch (error) {
    console.error("Error exporting backups: ", error);
    res.status(500).json({ error: "Error exporting backups" });
  }
};

export { exportAllBackups };
