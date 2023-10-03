import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductImageController,
  getSingleProductController,
  productFilterController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireLogin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// create product || Method : Post
router.post(
  "/create",
  requireLogin,
  isAdmin,
  formidable(),
  createProductController
);

// update product || Method : Post
router.put(
  "/update/:pid",
  requireLogin,
  isAdmin,
  formidable(),
  updateProductController
);

// get all products || Method : Get
router.get("/allProducts", getAllProductsController);

// get single product || Method: Get
router.get("/:slug", getSingleProductController);

// get product image || Method: Get
router.get("/image/:pid", getProductImageController);

// delete product || Method : delete
router.delete("/:pid", requireLogin, isAdmin, deleteProductController);

// product filter || Method: post
router.post("/filter", productFilterController);

export default router;
