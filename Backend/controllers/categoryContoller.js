import Category from "../models/categoryModel.js";
import slugify from "slugify";

// create category controller
export async function createCategoryController(req, res) {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ name });
    if (category) {
      return res.status(200).send({
        success: false,
        message: "same category already exist",
      });
    }

    // create entry in db
    await Category.create({
      name,
      slug: slugify(name),
    });

    return res.status(201).send({
      success: true,
      message: "category created successfully",
    });
  } catch (error) {
    console.log(`Error inside create category controller: ${error}`);
    return res.status(500).send({
      error,
      success: false,
      message: "Error inside create cateogry controller",
    });
  }
}

// update category controller
export async function updateCategoryController(req, res) {
  try {
    const { name } = req.body;
    const categoryId = req.params.id;
    await Category.findByIdAndUpdate(categoryId, { name, slug: slugify(name) });
    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(`Error inside update category controller: ${error}`);
    return res.status(500).send({
      error,
      success: false,
      message: "Error inside update cateogry controller",
    });
  }
}
