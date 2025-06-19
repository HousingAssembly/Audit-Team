import dbConnect from "../lib/dbConnect";
import Project from "../models/project";

export default async function handler(req, res) {
  await dbConnect();

  const { method, query, body } = req;

  // GET /api/projects → Get all projects
  if (method === "GET") {
    try {
      const projects = await Project.find();
      return res.status(200).json(projects);
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }

  // POST /api/projects → Create a new project
  if (method === "POST") {
    try {
      const { name, area, year, municipality, status } = body;
      const newProject = new Project({ name, area, year, municipality, status });
      await newProject.save();
      return res.status(201).json({ message: "Project added successfully" });
    } catch (err) {
      console.error("Failed to add project:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // DELETE /api/projects?id=XYZ → Delete a project by ID
  if (method === "DELETE") {
    try {
      const { id } = query;
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: "Project not found" });
      return res.status(200).json({ message: "Project deleted" });
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete project" });
    }
  }

  // PUT /api/projects?id=XYZ → Update a project by ID
  if (method === "PUT") {
    try {
      const { id } = query;
      const updated = await Project.findByIdAndUpdate(id, body, { new: true });
      if (!updated) return res.status(404).json({ error: "Project not found" });
      return res.status(200).json({ message: "Project updated", project: updated });
    } catch (err) {
      console.error("Failed to update project:", err);
      return res.status(500).json({ error: "Failed to update project" });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}
