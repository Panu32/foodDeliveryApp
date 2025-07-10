import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import foodRouter from "./src/routes/foodRoute.js";
import userRouter from "./src/routes/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";

// Setup for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load environment variables
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Log the MongoDB URI for debugging purposes
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("Serving images from:", path.join(__dirname, "uploads"));

// Middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// ✅ Serve static image files correctly
app.use("/images", express.static(path.join(__dirname, "uploads")));

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

// Server start
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
