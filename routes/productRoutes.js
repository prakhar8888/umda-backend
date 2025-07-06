// 📄 backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔍 GET /api/products?keyword=kurta
router.get("/", getAllProducts);

// 🆕 POST /api/products - Add new product with image (form-data)
router.post("/", upload.single("image"), createProduct);

// ✏️ PUT /api/products/:id - Update product
router.put("/:id", updateProduct);

// ❌ DELETE /api/products/:id - Delete product
router.delete("/:id", deleteProduct);

module.exports = router;
