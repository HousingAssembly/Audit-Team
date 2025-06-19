import dbConnect from "../lib/dbConnect";
import { getStats } from "../controllers/statsController";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    return getStats(req, res);
  }

  res.status(405).end(); // Method Not Allowed
}
