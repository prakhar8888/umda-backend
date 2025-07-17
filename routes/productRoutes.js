// 📄 backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,    // ✅ Single product for Edit Page
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// 🔥 Product CRUD Routes

// ➕ CREATE new product
// POST /api/products
router.post("/", createProduct);

// 📦 GET all products
// GET /api/products
router.get("/", getAllProducts);

// 🔍 GET single product by ID (Edit/View page uses this!)
// GET /api/products/:id
router.get("/:id", getProductById);

// ✏️ UPDATE product by ID
// PUT /api/products/:id
router.put("/:id", updateProduct);

// ❌ DELETE product by ID
// DELETE /api/products/:id
router.delete("/:id", deleteProduct);

module.exports = router;
