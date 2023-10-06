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
      return res.status(200).send({
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
      error: error.message,
    });
  }
}

// update product
export async function updateProductController(req, res) {
  try {
    const productId = req.params.pid;
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

    await Product.findByIdAndUpdate(productId, {
      ...req.fields,
      slug: slugify(name),
      photo,
    });

    return res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    console.log(`Error inside product update controller : ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error inside product update controller",
      error: error.message,
    });
  }
}

// get all product controller
export async function getAllProductsController(req, res) {
  try {
    const allProducts = await Product.find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    if (allProducts) {
      return res.status(200).send({
        success: true,
        message: "All Products",
        allProducts,
        totalProducts: allProducts.length,
      });
    }
  } catch (error) {
    console.log(`Error inside get all products controller : ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error inside get all products controller",
      error: error.message,
    });
  }
}

// get single product controller
export async function getSingleProductController(req, res) {
  try {
    const productSlug = req.params.slug;
    const product = await Product.findOne({ slug: productSlug })
      .populate("category")
      .select("-photo");
    if (product) {
      return res.status(200).send({
        success: true,
        message: "Product Fetched Successfully",
        product,
      });
    }
  } catch (error) {
    console.log(`Error inside get single products controller : ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error inside get single products controller",
      error: error.message,
    });
  }
}
// get product image controller
export async function getProductImageController(req, res) {
  try {
    const productId = req.params.pid;
    const productImage = await Product.findById(productId).select("photo");

    if (productImage.photo.data) {
      res.set("Content-type", productImage.photo.contentType);

      return res.status(200).send(productImage.photo.data);
    }
  } catch (error) {
    console.log(`Error inside product image controller : ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error inside product image controller",
      error: error.message,
    });
  }
}

// delete product controller
export async function deleteProductController(req, res) {
  try {
    const productId = req.params.pid;
    await Product.findByIdAndDelete(productId);
    return res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(`Error inside delete product controller : ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error inside delete product controller",
      error: error.message,
    });
  }
}

// product filter controller
export async function productFilterController(req, res) {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const filterProducts = await Product.find(args);
    res.status(200).send({
      success: true,
      filterProducts,
    });
  } catch (error) {
    console.log(`Error inside product filter controller: ${error}`);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error: error.message,
    });
  }
}

// product count controller function
export async function productCountController(req, res) {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(`Error inside product count controller: ${error}`);
    res.status(400).send({
      success: false,
      message: "Error in product count controller",
      error: error.message,
    });
  }
}

// product list controller function
export async function productListController(req, res) {
  try {
    const perPageProducts = 9;
    const page = req.params.page || 1;
    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPageProducts)
      .limit(perPageProducts)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(`Error inside product list per page controller: ${error}`);
    res.status(400).send({
      success: false,
      message: "Error in product list per page controller",
      error: error.message,
    });
  }
}

// search product controller function
export async function searchProductController(req, res) {
  try {
    const { keyword } = req.params;
    const searchProducts = await Product.find({
      $or: [
        { name: { $rejex: keyword, $options: "i" } },
        { description: { $rejex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.status(200).json(searchProducts);
  } catch (error) {
    console.log(`Error inside search product controller: ${error}`);
    res.status(400).send({
      success: false,
      message: "Error in search product controller",
      error: error.message,
    });
  }
}
