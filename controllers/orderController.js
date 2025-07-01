const Order = require("../models/orderModel");

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, customerName, email, phone, address } = req.body;

    // ✅ Basic validation
    if (!items || !totalAmount || !customerName || !email || !phone) {
      return res.status(400).json({ message: "❌ Please fill all required fields." });
    }

    const newOrder = new Order({
      items,
      totalAmount,
      customerName,
      email,
      phone,
      address,
    });

    const saved = await newOrder.save();

    res.status(201).json({
      message: "✅ Order placed successfully!",
      order: saved,
    });
  } catch (error) {
    console.error("❌ Error saving order:", error.message);
    res.status(500).json({ message: "Server error. Could not place order." });
  }
};

module.exports = {
  createOrder,
};
