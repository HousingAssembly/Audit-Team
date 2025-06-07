const express = require("express");
const router = express.Router();
const Audit = require("../models/audit");

// CREATE new audit
router.post("/", async (req, res) => {
  try {
    const newAudit = new Audit(req.body);
    const saved = await newAudit.save();
    res.status(201).json({ insertedId: saved._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all audits (optionally filter by application_date)
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

// SEARCH audit by ID number, surname, first name, and date of birth
router.post("/search", async (req, res) => {
  const { id_number, surname, first_name, date_of_birth } = req.body;

  if (!id_number || !surname || !first_name || !date_of_birth) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const audit = await Audit.findOne({
      "applicant.id_number": id_number,
      "applicant.surname": surname,
      "applicant.first_name": first_name,
      "applicant.date_of_birth": date_of_birth, // Must match format in DB
    });

    if (!audit) {
      return res.status(404).json({ message: "Audit not found." });
    }

    res.status(200).json(audit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
