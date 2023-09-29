import express from "express";
import formidable from "express-formidable";
import { createProductController } from "../controllers/productController.js";
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

export default router;
