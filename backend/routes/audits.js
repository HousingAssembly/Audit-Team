import dbConnect from "../lib/dbConnect";
import Audit from "../models/audit";

export default async function handler(req, res) {
  await dbConnect();

  const { method, query, body } = req;

  // Handle GET /api/audits
  if (method === "GET") {
    try {
      const { from, to } = query;
      let filter = {};

      if (from && to) {
        filter.application_date = { $gte: from, $lte: to };
      }

      const audits = await Audit.find(filter);
      return res.status(200).json(audits);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Handle POST /api/audits (create) or /api/audits?search=true (search)
  if (method === "POST") {
    try {
      // Check if it's a search
      if (query.search === "true") {
        const { id_number, surname, first_name, date_of_birth } = body;

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
      }

      // Otherwise create a new audit
      const newAudit = new Audit(body);
      const saved = await newAudit.save();
      return res.status(201).json({ insertedId: saved._id });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Handle DELETE /api/audits?id=XYZ
  if (method === "DELETE") {
    try {
      const { id } = query;
      const deleted = await Audit.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Audit not found" });
      }
      return res.status(200).json({ message: "Audit deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}
