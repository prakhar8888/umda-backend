const express = require("express");
const router = express.Router();

// 🧪 Dummy products
const products = [
  {
    _id: "1",
    name: "Red Kurti",
    image: "https://i.ibb.co/tCM1mJn/kurti-red.jpg",
    price: 1299,
    category: "ethnic",
    description: "Beautiful red kurti with fine embroidery"
  },
  {
    _id: "2",
    name: "Blue Saree",
    image: "https://i.ibb.co/W3yx5kT/saree-blue.jpg",
    price: 2199,
    category: "ethnic",
    description: "Elegant blue silk saree perfect for weddings"
  },
  {
    _id: "3",
    name: "Golden Lehenga",
    image: "https://i.ibb.co/8cM3Q3D/lehenga-golden.jpg",
    price: 5999,
    category: "ethnic",
    description: "Heavy golden lehenga with zari work"
  }
];

// 🧠 GET all dummy products
router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
