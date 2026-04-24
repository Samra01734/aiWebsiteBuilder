import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isAuth = async (req, res, next) => {
  try {
    // 🔥 GET TOKEN FROM HEADER (NOT COOKIE)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "token not found" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};

export default isAuth;