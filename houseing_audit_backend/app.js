const express = require("express"); // front-end and back-end connection
const mongoose = require("mongoose"); //provides all the operation for MongoDB
//can use javascript to manipulate MongoDB
const receiptRoutes = require("./routes/receipts");

const app = express();  //you can get the data from the front end 
app.use(express.json());  

// connect MongoDB
mongoose.connect("mongodb://localhost:27017/housing_audit", {
// connect the local MongoDB and use Housing_audit database
})
.then(() => console.log("Connected to MongoDB"))
    const receipts = await Receipt.find();
    console.log("Current receipts in database:");
    console.log(receipts);  

// setting the connection, all the receipts will be dealed by receiptRoutes
app.use("/api/receipts", receiptRoutes);

// routes testing 
app.get("/", (req, res) => {
  res.send(" Housing Audit Backend is running!");
});

// start routes
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
