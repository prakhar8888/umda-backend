// 📄 backend/seeder.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");
const connectDB = require("./config/db");

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// 🧵 Sample Ethnic Fashion Products with Correct Schema
const products = [
  {
    name: "Handblock Kurta",
    price: 1599,
    category: "Kurta",
    description: "Beautiful handblock printed cotton kurta perfect for casual wear.",
    image: {
      public_id: "seed-handblock-kurta",
      url: "https://anokhi.com/media/catalog/product/cache/2/image/750x/602f0fa2c1f0d1ba5e241f914e856ff9/H/B/HBD3KTH3JY01-03.jpg",
    },
  },
  {
    name: "Cotton Saree",
    price: 2599,
    category: "Saree",
    description: "Elegant handloom cotton saree with traditional motifs.",
    image: {
      public_id: "seed-cotton-saree",
      url: "https://anokhi.com/media/catalog/product/cache/2/image/750x/602f0fa2c1f0d1ba5e241f914e856ff9/S/A/SAR7BLRLUR16-03.jpg",
    },
  },
  {
    name: "Ethnic Skirt",
    price: 1899,
    category: "Skirt",
    description: "Ethnic flared skirt with vibrant colors and patterns.",
    image: {
      public_id: "seed-ethnic-skirt",
      url: "https://anokhi.com/media/catalog/product/cache/2/image/750x/602f0fa2c1f0d1ba5e241f914e856ff9/S/K/SK1BMRB8RP27-03.jpg",
    },
  },
  {
    name: "Printed Dupatta",
    price: 899,
    category: "Dupatta",
    description: "Soft cotton printed dupatta to pair with your ethnic wear.",
    image: {
      public_id: "seed-printed-dupatta",
      url: "https://anokhi.com/media/catalog/product/cache/2/image/750x/602f0fa2c1f0d1ba5e241f914e856ff9/D/U/DUP1DABU2BG20-03.jpg",
    },
  },
];

// 📦 Seed Function
const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products); // Insert sample products
    console.log("✅ Sample products inserted successfully into MongoDB");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to insert sample data:", error);
    process.exit(1);
  }
};

importData();
