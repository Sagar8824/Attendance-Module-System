const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");

const SECRET = process.env.JWT_SECRET || "attendance_secret_change_in_production";

const DEPARTMENTS = ["IT", "CS", "EC", "ME", "CE", "EE"];

// ── Teacher Self Register ──
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    // Validation
    if (!name || !email || !password || !department)
      return res.status(400).json({ message: "Saare fields zaroori hain" });

    if (!DEPARTMENTS.includes(department))
      return res.status(400).json({ message: "Invalid department" });

    if (!/\S+@\S+\.\S+/.test(email))
      return res.status(400).json({ message: "Valid email daalo" });

    if (password.length < 4)
      return res.status(400).json({ message: "Password kam se kam 4 characters ka hona chahiye" });

    // Duplicate check
    const existing = await Teacher.findOne({ email });
    if (existing) {
      if (existing.status === "pending")
        return res.status(400).json({ message: "Yeh email pehle se registered hai — admin approval ka wait karo" });
      if (existing.status === "rejected")
        return res.status(400).json({ message: "Yeh email reject ho chuki hai — admin se contact karo" });
      return res.status(400).json({ message: "Yeh email already registered hai" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const teacher = new Teacher({
      name, email,
      password: hashed,
      department,
      status: "pending",  // ✅ Hamesha pending se shuru
    });

    await teacher.save();

    res.json({
      message: "Registration successful! Admin approval ka wait karo.",
      status: "pending",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ── Teacher Login ──
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email aur password zaroori hain" });

    const teacher = await Teacher.findOne({ email });
    if (!teacher)
      return res.status(400).json({ message: "Email registered nahi hai" });

    // ✅ Status check
    if (teacher.status === "pending")
      return res.status(403).json({ 
        message: "Aapka account abhi pending hai — admin approval ka wait karo",
        status: "pending"
      });

    if (teacher.status === "rejected")
      return res.status(403).json({ 
        message: "Aapka account reject ho gaya hai — admin se contact karo",
        status: "rejected"
      });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password galat hai" });

    const token = jwt.sign(
      { id: teacher._id, role: "teacher", department: teacher.department },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: "teacher",
      teacher: {
        name: teacher.name,
        email: teacher.email,
        department: teacher.department,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;