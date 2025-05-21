const express = require("express"); // front-end and back-end connection
const mongoose = require("mongoose"); //provides all the operation for MongoDB
//can use javascript to manipulate MongoDB
const receiptRoutes = require("./routes/receipts");

const app = express();  //you can get the data from the front end 
app.use(express.json());  

// connect MongoDB
mongoose.connect("mongodb://localhost:27017/housing_audit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// routes
app.use("/api/receipts", receiptRoutes);

// routes testing 
app.get("/", (req, res) => {
  res.send("✅ Housing Audit Backend is running!");
});

// start routes
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
