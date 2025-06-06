// load environment variables
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

// dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// da models
const User = require("./models/user");
const Audit = require("./models/audit");

// da routes
const auditRoutes = require("./routes/audits");
const userRoutes = require("./routes/users");
const projectRoutes = require("./routes/projects");
const statsRoutes = require("./routes/stats");

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// route mounting
app.use("/api/audits", auditRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/stats", statsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Housing Audit Backend is running!");
});

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  dbName: "housing_audit",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("yippee, connected!");

    const audits = await Audit.find();
    const users = await User.find();
    console.log(`Loaded ${audits.length} audits, ${users.length} users`);
  })
  .catch((err) => {
    console.error("error with mongodb:", err);
  });

// to start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
