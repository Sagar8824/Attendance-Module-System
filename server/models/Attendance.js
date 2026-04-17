const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId:  { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  subjectId:  { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }, // ✅ Naya
  date:       { type: Date, required: true },
  status:     { type: String, enum: ["Present", "Absent"], required: true }
});

// Ek student ek subject pe ek din mein ek hi record
attendanceSchema.index({ studentId: 1, subjectId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);