const express = require("express");
const router = express.Router();
const Audit = require("../models/audit");

router.post("/", async (req, res) => {
  try {
    const newAudit = new Audit(req.body);
    const saved = await newAudit.save();
    res.status(201).json({ insertedId: saved._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;
    let filter = {};

    if (from && to) {
      filter.application_date = { $gte: from, $lte: to };
    }

    const all = await Audit.find(filter);
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Audit.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Audit not found" });
    }
    res.status(200).json({ message: "Audit deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;