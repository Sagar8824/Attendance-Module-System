const mongoose = require("mongoose");
const Student = require("./models/Student");

mongoose.connect("mongodb://localhost:27017/attendanceDB")
  .then(async () => {
    console.log("Connected to MongoDB");
    const result = await Student.updateMany(
      { department: "Computer science" },
      { $set: { department: "CS" } }
    );
    console.log("Update result:", result);
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
