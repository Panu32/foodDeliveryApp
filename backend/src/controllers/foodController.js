import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";

// Add Food Item
const addFood = async (req, res) => {
  try {
    const image_filename = req.file?.filename; // optional chaining for safety

    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category || !image_filename) {
      return res.json({ success: false, message: "All fields are required." });
    }

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.json({ success: false, message: "Error adding food item" });
  }
};

// List All Food Items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error listing foods:", error);
    res.json({ success: false, message: "Error fetching food list" });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // Delete the image from uploads folder
    const imagePath = path.join("uploads", food.image);
    fs.unlink(imagePath, (err) => {
      if (err) console.warn("Image not found or already deleted.");
    });

    // Delete from DB
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.json({ success: false, message: "Error deleting food item" });
  }
};

export { addFood, listFood, removeFood };
