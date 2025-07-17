// 📦 backend/controllers/productController.js

const Product = require("../models/productModel");

// ✅ CREATE a product
const createProduct = async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;

    console.log("📦 Incoming product data:", req.body);

    if (!name || !price || !category || !image || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const product = new Product({
      name,
      price,
      category,
      image,
      description,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("❌ Error in createProduct:", error.message);
    res.status(500).json({ message: "Server error. Failed to create product." });
  }
};

// ✅ GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("❌ Error in getAllProducts:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ GET single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    console.error("❌ Error in getProductById:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ UPDATE a product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    console.error("❌ Error in updateProduct:", error.message);
    res.status(500).json({ message: "Server error. Failed to update." });
  }
};

// ✅ DELETE a product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Product deleted" });
  } catch (error) {
    console.error("❌ Error in deleteProduct:", error.message);
    res.status(500).json({ message: "Server error. Failed to delete." });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById, // ✅ NOW ADDED
  updateProduct,
  deleteProduct,
};
