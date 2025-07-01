// 📄 backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// 🔍 GET /api/products - fetch all or filter by keyword
router.get("/", async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    console.error("❌ Failed to fetch products:", error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// 🆕 POST /api/products - add new product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Failed to add product:", error.message);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// 🖊️ PUT /api/products/:id - update product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    console.error("❌ Failed to update product:", error.message);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// ❌ DELETE /api/products/:id - delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Failed to delete product:", error.message);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
