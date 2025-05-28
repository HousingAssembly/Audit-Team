// secrets
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

// dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// models
const User = require("./models/user");
const Audit = require("./models/audit")

// routes
const auditRoutes = require("./routes/audits");
const userRoutes = require("./routes/users"); 

// connection using express and mongoose and cors and a bunch of stuff 
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  MONGO_URI,
  {
    dbName: "housing_audit", 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(async () => {
    console.log("Connected to MongoDB");

    const audits = await Audit.find();
    console.log("Current audits in database:");
    console.log(audits);

    const users = await User.find();
    console.log("Current users in database:");
    console.log(users);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// routes 2 database
app.use("/api/audits", auditRoutes);
app.use("/api/users", userRoutes);  

app.get("/", (req, res) => {
  res.send("Housing Audit Backend is running!");
});

// start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
