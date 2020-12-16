import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productControllers.js";

const router = express.Router();

//* Get all products
router.route("/").get(getProducts);

//* Get products by ID
router.route("/:id").get(getProductById);

export default router;
