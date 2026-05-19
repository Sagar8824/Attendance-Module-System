import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const COURSES = ["BE", "ME", "BCA", "MCA"];
const DEPARTMENTS = ["IT", "CS", "EC", "ME", "CE", "EE"];
const GROUPS = ["A1", "A2", "A3", "B1", "B2"];

function AddStudent() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: "", rollNumber: "", course: "BE", department: "", semester: "", group: "A1", password: "" });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setErrors({ ...errors, photo: "Only image files are accepted (JPG, PNG)" }); return; }
    if (file.size > 2 * 1024 * 1024) { setErrors({ ...errors, photo: "Photo must be less than 2MB" }); return; }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    setErrors({ ...errors, photo: "" });
  };

  const validate = () => {
    const e = {};
    if (!student.name.trim()) e.name = "Full name is required";
    if (!student.rollNumber.trim()) e.rollNumber = "Roll number is required";
    if (!student.course) e.course = "Course is required";
    if (!student.department) e.department = "Department is required";
    if (!student.semester) e.semester = "Semester is required";
    if (!student.group) e.group = "Group is required";
    if (!student.password.trim()) e.password = "Password is required";
    else if (student.password.length < 4) e.password = "Password must be at least 4 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(student).forEach((key) => formData.append(key, student[key]));
      if (photo) formData.append("photo", photo);
      await axios.post("http://localhost:5000/student/add", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess(true);
      setStudent({ name: "", rollNumber: "", course: "BE", department: "", semester: "", group: "A1", password: "" });
      setPhoto(null);
      setPreview(null);
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      if (error.response?.status === 400) setErrors({ rollNumber: "This roll number is already registered" });
      else alert("Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Add Student</h2>
          <p style={s.subtitle}>Register a new student to the system</p>
        </div>
        <button style={s.uploadLink} onClick={() => navigate("/upload")}>Bulk Import via Excel →</button>
      </div>

      <div style={s.body}>
        {success && (
          <div style={s.successBanner}>✓ Student registered successfully.</div>
        )}

        <div style={s.formCard}>
          <form onSubmit={handleSubmit} style={s.form}>
            {/* Photo */}
            <div style={s.photoSection}>
              <div style={s.photoPreviewWrap}>
                {preview ? (
                  <img src={preview} alt="preview" style={s.photoPreview} />
                ) : (
                  <div style={s.photoPlaceholder}>
                    <span style={s.photoPlaceholderIcon}>👤</span>
                    <span style={s.photoPlaceholderText}>No photo selected</span>
                  </div>
                )}
              </div>
              <div>
                <label style={s.photoBtn} htmlFor="photo-input">
                  {preview ? "Change Photo" : "Upload Photo"}
                </label>
                <input id="photo-input" type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
                <p style={s.photoHint}>Optional · JPG or PNG · Max 2MB</p>
                {errors.photo && <span style={s.errText}>{errors.photo}</span>}
              </div>
            </div>

            <div style={s.divider} />

            <div style={s.row2}>
              <div style={{ ...s.field, flex: 1 }}>
                <label style={s.label}>Full Name *</label>
                <input style={{ ...s.input, ...(errors.name ? s.inputErr : {}) }} name="name" value={student.name} placeholder="Student's full name" onChange={handleChange} />
                {errors.name && <span style={s.errText}>{errors.name}</span>}
              </div>
              <div style={{ ...s.field, flex: 1 }}>
                <label style={s.label}>Roll Number *</label>
                <input style={{ ...s.input, ...(errors.rollNumber ? s.inputErr : {}) }} name="rollNumber" value={student.rollNumber} placeholder="e.g. 21IT001" onChange={handleChange} />
                {errors.rollNumber && <span style={s.errText}>{errors.rollNumber}</span>}
              </div>
            </div>

            <div style={s.row2}>
              <div style={{ ...s.field, flex: 1 }}>
                <label style={s.label}>Course *</label>
                <select style={{ ...s.input, ...(errors.course ? s.inputErr : {}) }} name="course" value={student.course} onChange={handleChange}>
                  {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.course && <span style={s.errText}>{errors.course}</span>}
              </div>

              <div style={{ ...s.field, flex: 1 }}>
                <label style={s.label}>Department *</label>
                <select style={{ ...s.input, ...(errors.department ? s.inputErr : {}) }} name="department" value={student.department} onChange={handleChange}>
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.department && <span style={s.errText}>{errors.department}</span>}
              </div>
            </div>

            <div style={s.row2}>
              <div style={{ ...s.field, flex: 1 }}>
                <label style={s.label}>Semester *</label>
                <select style={{ ...s.input, ...(errors.semester ? s.inputErr : {}) }} name="semester" value={student.semester} onChange={handleChange}>
                  <option value="">Select semester</option>
                  {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>Semester {n}</option>)}
                </select>
                {errors.semester && <span style={s.errText}>{errors.semester}</span>}
              </div>

              <div style={{ ...s.field, flex: 1 }}>
                <label style={s.label}>Group *</label>
                <select style={{ ...s.input, ...(errors.group ? s.inputErr : {}) }} name="group" value={student.group} onChange={handleChange}>
                  {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                {errors.group && <span style={s.errText}>{errors.group}</span>}
              </div>
            </div>

            <div style={s.field}>
              <label style={s.label}>Login Password *</label>
              <input style={{ ...s.input, ...(errors.password ? s.inputErr : {}) }} type="password" name="password" value={student.password} placeholder="Student will use this to login" onChange={handleChange} />
              {errors.password && <span style={s.errText}>{errors.password}</span>}
            </div>

            <button type="submit" style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? "Registering..." : "Register Student"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" },
  header: { background: "#0f172a", padding: "28px 32px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 },
  title: { fontSize: 22, fontWeight: 800, color: "#f8fafc", margin: "0 0 4px" },
  subtitle: { fontSize: 13, color: "#64748b", margin: 0 },
  uploadLink: { background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  body: { maxWidth: 600, margin: "0 auto", padding: "24px 24px 40px" },
  successBanner: { background: "#f0fdf4", color: "#15803d", padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600, marginBottom: 20, border: "1px solid #bbf7d0" },
  formCard: { background: "#fff", borderRadius: 16, padding: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  photoSection: { display: "flex", alignItems: "center", gap: 20 },
  photoPreviewWrap: { width: 90, height: 90, borderRadius: "50%", overflow: "hidden", border: "2px solid #e2e8f0", flexShrink: 0, background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" },
  photoPreview: { width: "100%", height: "100%", objectFit: "cover" },
  photoPlaceholder: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  photoPlaceholderIcon: { fontSize: 28, opacity: 0.3 },
  photoPlaceholderText: { fontSize: 10, color: "#94a3b8", textAlign: "center" },
  photoBtn: { display: "inline-block", background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 6 },
  photoHint: { fontSize: 12, color: "#94a3b8", margin: 0 },
  divider: { height: 1, background: "#f1f5f9" },
  row2: { display: "flex", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 0.5 },
  input: { padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a", outline: "none", background: "#f8fafc", width: "100%", boxSizing: "border-box" },
  inputErr: { borderColor: "#ef4444", background: "#fff5f5" },
  errText: { fontSize: 12, color: "#ef4444" },
  deptGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))", gap: 8 },
  deptBtn: { padding: "10px 0", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#475569" },
  deptBtnActive: { background: "#0f172a", color: "#fff", border: "1.5px solid #0f172a" },
  submitBtn: { width: "100%", padding: "14px 0", background: "#0f172a", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" },
};

export default AddStudent;