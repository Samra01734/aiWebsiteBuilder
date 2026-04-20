import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateResponse from "../config/openRouter.js";   // ← ADD THIS LINE

// =====================
// GOOGLE AUTH
// =====================
export const googleAuth = async (req, res) => {
  // ... your code
};

// =====================
// LOGOUT
// =====================
export const logOut = async (req, res) => {
  // ... your code
};

// =====================
// GENERATE DEMO
// =====================
export const generatedemo = async (req, res) => {
  try {
    const result = await generateResponse("hello");

    console.log("AI result:", result);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Generate Demo Error:", error);   // Better than console.log

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};