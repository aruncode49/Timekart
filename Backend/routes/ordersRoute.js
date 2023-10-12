import express from "express";
import {
  allOrdersController,
  changeOrderStatusController,
  userOrdersController,
} from "../controllers/ordersController.js";
import { isAdmin, requireLogin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// get user orders
router.get("/user-orders", requireLogin, userOrdersController);

// get all orders for admin
router.get("/all-orders", requireLogin, isAdmin, allOrdersController);

// update order status
router.put(
  "/change-status/:orderId",
  requireLogin,
  isAdmin,
  changeOrderStatusController
);

export default router;
