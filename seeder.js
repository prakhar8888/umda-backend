// 📄 backend/seeder.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");
const connectDB = require("./config/db");

// 🧵 Sample Ethnic Fashion Products
const products = [
  {
    name: "Handblock Kurta",
    price: 1599,
    image:
      "https://anokhi.com/media/catalog/product/cache/2/image/750x/602f0fa2c1f0d1ba5e241f914e856ff9/H/B/HBD3KTH3JY01-03.jpg",
  },
  {
    name: "Cotton Saree",
    price: 2599,
    image:
      "https://anokhi.com/media/catalog/product/cache/2/image/750x/602f0fa2c1f0d1ba5e241f914e856ff9/S/A/SAR7BLRLUR16-03.jpg",
  },
  {
    name: "Ethnic Skirt",
    price: 1899,
    image:
      "https://anokhi.com/media/catalog/product/cache/2/image/750x/602f0fa2c1f0d1ba5e241f914e856ff9/S/K/SK1BMRB8RP27-03.jpg",
  },
  {
    name: "Dupatta",
    price: 899,
    image:
      "https://anokhi.com/media/catalog/product/cache/2/image/750x/602f0fa2c1f0d1ba5e241f914e856ff9/D/U/DUP1DABU2BG20-03.jpg",
  },
];

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// 📦 Seed Function
const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products); // Insert sample products
    console.log("✅ Sample data inserted into MongoDB");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to insert data:", error);
    process.exit(1);
  }
};

importData();
