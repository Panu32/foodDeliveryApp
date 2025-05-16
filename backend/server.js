import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import foodRouter from "./src/routes/foodRoute.js";
import userRouter from "./src/routes/userRoute.js";

// ✅ Load environment variables
dotenv.config();
console.log(process.env.MONGODB_URI)

// App config
const app = express();
const port = process.env.PORT || 4000;

// Log the MongoDB URI for debugging purposes
console.log("MONGODB_URI:", process.env.MONGODB_URI); // Ensure this is loaded properly

// Middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

// Server start
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
