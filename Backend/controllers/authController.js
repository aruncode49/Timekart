import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";

// register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, role, answer } = req.body;

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

// Private Route controller for dashboard
export const userAuthController = async (req, res) => {
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
