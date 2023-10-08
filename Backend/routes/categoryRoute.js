import express from "express";
import { requireLogin, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryContoller.js";

const router = express.Router();

// post route for create category
router.post("/create", requireLogin, isAdmin, createCategoryController);

// get route for getting all categories
router.get("/allCategories", getAllCategoriesController);

// put route for update category
router.put("/update/:id", requireLogin, isAdmin, updateCategoryController);

// get route for getting a particular category
router.get("/:slug", getSingleCategoryController);

// delete route for deleting a particular category
router.delete("/:id", requireLogin, isAdmin, deleteCategoryController);

export default router;
