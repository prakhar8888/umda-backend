// 📄 backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// 🔍 GET /api/products?keyword=kurta
router.get("/", getAllProducts);

// 🆕 POST /api/products - Add new product
router.post("/", createProduct);

// ✏️ PUT /api/products/:id - Update product
router.put("/:id", updateProduct);

// ❌ DELETE /api/products/:id - Delete product
router.delete("/:id", deleteProduct);

module.exports = router;
