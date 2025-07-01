require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// ✅ Import your routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // 🆕 NEW

// 🌱 Load environment variables
dotenv.config();

// 🎯 Initialize express app
const app = express();

// 🛡️ Middleware
app.use(cors());
app.use(express.json());

// 🔁 API Routes
app.use("/api/products", productRoutes);  // ✅ Product Routes
app.use("/api/orders", orderRoutes);      // ✅ Order Routes
app.use("/api/payment", paymentRoutes);   // 🆕 Razorpay Payment Route

// 🌐 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/umda-ethnic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log("✅ MongoDB Connected:", process.env.MONGO_URI || "localhost")
  )
  .catch((err) =>
    console.error("❌ MongoDB Connection Failed:", err.message)
  );

// 🚀 Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
