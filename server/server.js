const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const attendanceRoutes = require("./routes/attendanceRoutes");
const studentRoutes   = require("./routes/studentRoutes");
const authRoutes      = require("./routes/authRoutes");
const studentAuth     = require("./routes/studentAuth");
const subjectRoutes   = require("./routes/subjectRoutes"); // ✅ Naya
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Uploaded photos serve karo
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/admin", adminRoutes);
app.use("/student-auth", studentAuth);
app.use("/auth",         authRoutes);
app.use("/attendance",   attendanceRoutes);
app.use("/student",      studentRoutes);
app.use("/subject",      subjectRoutes);  // ✅ Naya

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/attendanceDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));