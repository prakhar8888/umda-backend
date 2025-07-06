// ✅ server.js

// 🔐 Load environment variables first
require("dotenv").config();

// 🔗 Connect to MongoDB
const connectDB = require("./config/db");
connectDB(); // 🚀 Initiate DB connection

// 🛠️ Import the Express App
const app = require("./app");

// 🌍 Define Port
const PORT = process.env.PORT || 5000;

// 🚀 Start Express Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT} 🚀`);
});
