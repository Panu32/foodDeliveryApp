import dotenv from 'dotenv'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { FoodItem } from "../models/fooditem.model.js";

dotenv.config();

const addFoodItem = asyncHandler(async (req, res) => {
  const { name, description, price, category, isAvailable } = req.body;

  if (!name || !price) {
    throw new ApiError(400, "Name and Price are required");
  }

  const imageLocalPath = req.files?.image?.[0]?.path; // ✅ Corrected field name

  if (!imageLocalPath) {
    throw new ApiError(400, "Food image file is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    throw new ApiError(400, "Image file upload failed");
  }

  const food = await FoodItem.create({
    name,
    description,
    image: image.url,
    price,
    category,
    isAvailable,
  });

  res.status(201).json({
    success: true,
    message: "Food Item added successfully!",
    data: food,
  });
});

export { addFoodItem };
