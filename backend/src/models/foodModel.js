// models/Food.js
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },            // kept optional (if you always have it, set required:true)
  category: { type: String, required: true },
}, { timestamps: true });

// Use existing collection "foods" and avoid re-defining model in dev hot-reload
const Food = mongoose.models.Food || mongoose.model("Food", foodSchema, "foods");
export default Food;
