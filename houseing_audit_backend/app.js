const express = require("express");
const mongoose = require("mongoose");
const receiptRoutes = require("./routes/receipts");
const Receipt = require("./models/Receipt");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://suchenfeng:Cfengsu%401221@auditing-team.icqjwbd.mongodb.net/housing_audit?retryWrites=true&w=majority", {})
  .then(async () => {
    console.log("Connected to MongoDB");

    const receipts = await Receipt.find();
    console.log("Current receipts in database:");
    console.log(receipts);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/receipts", receiptRoutes);

app.get("/", (req, res) => {
  res.send("Housing Audit Backend is running!");
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
