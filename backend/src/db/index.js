import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

// ✅ Load environment variables
dotenv.config();

const connectDB = async () => {
  console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI);

  try {
    const mongoUri = process.env.MONGODB_URI;

    // Check if the MongoDB URI is loaded properly
    if (!mongoUri) {
      console.error("❌ MONGODB_URI is undefined");
      return;
    }

    // Connect to MongoDB
    const connectionInstance = await mongoose.connect(mongoUri, {
      dbName: DB_NAME, // Ensure you're using the correct database
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected to DB: ${connectionInstance.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit the app in case of error
  }
};

export default connectDB;
