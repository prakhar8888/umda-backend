// 📄 backend/routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// 🧾 POST /api/orders - Create a new order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Failed to create order:", err.message);
    res.status(500).json({ message: "Server error while creating order" });
  }
});

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
