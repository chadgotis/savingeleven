import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  productReviews,
} from "../controllers/productControllers.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//* Get all products
router.route("/").get(getProducts).post(protect, admin, createProduct);

//* Get products by ID
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route("/:id/review").post(protect, productReviews);

export default router;
