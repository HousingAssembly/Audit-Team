const express = require("express");
const dbConnect = require("../lib/dbConnect");
const Project = require("../models/project");

const router = express.Router();

// Connect to MongoDB
router.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE new project
router.post("/", async (req, res) => {
  try {
    const { name, area, year, municipality, status } = req.body;
    const newProject = new Project({ name, area, year, municipality, status });
    await newProject.save();
    res.status(201).json({ message: "Project added successfully" });
  } catch (err) {
    console.error("Failed to add project:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a project by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// UPDATE a project by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ message: "Project updated", project: updated });
  } catch (err) {
    console.error("Failed to update project:", err);
    res.status(500).json({ error: "Failed to update project" });
  }
});

module.exports = router;
