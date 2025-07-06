// 📄 backend/controllers/productController.js

const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinary");

// =========================
// ✅ GET All Products
// =========================
const getAllProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const products = await Product.find(keyword);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// =========================
// ✅ CREATE Product with Image Upload
// =========================
const createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const file = req.file;

    if (!name || !price || !category || !description || !file) {
      return res.status(400).json({ error: "All fields including image are required." });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "products",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );
      stream.end(file.buffer); // Pass buffer from multer
    });

    // Create new product
    const newProduct = new Product({
      name,
      price,
      category,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "✅ Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("❌ Error in createProduct:", err);
    res.status(500).json({ error: "Product upload failed. Try again." });
  }
};

// =========================
// ✅ UPDATE Product (excluding image)
// =========================
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "✅ Product updated", product: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// =========================
// ✅ DELETE Product (optional: remove image from Cloudinary)
// =========================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Optional: delete image from Cloudinary
    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.deleteOne();

    res.json({ message: "✅ Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
