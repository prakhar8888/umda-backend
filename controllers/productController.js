const Product = require("../models/productModel");

// 🧠 GET all products (admin view)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ message: "Failed to fetch products" });
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
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  getAllProducts,
  deleteProduct,
  // include other exports here like createProduct, updateProduct, getProductById etc.
};
