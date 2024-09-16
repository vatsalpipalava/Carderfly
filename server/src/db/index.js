// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// // Define the username and password
// const USERNAME = process.env.DB_USER;
// const PASSWORD = process.env.DB_PASSWORD;
// const AUTHSOURCE = process.env.DB_AUTHSOURCE;

// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `mongodb://${USERNAME}:${PASSWORD}@127.0.0.1:27017/${DB_NAME}?authSource=${AUTHSOURCE}`
//     );
//     console.log(
//       `\nMongoDB connected !!\nDB HOST: ${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.log("MONGODB connection FAILED:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB connected !!\nDB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED:", error);
    process.exit(1);
  }
};

export default connectDB;

// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${DB_NAME}`,
//     );
//     console.log(`\nMongoDB connected !!\nDB HOST: ${connectionInstance.connection.host}`);

//     const cardCollection = connectionInstance.connection.db.collection("cards");

//     // Drop the index if it exists
//     const indexNames = (await cardCollection.indexes()).map(index => index.name);

//     const indexesToDrop = [
//       "primaryActions._id_1",
//       "secondaryActions._id_1",
//       "sections._id_1",
//       "sections.subSections._id_1"
//     ];

//     for (const index of indexesToDrop) {
//       if (indexNames.includes(index)) {
//         await cardCollection.dropIndex(index);
//         console.log(`Index ${index} dropped successfully`);
//       } else {
//         console.log(`Index ${index} not found`);
//       }
//     }

//   } catch (error) {
//     console.log("MONGODB connection FAILED:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;
