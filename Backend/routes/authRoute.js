import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";

import { requireLogin, isAdmin } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || METHOD POST
router.post("/login", loginController);

// PROTECTED ROUTE (FOR TESTING) || METHOD GET
router.get("/test", requireLogin, isAdmin, testController);

export default router;
