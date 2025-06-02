const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// 添加项目
router.post('/', async (req, res) => {
  try {
    const { name, area, year, municipality, status } = req.body;
    const newProject = new Project({ name, area, year, municipality, status });
    await newProject.save();
    res.status(201).json({ message: 'Project added successfully' });
  } catch (err) {
    console.error('Failed to add project:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 获取所有项目
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 删除项目
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project updated", project: updatedProject });
  } catch (err) {
    console.error("Failed to update project:", err);
    res.status(500).json({ error: "Failed to update project" });
  }
});

module.exports = router;
