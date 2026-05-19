const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/attendanceDB").then(async () => {
  console.log("✅ MongoDB connected to attendanceDB");

  const db = mongoose.connection.db;
  const students = await db.collection("students").find({}).toArray();

  console.log(`📊 Total students found: ${students.length}`);

  let updated = 0;
  for (const student of students) {
    const needsUpdate = !student.course || !student.group;
    if (needsUpdate) {
      await db.collection("students").updateOne(
        { _id: student._id },
        {
          $set: {
            course: student.course || "BE",
            group: student.group || "A1",
          },
        }
      );
      updated++;
      console.log(`  Updated: ${student.name} (${student.rollNumber}) → course: BE, group: A1`);
    }
  }

  console.log(`\n🎉 Done! ${updated} students updated with default course (BE) and group (A1).`);
  mongoose.disconnect();
}).catch(err => console.error("Connection error:", err));
