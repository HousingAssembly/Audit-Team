// routes/receipts.js

const express = require("express");
const router = express.Router();
const Receipt = require("../models/Receipt");

// POST /api/receipts → 插入一条收据信息
router.post("/", async (req, res) => {
  try {
    const newReceipt = new Receipt(req.body);
    const saved = await newReceipt.save();
    res.status(201).json({ insertedId: saved._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/receipts → 获取所有收据信息（测试用）
router.get("/", async (req, res) => {
  try {
    const all = await Receipt.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
