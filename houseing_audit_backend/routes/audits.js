// routes/receipts.js

const express = require("express");
const router = express.Router();
const Audit = require("../models/audit");

// POST /api/audits 
router.post("/", async (req, res) => {
  try {
    const newAudit = new Audit(req.body);
    const saved = await newAudit.save();
    res.status(201).json({ insertedId: saved._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/audits 
router.get("/", async (req, res) => {
  try {
    const all = await Audit.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
