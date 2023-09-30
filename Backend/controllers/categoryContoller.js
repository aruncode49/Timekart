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

// get all categories controller
export async function getAllCategoriesController(req, res) {
  try {
    const allCategories = await Category.find({});
    if (!allCategories) {
      return res.status(200).send({
        success: false,
        message: "Category List is empty",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category fetched Successfully",
      allCategories,
    });
  } catch (error) {
    console.log(`Error inside get all categories controller: ${error}`);
    return res.status(500).send({
      error,
      success: false,
      message: "Error inside get all categories controller",
    });
  }
}

// get a single category controller
export async function getSingleCategoryController(req, res) {
  try {
    const categorySlug = req.params.slug;
    const getCategoryFromSlug = await Category.findOne({ slug: categorySlug });

    if (!getCategoryFromSlug) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Category Found!",
      getCategoryFromSlug,
    });
  } catch (error) {
    console.log(`Error inside get single category controller: ${error}`);
    return res.status(500).send({
      error,
      success: false,
      message: "Error inside get single category controller",
    });
  }
}

// delete category controller
export async function deleteCategoryController(req, res) {
  try {
    const categoryId = req.params.id;
    await Category.findByIdAndDelete(categoryId);
    return res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(`Error inside delete category controller: ${error}`);
    return res.status(500).send({
      error,
      success: false,
      message: "Error inside delete category controller",
    });
  }
}
