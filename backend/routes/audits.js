const express = require("express");
const dbConnect = require("../lib/dbConnect");
const Audit = require("../models/audit");

const router = express.Router();

const MAX_AUDITS = 500000;

// CREATE new audit
router.post("/", async (req, res) => {
  try {
    const currentCount = await Audit.countDocuments();
    if (currentCount >= MAX_AUDITS) {
      return res.status(507).json({ error: "Database storage limit reached" });
    }

    const newAudit = new Audit(req.body);
    const saved = await newAudit.save();
    res.status(201).json({ insertedId: saved._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET audits with optional date filtering
router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;
    let filter = {};

    if (from && to) {
      filter.application_date = { $gte: from, $lte: to };
    }

    const audits = await Audit.find(filter);
    return res.status(200).json(audits);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE audit by ID
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

// POST /api/audits?search=true (search audits)
router.post("/search", async (req, res) => {
  try {
    const { id_number, surname, first_name, date_of_birth } = req.body;

    if (!id_number || !surname || !first_name || !date_of_birth) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const audit = await Audit.findOne({
      "applicant.id_number": id_number,
      "applicant.surname": surname,
      "applicant.first_name": first_name,
      "applicant.date_of_birth": date_of_birth,
    });

    if (!audit) return res.status(404).json({ message: "Audit not found." });

    return res.status(200).json(audit);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;

