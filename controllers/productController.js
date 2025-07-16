const Product = require("../models/productModel");

// ✅ CREATE Product with correct image handling
const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    // ✅ Basic validation
    if (!name || !price || !category || !description || !image) {
      return res.status(400).json({
        error: "All fields including image URL are required.",
      });
    }

    // ✅ Create new Product instance
    const newProduct = new Product({
      name,
      price,
      category,
      description,
      image, // ✅ Correct - as string not object
    });

    // ✅ Save to DB
    const savedProduct = await newProduct.save();

    // ✅ Success Response
    res.status(201).json({
      message: "✅ Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("❌ Error in createProduct:", err);
    res.status(500).json({ error: "Product creation failed." });
  }
};

// ✅ GET all Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Error in getAllProducts:", err);
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

// ✅ UPDATE Product by ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({
      message: "✅ Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("❌ Error in updateProduct:", err);
    res.status(500).json({ error: "Product update failed." });
  }
};

// ✅ DELETE Product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({ message: "✅ Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error in deleteProduct:", err);
    res.status(500).json({ error: "Product deletion failed." });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
