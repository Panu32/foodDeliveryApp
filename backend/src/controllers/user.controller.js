import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
//import { FoodItem } from "../models/fooditem.model.js";

dotenv.config();

const generateAccessAndRefeAndRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        console.error("User not found for ID:", userId);
        throw new ApiError(404, "User not found"); 
      }
  
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken ();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.error("Error generating tokens:", error.message);
      throw new ApiError(500, "Something went wrong while generating tokens");
    }
  };
  const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;
  
    if ([fullname, email, username, password].some((field) => !field?.trim())) {
      throw new ApiError(400, "All fields are required");
    }
  
    const existedUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
  
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }
  
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
    }
  
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  
    if (!avatar) {
      throw new ApiError(400, "Avatar file upload failed");
    }
  
    const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });
  
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        coverImage: user.coverImage,
      },
    });
  });
  const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
  
    if (!username && !email) {
      throw new ApiError(409, "Username or email is required");
    }
  
    const user = await User.findOne({
      $or: [{ username }, { email }],
    }).select("+password");
  
    if (!user) {
      throw new ApiError(404, "User doesn't exist");
    }
  
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
  
    const { accessToken, refreshToken } = await generateAccessAndRefeAndRefreshTokens(user._id);
  
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  
    const options = {
      httpOnly: true,
      secure: true, // should be false in dev if not using HTTPS
    };
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
  });
  const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
      req.user._id,
      { $set: { refreshToken: undefined } },
      { new: true }
    );
  
    const options = { httpOnly: true, secure: true };
  
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "User logged out successfully" });
  });
  const refreshAccessToken= asyncHandler(async(req,res)=>{
    const incomingRefreshToken= req.cokies.refreshToken|| req.body.refreshToken
 
    if(!incomingRefreshToken){
     throw new ApiError(401,"unauthorized request")
 
    }
    try {
      const decodedToken= jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      )
 
      const user= await User.findById(decodedToken?._id)
 
      if(!user){
       throw new ApiError(401,"Invalid Refresh Token")
      }
 
      if(incomingRefreshToken!== user?.refreshToken){
        throw new ApiError(401,"Refresh token is expiresor used")
 
      }
 
      const options={
       httpOnly: true,
       secure: true,
      }
 
      const{accessToken, newRefreshToken}=await generateAccessAndRefeAndRefreshTokens(user._id)
      return res.status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",newRefreshToken,options)
      .json(
           new ApiResponse(
             200,
             {accessToken, refreshToken: newRefreshToken},"Acess Token Refreshed"
           )
      )
 
      
 
     
    } catch (error) {
      throw new ApiError(401,error?.message|| "Invalid Refresh Token" )
 
    }
 })

 



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken

}