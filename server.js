require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ✅ Import your routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// 🎯 Initialize express app
const app = express();

// 🛡️ Middleware
app.use(cors());
app.use(express.json());

// 🔁 API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// 🌐 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // Optional: stop server if DB fails
  });

// 🚀 Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
