const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const requireAdmin = require("../middleware/requireAdmin");
const verifyToken = require("../middleware/verifyToken");
const dbConnect = require("../lib/dbConnect");

const router = express.Router();

// Ensure DB is connected before any route runs
router.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// POST /api/users/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role: "pending" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Account not approved yet." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...userData } = user.toObject();
    res.json({ token, user: userData });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// PUT /api/users/approve/:id
router.put("/approve/:id", requireAdmin, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ error: "User not found" });

    res.json({ message: "User approved", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to approve user" });
  }
});

// DELETE /api/users/deny/:id
router.delete("/deny/:id", requireAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ error: "User not found" });

    res.json({ message: "User rejected and deleted", user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// GET /api/users/pending
router.get("/pending", requireAdmin, async (req, res) => {
  try {
    const pendingUsers = await User.find({ role: "pending" });
    res.json(pendingUsers);
  } catch (err) {
    console.error("Failed to fetch pending users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/users/update-password
router.put("/update-password", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 5) {
      return res.status(400).json({ error: "Password must be at least 5 characters" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Update password failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
