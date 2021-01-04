import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewares/authMiddleware.js";

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  listMyOrders,
  listOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";

// CREATE Orders
// Access : Private
// /api/orders/
router.route("/").post(protect, addOrderItems).get(protect, admin, listOrders);

// GET orders by User
// Access : Private
// /api/orders/myorders
router.route("/myorders").get(protect, listMyOrders);

// Get Orders by ID
// Access : Private
// /api/orders/:id
router.route("/:id").get(protect, getOrderById);

// CREATE Orders
// Access : Private
// /api/orders/:id/pay
router.route("/:id/pay").put(protect, updateOrderToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
