const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");

const SECRET = process.env.JWT_SECRET || "attendance_secret_change_in_production";

// ── Admin Login ──
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email aur password zaroori hain" });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(400).json({ message: "Admin nahi mila" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password galat hai" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, SECRET, { expiresIn: "1d" });
    res.json({ token, role: "admin", admin: { name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ── Admin Setup (sirf ek baar) ──
router.post("/setup", async (req, res) => {
  try {
    const existing = await Admin.countDocuments();
    if (existing > 0)
      return res.status(400).json({ message: "Admin already exist karta hai" });

    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await new Admin({ name, email, password: hashed }).save();
    res.json({ message: "Admin create ho gaya" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ── Middleware — Admin token verify ──
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token nahi mila" });
  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Admin access required" });
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ── Pending teachers lao ──
router.get("/teachers/pending", verifyAdmin, async (req, res) => {
  try {
    const teachers = await Teacher.find({ status: "pending" })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ── Saare teachers lao (by status) ──
router.get("/teachers", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const teachers = await Teacher.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ── Teacher approve karo ──
router.put("/teachers/approve/:id", verifyAdmin, async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    ).select("-password");

    if (!teacher) return res.status(404).json({ message: "Teacher nahi mila" });
    res.json({ message: `${teacher.name} approved ho gaya!`, teacher });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ── Teacher reject karo ──
router.put("/teachers/reject/:id", verifyAdmin, async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    ).select("-password");

    if (!teacher) return res.status(404).json({ message: "Teacher nahi mila" });
    res.json({ message: `${teacher.name} reject ho gaya`, teacher });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ── Teacher delete karo ──
router.delete("/teachers/delete/:id", verifyAdmin, async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher delete ho gaya" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ── Password reset ──
router.put("/teachers/reset-password/:id", verifyAdmin, async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.newPassword, 10);
    await Teacher.findByIdAndUpdate(req.params.id, { password: hashed });
    res.json({ message: "Password reset ho gaya" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;