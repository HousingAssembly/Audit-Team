const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // ✅ required for hashing
require("dotenv").config(); // loads MONGO_URI
const User = require("./models/user");

const createAdmin = async () => {
  const email = "12345";
  const rawPassword = "12345"; // plain for testing, but will be hashed below

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "housing_audit",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("❌ Admin already exists:", email);
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10); // ✅ hash the test password

    const admin = new User({
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully with email:", email);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
    process.exit(1);
  }
};

createAdmin();
