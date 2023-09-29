import slugify from "slugify";
import Product from "../models/productModel.js";
import fs from "fs";

// create product controller
export async function createProductController(req, res) {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    if (photo && photo.size > 1000000) {
      return res.status(500).send({
        success: false,
        message: "photo is required and should be less than 1 MB",
      });
    }

    if (photo) {
      photo.data = fs.readFileSync(photo.path);
      photo.contentType = photo.type;
    }

    await Product.create({ ...req.fields, slug: slugify(name), photo });

    return res.status(201).send({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    console.log(`Error inside create product controller : ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error inside create product controller",
      error,
    });
  }
}
