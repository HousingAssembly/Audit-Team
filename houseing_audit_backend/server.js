const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/user");
const Audit = require("./models/audit")

const auditRoutes = require("./routes/audits");
const userRoutes = require("./routes/users"); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://housingassemblyza:9qYjkla4iBps7K7A@auditing-team.icqjwbd.mongodb.net/?retryWrites=true&w=majority&appName=Auditing-Team",
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
