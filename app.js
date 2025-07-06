// ✅ app.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const app = express();

// ✅ Middleware Config

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true, // for cookies or auth headers
}));

// ✅ Body Parsing Middlewares
app.use(express.json()); // handles application/json
app.use(express.urlencoded({ extended: true })); // handles form-data/text

// ✅ Morgan Logger (only in dev)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ Root Test Route
app.get("/", (req, res) => {
  res.send("🚀 UMDA backend is running.");
});

// ✅ 404 Handler (Optional but clean)
app.use((req, res) => {
  res.status(404).json({ error: "🔍 Route not found" });
});

module.exports = app;
