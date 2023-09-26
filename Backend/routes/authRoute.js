import express from "express";
import {
  registerController,
  loginController,
  testController,
  userAuthController,
  resetPasswordController,
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

// RESET PASSWORD ROUTE || METHOD POST
router.post("/reset-password", resetPasswordController);

// PROTECTED ROUTE (FOR TESTING) || METHOD GET
router.get("/test", requireLogin, isAdmin, testController);
export default router;
