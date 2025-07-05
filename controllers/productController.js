// 📄 backend/controllers/productController.js

const Product = require("../models/productModel");

// 🧠 GET all products (admin & client view)
const getAllProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const products = await Product.find(keyword).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({
      message: "Failed to fetch products",
      error: err.message,
    });
  }
};

// 🆕 POST new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error adding product:", err.message);
    res.status(500).json({
      message: "Failed to add product",
      error: err.message,
    });
  }
};

// 🖊️ UPDATE product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating product:", err.message);
    res.status(500).json({
      message: "Failed to update product",
      error: err.message,
    });
  }
};

// 🗑️ DELETE product by ID
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "✅ Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({
      message: "Delete failed",
      error: err.message,
    });
  }
};

// 🎯 Export all controllers
module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
