import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DEPARTMENTS = ["IT", "CS", "EC", "ME", "CE", "EE"];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

function ManageSubjects() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterDept, setFilterDept] = useState("IT");
  const [filterSem, setFilterSem] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", code: "", type: "Theory", semester: 1, department: "IT" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const loadSubjects = () => {
    setLoading(true);
    axios.get(`http://localhost:5000/subject/all?department=${filterDept}&semester=${filterSem}`)
      .then((res) => setSubjects(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadSubjects(); }, [filterDept, filterSem]);

  const theorySubjects = subjects.filter((s) => s.type === "Theory");
  const practicalSubjects = subjects.filter((s) => s.type === "Practical");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Subject name is required";
    if (!form.code.trim()) e.code = "Subject code is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/subject/add", form);
      setSuccessMsg(`"${form.name}" has been added successfully.`);
      setForm({ name: "", code: "", type: "Theory", semester: filterSem, department: filterDept });
      setShowForm(false);
      loadSubjects();
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      if (err.response?.status === 400) setErrors({ code: "This subject already exists for the selected criteria" });
      else alert("Failed to add subject. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteSubject = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await axios.delete(`http://localhost:5000/subject/delete/${id}`);
      setSubjects(subjects.filter((s) => s._id !== id));
    } catch (err) { console.log(err); }
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Subject Management</h2>
          <p style={s.subtitle}>Manage theory and practical subjects by department and semester</p>
        </div>
        <button style={s.addBtn} onClick={() => { setShowForm(!showForm); setForm({ ...form, semester: filterSem, department: filterDept }); setErrors({}); }}>
          {showForm ? "✕ Cancel" : "+ Add Subject"}
        </button>
      </div>

      {successMsg && <div style={s.successBanner}>✓ {successMsg}</div>}

      {showForm && (
        <div style={s.formWrap}>
          <div style={s.formCard}>
            <h3 style={s.formTitle}>Add New Subject</h3>
            <form onSubmit={handleSubmit} style={s.form}>
              <div style={s.row2}>
                <div style={{ ...s.field, flex: 1 }}>
                  <label style={s.label}>Subject Name *</label>
                  <input style={{ ...s.input, ...(errors.name ? s.inputErr : {}) }} placeholder="e.g. Computer Networks" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }} />
                  {errors.name && <span style={s.errText}>{errors.name}</span>}
                </div>
                <div style={{ ...s.field, flex: 1 }}>
                  <label style={s.label}>Subject Code *</label>
                  <input style={{ ...s.input, ...(errors.code ? s.inputErr : {}) }} placeholder="e.g. CN301" value={form.code} onChange={(e) => { setForm({ ...form, code: e.target.value.toUpperCase() }); setErrors({ ...errors, code: "" }); }} />
                  {errors.code && <span style={s.errText}>{errors.code}</span>}
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Type *</label>
                <div style={s.typeRow}>
                  {["Theory", "Practical"].map((t) => (
                    <button key={t} type="button" style={{ ...s.typeBtn, ...(form.type === t ? s.typeBtnActive(t) : {}) }} onClick={() => setForm({ ...form, type: t })}>
                      {t === "Theory" ? "Theory" : "Practical / Lab"}
                    </button>
                  ))}
                </div>
              </div>
              <div style={s.row2}>
                <div style={{ ...s.field, flex: 1 }}>
                  <label style={s.label}>Department *</label>
                  <select style={s.input} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                    {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div style={{ ...s.field, flex: 1 }}>
                  <label style={s.label}>Semester *</label>
                  <select style={s.input} value={form.semester} onChange={(e) => setForm({ ...form, semester: Number(e.target.value) })}>
                    {SEMESTERS.map((n) => <option key={n} value={n}>Semester {n}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" style={{ ...s.submitBtn, opacity: submitting ? 0.7 : 1 }} disabled={submitting}>
                {submitting ? "Adding..." : "Add Subject"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={s.body}>
        <div style={s.filterCard}>
          <div style={s.filterGroup}>
            <div style={s.filterLabel}>Department</div>
            <div style={s.chipRow}>
              {DEPARTMENTS.map((d) => (
                <button key={d} style={{ ...s.chip, ...(filterDept === d ? s.chipActive : {}) }} onClick={() => setFilterDept(d)}>{d}</button>
              ))}
            </div>
          </div>
          <div style={s.filterGroup}>
            <div style={s.filterLabel}>Semester</div>
            <div style={s.chipRow}>
              {SEMESTERS.map((n) => (
                <button key={n} style={{ ...s.chip, ...(filterSem === n ? s.chipActive : {}) }} onClick={() => setFilterSem(n)}>Sem {n}</button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div style={s.centered}><div style={s.spinner} /></div>
        ) : subjects.length === 0 ? (
          <div style={s.emptyWrap}>
            <div style={s.emptyIcon}>📚</div>
            <p style={s.emptyTitle}>No Subjects Found</p>
            <p style={s.emptyText}>{filterDept} Department · Semester {filterSem} has no subjects configured.</p>
            <button style={s.emptyAddBtn} onClick={() => { setForm({ ...form, department: filterDept, semester: filterSem }); setShowForm(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              + Add First Subject
            </button>
          </div>
        ) : (
          <>
            {theorySubjects.length > 0 && (
              <div style={s.section}>
                <div style={s.sectionHeader}>
                  <span style={s.sectionTitle}>Theory Subjects</span>
                  <span style={s.sectionCount}>{theorySubjects.length}</span>
                </div>
                {theorySubjects.map((sub) => <SubjectCard key={sub._id} subject={sub} onDelete={deleteSubject} color="#3b82f6" />)}
              </div>
            )}
            {practicalSubjects.length > 0 && (
              <div style={s.section}>
                <div style={s.sectionHeader}>
                  <span style={s.sectionTitle}>Practical / Lab</span>
                  <span style={s.sectionCount}>{practicalSubjects.length}</span>
                </div>
                {practicalSubjects.map((sub) => <SubjectCard key={sub._id} subject={sub} onDelete={deleteSubject} color="#059669" />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SubjectCard({ subject, onDelete, color }) {
  return (
    <div style={sc.card}>
      <div style={{ ...sc.dot, background: color }} />
      <div style={sc.info}>
        <div style={sc.name}>{subject.name}</div>
        <div style={sc.code}>{subject.code}</div>
      </div>
      <div style={{ ...sc.badge, background: color + "15", color }}>{subject.type}</div>
      <button style={sc.delBtn} onClick={() => onDelete(subject._id, subject.name)} title="Delete subject">🗑</button>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif", paddingBottom: 40 },
  header: { background: "#0f172a", padding: "28px 32px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 },
  title: { fontSize: 22, fontWeight: 800, color: "#f8fafc", margin: "0 0 4px" },
  subtitle: { fontSize: 13, color: "#64748b", margin: 0 },
  addBtn: { background: "#3b82f6", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  successBanner: { background: "#f0fdf4", color: "#15803d", padding: "12px 32px", fontSize: 14, fontWeight: 600, borderBottom: "1px solid #bbf7d0" },
  formWrap: { background: "#f1f5f9", padding: "20px 24px", borderBottom: "1px solid #e2e8f0" },
  formCard: { background: "#fff", borderRadius: 16, padding: "24px", maxWidth: 660, margin: "0 auto", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" },
  formTitle: { fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px" },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  row2: { display: "flex", gap: 14 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 0.5 },
  input: { padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", background: "#f8fafc", boxSizing: "border-box", width: "100%" },
  inputErr: { borderColor: "#ef4444", background: "#fff5f5" },
  errText: { fontSize: 12, color: "#ef4444" },
  typeRow: { display: "flex", gap: 10 },
  typeBtn: { flex: 1, padding: "11px 0", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 14, cursor: "pointer", fontWeight: 500, color: "#475569" },
  typeBtnActive: (t) => ({ background: t === "Theory" ? "#eff6ff" : "#f0fdf4", color: t === "Theory" ? "#1d4ed8" : "#15803d", border: `1.5px solid ${t === "Theory" ? "#bfdbfe" : "#bbf7d0"}`, fontWeight: 700 }),
  submitBtn: { padding: "13px 0", background: "#0f172a", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" },
  body: { maxWidth: 700, margin: "0 auto", padding: "24px 24px 0" },
  filterCard: { background: "#fff", borderRadius: 14, padding: "18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 },
  filterGroup: { display: "flex", flexDirection: "column", gap: 8 },
  filterLabel: { fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.8 },
  chipRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  chip: { padding: "6px 16px", borderRadius: 20, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#475569" },
  chipActive: { background: "#0f172a", color: "#fff", border: "1.5px solid #0f172a", fontWeight: 700 },
  centered: { display: "flex", justifyContent: "center", padding: "60px 0" },
  spinner: { width: 32, height: 32, border: "3px solid #e2e8f0", borderTop: "3px solid #3b82f6", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  emptyWrap: { textAlign: "center", padding: "60px 0" },
  emptyIcon: { fontSize: 48, marginBottom: 14 },
  emptyTitle: { fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" },
  emptyText: { color: "#94a3b8", fontSize: 14, margin: "0 0 20px" },
  emptyAddBtn: { background: "#0f172a", color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  section: { marginBottom: 24 },
  sectionHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #f1f5f9" },
  sectionTitle: { fontSize: 14, fontWeight: 700, color: "#0f172a" },
  sectionCount: { background: "#f1f5f9", color: "#64748b", fontSize: 12, fontWeight: 700, padding: "2px 10px", borderRadius: 20 },
};

const sc = {
  card: { background: "#fff", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, marginBottom: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #f8fafc" },
  dot: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 2 },
  code: { fontSize: 12, color: "#94a3b8", fontFamily: "monospace" },
  badge: { padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" },
  delBtn: { background: "none", border: "none", fontSize: 15, cursor: "pointer", opacity: 0.5, padding: 4 },
};

export default ManageSubjects;