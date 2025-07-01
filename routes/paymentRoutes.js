const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
require("dotenv").config(); // safety if env isn’t loaded globally

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  // 💡 Create Razorpay instance here to ensure env is available
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // ₹499 becomes 49900 paise
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order); // send back order ID and details
  } catch (error) {
    console.error("❌ Razorpay Order Creation Failed:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

module.exports = router;

