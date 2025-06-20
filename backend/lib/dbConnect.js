const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  if (!MONGO_URI) throw new Error("MONGO_URI is not defined");

  await mongoose.connect(MONGO_URI, {
    dbName: "housing_audit",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
  console.log("✅ dbConnect: Connected to MongoDB");
};

module.exports = dbConnect;
 