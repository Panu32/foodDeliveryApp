import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import foodRouter from "./src/routes/foodRoute.js";
import userRouter from "./src/routes/userRoute.js";
import cartRouter from "./src/routes/cartRoute.js";
import orderRouter from "./src/routes/orderRoute.js";
import aiRouter from "./src/routes/aiRoutes.js"; // ✅ AI Routes
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// App config
const app = express();
const port = 4000; // ✅ Fixed to 4000

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Serve images statically from /uploads
app.use("/images", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/ai", aiRouter); // ✅ Gemini AI route

// Root route
app.get("/", (req, res) => {
  res.send("✅ API Working (Food Delivery + Gemini AI Integrated)");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
