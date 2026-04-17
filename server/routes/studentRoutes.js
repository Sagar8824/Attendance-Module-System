const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const multer = require("multer");
const XLSX = require("xlsx");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// ✅ uploads/ folder auto-create
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Multer storage — original filename rakho
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // unique name: timestamp + original
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

// Sirf image files allow karo
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Sirf image upload kar sakte hain"), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

// ── Add Student (with optional photo) ──
router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const { name, rollNumber, department, semester, password } = req.body;

    // Duplicate roll number check
    const existing = await Student.findOne({ rollNumber });
    if (existing) {
      return res.status(400).json({ message: "Roll number already exists" });
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      rollNumber,
      department,
      semester,
      password: hashedPassword,
      photo: req.file ? req.file.filename : null, // ✅ photo filename save karo
    });

    await student.save();
    res.json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Get All Students ──
router.get("/all", async (req, res) => {
  try {
    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.semester) filter.semester = Number(req.query.semester);
    const students = await Student.find(filter).select("-password");
    res.json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Upload Students via Excel ──
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const formattedData = await Promise.all(
      data.map(async (item) => {
        const plainPassword = String(item.Password || item.password || "1234");
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        return {
          name: item.Name || item.name,
          rollNumber: item["Roll No"] || item.rollNumber,
          department: item.Department || "IT",
          semester: item.Semester || 6,
          password: hashedPassword,
          photo: null,
        };
      })
    );

    await Student.insertMany(formattedData);
    res.json({ message: "Students imported successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// ── Delete single student + attendance ──
router.delete("/delete/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    // Photo file bhi delete karo disk se
    if (student?.photo) {
      const photoPath = `uploads/${student.photo}`;
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
    }

    await Student.findByIdAndDelete(req.params.id);
    await Attendance.deleteMany({ studentId: req.params.id });
    res.json({ message: "Student + Attendance deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Delete all students + attendance ──
router.delete("/delete-all", async (req, res) => {
  try {
    // Sabke photos delete karo
    const students = await Student.find({ photo: { $ne: null } });
    students.forEach((s) => {
      const photoPath = `uploads/${s.photo}`;
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
    });

    await Student.deleteMany({});
    await Attendance.deleteMany({});
    res.json({ message: "All students + attendance deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ── Yeh route studentRoutes.js mein module.exports se PEHLE add karo ──

// Student apni photo khud upload kare
router.post("/upload-photo", upload.single("photo"), async (req, res) => {
  try {
    const { rollNumber } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Photo file nahi mili" });
    }

    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student nahi mila" });
    }

    // Purani photo delete karo agar thi
    if (student.photo) {
      const oldPath = `uploads/${student.photo}`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Naya photo save karo
    student.photo = req.file.filename;
    await student.save();

    res.json({
      message: "Photo upload ho gayi",
      photo: req.file.filename,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// ✅ module.exports END mein
module.exports = router;