import mongoose from "mongoose"
import { Schema } from "mongoose"

const foodItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        price: {
            type: Number,
            required: true
        },
        image:{
             type: String,
             required: true,
        }, 
        category: String,
        isAvailable: {
          type: Boolean,
          default: true
        }
    }
)



export const FoodItem = mongoose.model("FoodItem", foodItemSchema);
