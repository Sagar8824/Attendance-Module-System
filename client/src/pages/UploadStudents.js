import React, { useState } from "react";
import axios from "axios";

function UploadStudents() {

  const [file, setFile] = useState(null);

  const uploadFile = async () => {

    const formData = new FormData();
    formData.append("file", file);

    try {

      await axios.post(
        "http://localhost:5000/student/upload",
        formData
      );

      alert("Students Uploaded Successfully");

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="container mt-4">

      <h2>Upload Students (Excel)</h2>

      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="btn btn-success"
        onClick={uploadFile}
      >
        Upload
      </button>

    </div>

  );
}

export default UploadStudents;