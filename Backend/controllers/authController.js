import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";

// register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await hashPassword(password);
    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    res.status(201).send({
      success: true,
      message: "User Successfully Registered",
    });
  } catch (error) {
    console.log(`Error inside registerController : ${error}`);
    res.status(500).send({
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
    return res.status(200).send({
      success: true,
      message: "User successfully logged in",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
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
