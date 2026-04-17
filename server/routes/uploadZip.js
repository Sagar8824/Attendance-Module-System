const express = require("express");
const router = express.Router();
const multer = require("multer");
const unzipper = require("unzipper");
const XLSX = require("xlsx");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const Student = require("../models/Student");

// Uploads folder auto-create
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("temp")) fs.mkdirSync("temp");

// Multer — ZIP file memory mein lo
const upload = multer({ dest: "temp/" });

router.post("/zip", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "ZIP file upload karo" });
    }

    const zipPath = req.file.path;
    let excelData = null;
    const photoMap = {}; // { "21IT001": "path/to/photo" }

    // ── Step 1: ZIP extract karo ──
    const directory = await unzipper.Open.file(zipPath);

    for (const file of directory.files) {
      const fileName = path.basename(file.path);
      const ext = path.extname(fileName).toLowerCase();

      // Excel file
      if (ext === ".xlsx" || ext === ".xls") {
        const buffer = await file.buffer();
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      }

      // Photo files — photos/ folder ke andar
      if (
        file.path.includes("photos/") &&
        [".jpg", ".jpeg", ".png", ".webp"].includes(ext)
      ) {
        const rollNumber = path.basename(fileName, ext).trim().toUpperCase();
        const savePath = `uploads/${rollNumber}${ext}`;
        const buffer = await file.buffer();
        fs.writeFileSync(savePath, buffer);
        photoMap[rollNumber] = `${rollNumber}${ext}`;
      }
    }

    // Temp file delete karo
    fs.unlinkSync(zipPath);

    if (!excelData || excelData.length === 0) {
      return res.status(400).json({ message: "ZIP mein Excel file nahi mili ya empty hai" });
    }

    // ── Step 2: Students save karo ──
    const results = { added: [], skipped: [], failed: [] };

    for (const row of excelData) {
      try {
        const rollNumber = String(row["Roll No"] || row.rollNumber || "").trim().toUpperCase();
        const name = row.Name || row.name || "";
        const department = row.Department || row.department || "IT";
        const semester = row.Semester || row.semester || 6;
        const plainPassword = String(row.Password || row.password || "1234");

        if (!rollNumber || !name) {
          results.failed.push({ rollNumber, reason: "Name ya Roll No missing" });
          continue;
        }

        // Duplicate check
        const existing = await Student.findOne({ rollNumber });
        if (existing) {
          results.skipped.push({ rollNumber, name, reason: "Already exists" });
          continue;
        }

        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Photo match — roll number se
        const photo = photoMap[rollNumber] || null;

        await Student.create({
          name,
          rollNumber,
          department,
          semester,
          password: hashedPassword,
          photo,
        });

        results.added.push({ rollNumber, name, hasPhoto: !!photo });

      } catch (err) {
        results.failed.push({ reason: err.message });
      }
    }

    res.json({
      message: "ZIP process ho gaya",
      total: excelData.length,
      added: results.added.length,
      skipped: results.skipped.length,
      failed: results.failed.length,
      details: results,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ZIP process mein error", error: error.message });
  }
});

module.exports = router;