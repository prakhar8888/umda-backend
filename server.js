// ✅ Load environment variables from .env
require("dotenv").config();

// ✅ Import packages
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ✅ Initialize express app
const app = express();

// ✅ Connect to MongoDB
connectDB();

// 🛡️ Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// 📦 Import Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// 🔁 API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// 🧪 Root route (for testing backend is live)
app.get("/", (req, res) => {
  res.send("🚀 UMDA backend is running");
});

// 🚀 Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
