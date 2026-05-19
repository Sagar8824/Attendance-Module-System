const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

// ── Mark bulk attendance (subject-wise) ──
router.post("/mark-bulk", async (req, res) => {
  try {
    for (let record of req.body) {
      const date = new Date(record.date);
      date.setHours(0, 0, 0, 0);

      const existing = await Attendance.findOne({
        studentId: record.studentId,
        subjectId: record.subjectId,   // ✅ subject check
        date,
      });

      if (existing) {
        existing.status = record.status;
        await existing.save();
      } else {
        await Attendance.create({ ...record, date });
      }
    }
    res.json({ message: "Attendance saved" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Saari attendance lao ──
router.get("/all", async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("studentId")
      .populate("subjectId")
      .sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Date + subject ke hisaab se attendance lao ──
router.get("/by-date", async (req, res) => {
  try {
    const { date, subjectId } = req.query;

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const nextDay = new Date(d);
    nextDay.setDate(nextDay.getDate() + 1);

    const filter = { date: { $gte: d, $lt: nextDay } };
    if (subjectId) filter.subjectId = subjectId;

    const records = await Attendance.find(filter)
      .populate("studentId")
      .populate("subjectId");

    res.json(records);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Student ki subject-wise attendance ──
router.get("/student/:rollNumber", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const { subjectId } = req.query;
    const filter = { studentId: student._id };
    if (subjectId) filter.subjectId = subjectId;

    const attendance = await Attendance.find(filter)
      .populate("subjectId")
      .sort({ date: -1 });

    res.json({ student, attendance });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Subject-wise percentage ──
router.get("/percentage", async (req, res) => {
  try {
    const { subjectId } = req.query;
    const filter = subjectId ? { subjectId } : {};

    const attendance = await Attendance.find(filter)
      .populate("studentId")
      .populate("subjectId");

    const stats = {};
    attendance.forEach((record) => {
      if (!record.studentId) return;
      const key = record.studentId._id;
      if (!stats[key]) {
        stats[key] = {
          name: record.studentId.name,
          rollNumber: record.studentId.rollNumber,
          total: 0,
          present: 0,
        };
      }
      stats[key].total++;
      if (record.status === "Present") stats[key].present++;
    });

    const result = Object.values(stats).map((s) => ({
      ...s,
      percentage: s.total ? ((s.present / s.total) * 100).toFixed(2) : "0.00",
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Dashboard stats ──
router.get("/dashboard", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAttendance = await Attendance.countDocuments({
      date: { $gte: today },
    });

    const attendance = await Attendance.find().populate("studentId");
    const stats = {};
    attendance.forEach((record) => {
      if (!record.studentId) return;
      const id = record.studentId._id;
      if (!stats[id]) stats[id] = { total: 0, present: 0 };
      stats[id].total++;
      if (record.status === "Present") stats[id].present++;
    });

    let defaulters = 0;
    Object.values(stats).forEach((s) => {
      if (s.total && (s.present / s.total) * 100 < 75) defaulters++;
    });

    res.json({ totalStudents, todayAttendance, defaulters });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Attendance status update karo
router.put("/update/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Present", "Absent"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const record = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("studentId").populate("subjectId");

    if (!record) {
      return res.status(404).json({ message: "Record nahi mila" });
    }

    res.json({ message: "Attendance update ho gayi", record });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;