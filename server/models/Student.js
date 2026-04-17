const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  semester:   { type: Number, required: true },
  password:   { type: String, required: true },
  photo:      { type: String, default: null }, // ✅ photo filename
});

module.exports = mongoose.model("Student", studentSchema);