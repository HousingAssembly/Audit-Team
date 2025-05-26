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

    // does user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create and save new user (default role is pending)
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

    // validate input
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    //  login only if user is approved
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Account not approved yet." });
    }

    // password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // hashing token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...userData } = user.toObject();
    res.json({ token, user: userData });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ error: "Login failed" });
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

module.exports = router;
