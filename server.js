require('dotenv').config();
const express = require("express");
const cors = require("cors");

// ✅ Import your routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // Razorpay Payment Route

// 🎯 Initialize express app
const app = express();

// 🛡️ Middleware
app.use(cors());
app.use(express.json());

// 🔁 API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// ⚠️ TEMPORARILY SKIP MONGODB
console.log("⚠️ MongoDB temporarily disabled for demo");

// 🚀 Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
