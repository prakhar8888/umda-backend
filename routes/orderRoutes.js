// 📄 backend/routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");

// ✅ Correct import using your filename
const Order = require("../models/orderModel");

// 🧾 POST /api/orders - Place a new order
router.post("/", createOrder);

// 🧾 GET /api/orders - Fetch all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err.message);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
});

module.exports = router;
