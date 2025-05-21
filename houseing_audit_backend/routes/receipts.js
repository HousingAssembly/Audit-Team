// routes/receipts.js

const express = require("express");
const router = express.Router();
const Receipt = require("../models/Receipt");

// POST /api/receipts 
router.post("/", async (req, res) => {
  try {
    const newReceipt = new Receipt(req.body);
    const saved = await newReceipt.save();
    res.status(201).json({ insertedId: saved._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/receipts 
router.get("/", async (req, res) => {
  try {
    const all = await Receipt.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
