const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); 
const router = express.Router();
const requireAdmin = require("../middleware/requireAdmin");

// POST /api/users/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role: "pending" }); 
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Account not approved yet." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    //hashing token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...userData } = user.toObject();
    res.json({ token, user: userData });
  } catch (err) {
    console.error("Login poop:", err);
    res.status(500).json({ error: "Login poooop" });
  }
});


router.put("/approve/:id", requireAdmin, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true }
    );
    res.json({ message: "User approved", user: updatedUser });
  } 
  catch (err) {
    res.status(500).json({ error: "Failed to approve user" });
  }
});
router.delete("/deny/:id", requireAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User rejected and deleted", user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

router.get("/pending", requireAdmin, async (req, res) => {
  try {
    const all = await User.find();
    console.log("All users in DB:");
    all.forEach(u => console.log(`- ${u.email} | role: ${u.role}`));

    const pendingUsers = await User.find({ role: "pending" });
    console.log("Pending users:", pendingUsers.length);

    res.json(pendingUsers);
  } catch (err) {
    console.error("Failed to fetch pending users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;



