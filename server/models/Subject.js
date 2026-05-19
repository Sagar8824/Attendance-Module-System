const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name:       { type: String, required: true },        // "Computer Networks"
  code:       { type: String, required: true },        // "CN301"
  type:       { type: String, enum: ["Theory", "Practical"], required: true },
  course:     { type: String, required: true },        // "BE", "BCA"
  semester:   { type: Number, required: true, min: 1, max: 8 },
  department: { type: String, required: true },        // "IT", "CS", "EC"
}, { timestamps: true });

// Same course + department + semester mein same code duplicate na ho
subjectSchema.index({ code: 1, course: 1, department: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model("Subject", subjectSchema);