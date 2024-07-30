import { app } from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  }).catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
  });
