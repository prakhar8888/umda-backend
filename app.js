const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// ✅ Middleware Config
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // ✅ ALLOW BOTH PORTS
    credentials: true,
  })
);

app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse form-urlencoded

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ Routes Import
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// ✅ Route Mounts
app.use("/api/products", productRoutes);   // 📦 Products
app.use("/api/orders", orderRoutes);       // 🛒 Orders
app.use("/api/payment", paymentRoutes);    // 💳 Payments

// ✅ Root Test Route
app.get("/", (req, res) => {
  res.send("🚀 UMDA backend is running.");
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "🔍 Route not found" });
});

module.exports = app;
