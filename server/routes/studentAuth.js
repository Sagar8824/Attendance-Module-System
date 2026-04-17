const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");

router.post("/login", async (req, res) => {

  const { rollNumber, password } = req.body;

  try {

    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ bcrypt se compare karo — plain text nahi
    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ Password response mein mat bhejo
    const { password: _, ...safeStudent } = student.toObject();

    res.json({
      message: "Login successful",
      student: safeStudent
    });

  } catch (error) {
    res.status(500).json(error);
  }

});

module.exports = router;