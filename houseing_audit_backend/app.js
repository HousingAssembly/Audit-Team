const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const receiptRoutes = require("./routes/receipts");

const app = express();
app.use(cors());
app.use(express.json());

// 连接 MongoDB
mongoose.connect("mongodb://localhost:27017/housing_audit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 路由
app.use("/api/receipts", receiptRoutes);

// 根路由测试
app.get("/", (req, res) => {
  res.send("✅ Housing Audit Backend is running!");
});

// 启动服务器
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
