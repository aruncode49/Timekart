import express from "express";
import { requireLogin, isAdmin } from "../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/categoryContoller.js";

const router = express.Router();

// post route for create category
router.post(
  "/create-category",
  requireLogin,
  isAdmin,
  createCategoryController
);

export default router;
