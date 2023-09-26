import mongoose from "mongoose";

// user Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [6, "Password is minimum 6 character"],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// user model
const User = mongoose.model("user", userSchema);

// export
export default User;
