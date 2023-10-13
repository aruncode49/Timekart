import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";

// register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, address, role, answer } = req.body;

    // handle name error
    if (name.length < 4) {
      return res.status(200).send({
        success: false,
        message: "name must be 4 characters",
      });
    }

    // handle email error
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).send({
        success: false,
        message: "email already exist",
      });
    }

    // handle password
    if (password.length < 6) {
      return res.status(200).send({
        success: false,
        message: "password must be 6 characters",
      });
    }

    const hashedPassword = await hashPassword(password);
    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      answer,
      role,
    });

    return res.status(201).send({
      success: true,
      message: "User Successfully Registered",
    });
  } catch (error) {
    console.log(`Error inside registerController : ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // For Wrong Email
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email",
      });
    }

    // If Email is Correct then Check Password
    const hashedPassword = user.password;
    const isPasswordMatch = await comparePassword(password, hashedPassword);

    if (!isPasswordMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // If Both are Correct then create a json web token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    return res.status(200).send({
      success: true,
      message: "User successfully Logged In",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    console.log(`Error inside loginController : ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Private Route controller for user dashboard
export const userAuthController = (req, res) => {
  return res.status(200).send({ ok: true });
};

// Private Route controller for admin dashboard
export const adminAuthController = (req, res) => {
  return res.status(200).send({ ok: true });
};

// resetPasswordController
export const resetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Enter correct email address",
      });
    }

    if (answer != user.answer) {
      return res.status(200).send({
        success: false,
        message: "wrong answer",
      });
    }

    // now update password
    const hashNewPassword = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashNewPassword });

    return res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in password reset controller",
      error: error,
    });
  }
};

// test controller
export const testController = (req, res) => {
  res.status(200).send({
    success: "ok",
    message: "Test Successfull",
  });
};

// update profile controller
export const updateUserProfileController = async (req, res) => {
  try {
    const { name, password, address, phone } = req.body;
    const user = await User.findById(req.userId);

    // check name validation
    if (name && name.length < 4) {
      return res.status(200).send({
        success: false,
        message: "name must be 4 characters",
      });
    }

    // check password validation
    if (password && password.length < 6) {
      return res.status(200).send({
        success: false,
        message: "password must be 6 characters",
      });
    }

    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await hashPassword(password);
    }

    // update user data
    await User.findByIdAndUpdate(req.userId, {
      name: name || user.name,
      email: user.email,
      phone: phone || user.phone,
      address: address || user.address,
      password: hashedPassword || user.password,
    });

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      updatedUser: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in update profile controller",
      error: error.message,
    });
  }
};

// get all users controller
export const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await User.find({ role: 0 });
    res.status(200).send({
      success: true,
      allUsers,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in getAllUsersController",
      error: error.message,
    });
  }
};
