// ✅ server.js

require("dotenv").config();

// 🔗 Connect to MongoDB
const connectDB = require("./config/db");
connectDB(); // 🚀 Initiate DB connection

// 🛠️ Import the Express App
const app = require("./app");

// 🌍 Define Port and Host for Render Deployment
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0"; // ✅ Important for Render deployment

// 🚀 Start Express Server
app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on port ${PORT} 🚀`);
});
