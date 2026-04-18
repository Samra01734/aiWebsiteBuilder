import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// =====================
// GOOGLE AUTH
// =====================
export const googleAuth = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    // validation
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // find user
    let user = await User.findOne({ email });

    // create if not exists
    if (!user) {
      user = await User.create({
        name,
        email,
        avatar,
      });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "8d" }
    );

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // production me true karna hai (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // response
    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log("Google Auth Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// LOGOUT
// =====================
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.log("Logout Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
}; 