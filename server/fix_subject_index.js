const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/attendanceDB").then(async () => {
  console.log("MongoDB connected");

  const db = mongoose.connection.db;
  const col = db.collection("subjects");

  try {
    // Purane saare indexes dekho
    const indexes = await col.indexes();
    console.log("Current indexes:", JSON.stringify(indexes, null, 2));

    // Purana index drop karo (code + department + semester)
    try {
      await col.dropIndex("code_1_department_1_semester_1");
      console.log("✅ Old index dropped: code_1_department_1_semester_1");
    } catch (e) {
      console.log("⚠️ Old index not found or already dropped:", e.message);
    }

    // Purana index drop karo (code + course + department + semester) - in case duplicate
    try {
      await col.dropIndex("code_1_course_1_department_1_semester_1");
      console.log("✅ New index also dropped for fresh recreation.");
    } catch (e) {
      console.log("ℹ️ New index not found:", e.message);
    }

    console.log("🎉 Done! Restart your server - Mongoose will recreate the correct index automatically.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.disconnect();
  }
}).catch(err => {
  console.error("Connection failed:", err);
});
