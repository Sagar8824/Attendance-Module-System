const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

// ── Subject add karo ──
router.post("/add", async (req, res) => {
  try {
    const { name, code, type, semester, department } = req.body;

    const existing = await Subject.findOne({ code, department, semester });
    if (existing) {
      return res.status(400).json({ message: "Yeh subject already exist karta hai" });
    }

    const subject = new Subject({ name, code, type, semester, department });
    await subject.save();
    res.json({ message: "Subject add ho gaya", subject });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Saare subjects lao (filter by department + semester) ──
router.get("/all", async (req, res) => {
  try {
    const { department, semester, type } = req.query;

    const filter = {};
    if (department) filter.department = department;
    if (semester)   filter.semester   = Number(semester);
    if (type)       filter.type       = type;

    const subjects = await Subject.find(filter).sort({ type: 1, name: 1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Subject delete karo ──
router.delete("/delete/:id", async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject delete ho gaya" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;