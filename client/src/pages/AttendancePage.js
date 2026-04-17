import React, { useEffect, useState } from "react";
import axios from "axios";

function AttendancePage() {

  const [selectedDate, setSelectedDate] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  // ✅ Load students
  useEffect(() => {
    axios.get("http://localhost:5000/student/all")
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // ✅ Set default date = today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  // ✅ STEP 5: Load attendance when date changes
  useEffect(() => {

    if (!selectedDate) return;

    axios
      .get(`http://localhost:5000/attendance/by-date?date=${selectedDate}`)
      .then(res => {

        const existingAttendance = {};

        res.data.forEach(record => {
          existingAttendance[record.studentId._id] = record.status;
        });

        setAttendance(existingAttendance);

      })
      .catch(err => console.log(err));

  }, [selectedDate]);

  // ✅ Handle change
  const handleChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status
    });
  };

  // ✅ Submit attendance
  const submitAttendance = async () => {

    const attendanceData = students.map(student => ({
      studentId: student._id,
      date: selectedDate,
      status: attendance[student._id] || "Absent"
    }));

    try {

      await axios.post(
        "http://localhost:5000/attendance/mark-bulk",
        attendanceData
      );

      alert("Attendance submitted successfully");

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="container mt-4">

  <h2>Mark Attendance</h2>

      {/* ✅ Date Input */}
      <input
        type="date"
        className="form-control mb-3"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <table className="table table-bordered table-striped">

        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>

        <tbody>

          {students.map(student => (

            <tr key={student._id}>
              <td>{student.rollNumber}</td>   {/* ✅ ADD THIS */}
              <td>{student.name}</td>

              <td>
                <input
                  type="radio"
                  name={student._id}
                  onChange={() => handleChange(student._id, "Present")}
                />
              </td>

              <td>
                <input
                  type="radio"
                  name={student._id}
                  onChange={() => handleChange(student._id, "Absent")}
                />
              </td>
            </tr>

          ))}

        </tbody>

      </table>

      <br />

      <button onClick={submitAttendance}>
        Submit Attendance
      </button>

      



    </div>

  );

}

export default AttendancePage;

