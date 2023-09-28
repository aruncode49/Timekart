import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Same category already exist"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);

export default Category;
