import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

//* Get all products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    // res.status(401);
    // throw new Error("Product not found");
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

//* Get products by ID

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
