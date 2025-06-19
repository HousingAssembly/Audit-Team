const express = require("express");
const dbConnect = require("../lib/dbConnect");
const { getStats } = require("../controllers/statsController");

const router = express.Router();

// Connect to MongoDB before each request
router.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// GET /api/stats
router.get("/", getStats);

module.exports = router;
