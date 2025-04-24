import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import foodRouter from "./src/routes/foodRoute.js";

// ✅ Load environment variables
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());


// DB connection
connectDB();
// api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

// Server start
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});

