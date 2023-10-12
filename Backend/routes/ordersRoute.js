import express from "express";
import { userOrdersController } from "../controllers/ordersController.js";
import { requireLogin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// get all orders
router.get("/all-orders", requireLogin, userOrdersController);

export default router;
