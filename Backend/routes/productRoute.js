import express from "express";
import formidable from "express-formidable";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductImageController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  relatedProductController,
  searchProductController,
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

// product counts || method : get
router.get("/total", productCountController);

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

// payment routes
// get token
router.get("/braintree-token", braintreeTokenController);

// for payments
router.post("/braintree-payment", requireLogin, braintreePaymentController);

// get single product || Method: Get
router.get("/:slug", getSingleProductController);

// get product image || Method: Get
router.get("/image/:pid", getProductImageController);

// delete product || Method : delete
router.delete("/:pid", requireLogin, isAdmin, deleteProductController);

// product filter || Method: post
router.post("/filter", productFilterController);

// product list per page || method : get
router.get("/product-list/:page", productListController);

// search product using a keyword
router.get("/search/:keyword", searchProductController);

// similar product
router.get("/related-products/:pid/:cid", relatedProductController);

export default router;
