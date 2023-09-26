import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = payload._id;
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access!",
      });
    }
  } catch (error) {
    console.log(`Error in require login middleware: ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in require login",
      error: error.message,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(`Error in isAdmin Middleware: ${error}`);
  }
};
