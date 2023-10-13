import express from "express";
import {
  registerController,
  loginController,
  testController,
  userAuthController,
  resetPasswordController,
  adminAuthController,
  updateUserProfileController,
  getAllUsersController,
} from "../controllers/authController.js";

import { requireLogin, isAdmin } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || METHOD POST
router.post("/login", loginController);

// PRIVATE ROUTE FOR DASHBOARD || METHOD GET
router.get("/user-auth", requireLogin, userAuthController);

// PRIVATE ROUTE FOR DASHBOARD || METHOD GET
router.get("/admin-auth", requireLogin, isAdmin, adminAuthController);

// GET ALL USER LIST || METHOD GET
router.get("/all-users", requireLogin, isAdmin, getAllUsersController);

// RESET PASSWORD ROUTE || METHOD POST
router.post("/reset-password", resetPasswordController);

// PROTECTED ROUTE (FOR TESTING) || METHOD GET
router.get("/test", requireLogin, isAdmin, testController);

// update user profile
router.put("/update-profile", requireLogin, updateUserProfileController);
export default router;
