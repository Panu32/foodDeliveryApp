import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, // Cloudinary URL
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    refreshToken: {
      type: String,
      select: false,
    }
  },
  {
    timestamps: true, // ✅ Proper placement of schema options
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Access token generation
userSchema.methods.generateAccessToken = function () {
  console.log("in model access error")
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET, // Use ACCESS_TOKEN_SECRET from environment
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // From .env
    }
  );
};

// Refresh token generation
userSchema.methods.generateRefreshToken = function () {
  console.log("in model refresh error")
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, // Use REFRESH_TOKEN_SECRET from environment
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // From .env
    }
  );
};

export const User = mongoose.model("User", userSchema);
