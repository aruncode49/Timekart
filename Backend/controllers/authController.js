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
