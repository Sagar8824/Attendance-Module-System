import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem("student") || "{}"));
  const [subjects, setSubjects] = useState([]);
  const [subjectStats, setSubjectStats] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectHistory, setSubjectHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [activeType, setActiveType] = useState("Theory");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(student.photo ? `http://localhost:5000/uploads/${student.photo}` : null);

  useEffect(() => {
    if (!student?.rollNumber) { navigate("/student-login"); return; }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const subRes = await axios.get(`http://localhost:5000/subject/all?department=${student.department}&semester=${student.semester}`);
      setSubjects(subRes.data);
      const attRes = await axios.get(`http://localhost:5000/attendance/student/${student.rollNumber}`);
      const records = attRes.data.attendance || [];
      const stats = {};
      records.forEach((r) => {
        const sid = r.subjectId?._id || r.subjectId;
        if (!sid) return;
        if (!stats[sid]) stats[sid] = { total: 0, present: 0 };
        stats[sid].total++;
        if (r.status === "Present") stats[sid].present++;
      });
      setSubjectStats(stats);
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please upload an image file (JPG, PNG)"); return; }
    if (file.size > 2 * 1024 * 1024) { alert("Photo must be less than 2MB"); return; }
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoUploading(true);
    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("rollNumber", student.rollNumber);
      const res = await axios.post("http://localhost:5000/student/upload-photo", formData, { headers: { "Content-Type": "multipart/form-data" } });
      const updatedStudent = { ...student, photo: res.data.photo };
      localStorage.setItem("student", JSON.stringify(updatedStudent));
      setStudent(updatedStudent);
    } catch (err) {
      alert("Photo upload failed. Please try again.");
      setPhotoPreview(student.photo ? `http://localhost:5000/uploads/${student.photo}` : null);
    } finally { setPhotoUploading(false); }
  };

  const openSubject = async (subject) => {
    setSelectedSubject(subject);
    setHistoryLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/attendance/student/${student.rollNumber}?subjectId=${subject._id}`);
      setSubjectHistory(res.data.attendance || []);
    } catch (err) { console.log(err); }
    finally { setHistoryLoading(false); }
  };

  const logout = () => { localStorage.removeItem("student"); localStorage.removeItem("role"); navigate("/student-login"); };

  const getStats = (subjectId) => {
    const stat = subjectStats[subjectId];
    if (!stat || stat.total === 0) return { total: 0, present: 0, percentage: 0 };
    return { ...stat, percentage: ((stat.present / stat.total) * 100).toFixed(1) };
  };

  const getColor = (pct) => {
    const p = parseFloat(pct);
    if (p >= 85) return { bg: "#f0fdf4", color: "#15803d", bar: "#22c55e", border: "#bbf7d0" };
    if (p >= 75) return { bg: "#fffbeb", color: "#92400e", bar: "#f59e0b", border: "#fde68a" };
    return { bg: "#fef2f2", color: "#b91c1c", bar: "#ef4444", border: "#fecaca" };
  };

  const allStats = Object.values(subjectStats);
  const overallTotal = allStats.reduce((s, a) => s + a.total, 0);
  const overallPresent = allStats.reduce((s, a) => s + a.present, 0);
  const overallPct = overallTotal ? ((overallPresent / overallTotal) * 100).toFixed(1) : 0;
  const isDefaulter = parseFloat(overallPct) < 75;
  const theorySubjects = subjects.filter((s) => s.type === "Theory");
  const practicalSubjects = subjects.filter((s) => s.type === "Practical");
  const displayed = activeType === "Theory" ? theorySubjects : practicalSubjects;
  const radius = 48, circumference = 2 * Math.PI * radius;
  const offset = circumference - (overallPct / 100) * circumference;
  const progressColor = isDefaulter ? "#ef4444" : "#22c55e";

  if (loading) return (
    <div style={s.centered}><div style={s.spinner} /><p style={{ color: "#94a3b8", marginTop: 12 }}>Loading your dashboard...</p></div>
  );

  if (selectedSubject) {
    const stat = getStats(selectedSubject._id);
    const c = getColor(stat.percentage);
    return (
      <div style={s.page}>
        <div style={s.header}>
          <button style={s.backBtn} onClick={() => setSelectedSubject(null)}>← Back</button>
          <div style={s.headerCenter}>
            <div style={s.headerTitle}>{selectedSubject.name}</div>
            <div style={s.headerSub}>{selectedSubject.code} · {selectedSubject.type}</div>
          </div>
          <div style={{ width: 60 }} />
        </div>
        <div style={s.body}>
          <div style={{ ...s.subjectStatCard, border: `1px solid ${c.border}`, background: c.bg }}>
            <div style={s.subjectStatRow}>
              {[{ label: "Present", value: stat.present, color: "#15803d" }, { label: "Absent", value: stat.total - stat.present, color: "#b91c1c" }, { label: "Attendance", value: stat.percentage + "%", color: c.color }].map((item, i) => (
                <div key={i} style={s.subjectStatBox}>
                  <div style={{ ...s.subjectStatNum, color: item.color }}>{item.value}</div>
                  <div style={s.subjectStatLbl}>{item.label}</div>
                </div>
              ))}
            </div>
            {parseFloat(stat.percentage) < 75 && stat.total > 0 && (
              <div style={s.defaulterAlert}>⚠ Attendance is below the required 75% threshold</div>
            )}
          </div>
          <div style={s.historySection}>
            <h3 style={s.historyTitle}>Attendance History</h3>
            {historyLoading ? <div style={s.centered}><div style={s.spinner} /></div>
              : subjectHistory.length === 0 ? <div style={s.emptyMsg}>No attendance records found for this subject.</div>
              : subjectHistory.sort((a, b) => new Date(b.date) - new Date(a.date)).map((r) => (
                <div key={r._id} style={s.historyRow}>
                  <div style={s.historyDate}>
                    <div style={s.historyDay}>{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                    <div style={s.historyYear}>{new Date(r.date).getFullYear()}</div>
                  </div>
                  <div style={s.historyWeekday}>{new Date(r.date).toLocaleDateString("en-IN", { weekday: "long" })}</div>
                  <div style={{ ...s.statusBadge, background: r.status === "Present" ? "#f0fdf4" : "#fef2f2", color: r.status === "Present" ? "#15803d" : "#b91c1c" }}>
                    {r.status === "Present" ? "✓" : "✗"} {r.status}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <div style={s.greeting}>Welcome back,</div>
          <div style={s.headerTitle}>{student.name}</div>
        </div>
        <button style={s.logoutBtn} onClick={logout}>Sign Out</button>
      </div>

      <div style={s.body}>
        <div style={s.profileCard}>
          <div style={s.photoWrap}>
            <div style={s.profilePhoto}>
              {photoPreview ? <img src={photoPreview} alt={student.name} style={s.profilePhotoImg} />
                : <div style={s.profileInitial}>{student.name?.charAt(0).toUpperCase()}</div>}
              {photoUploading && <div style={s.photoOverlay}><div style={s.photoSpinner} /></div>}
            </div>
            <label style={s.uploadPhotoBtn} htmlFor="photo-upload" title="Upload profile photo">📷</label>
            <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} disabled={photoUploading} />
          </div>
          <div style={s.profileInfo}>
            <div style={s.profileName}>{student.name}</div>
            <div style={s.profileMeta}>{student.rollNumber} · {student.department} · Semester {student.semester}</div>
            <div style={s.uploadHint}>{student.photo ? "Tap the camera icon to update your photo" : "Tap the camera icon to add your photo"}</div>
          </div>
          <div style={s.circleWrap}>
            <svg width="110" height="110" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <circle cx="60" cy="60" r={radius} fill="none" stroke={progressColor} strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} transform="rotate(-90 60 60)" style={{ transition: "stroke-dashoffset 0.8s ease" }} />
              <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="800" fill={progressColor}>{overallPct}%</text>
              <text x="60" y="72" textAnchor="middle" fontSize="10" fill="#94a3b8">Overall</text>
            </svg>
            {isDefaulter && <div style={s.defaulterPill}>Below 75%</div>}
          </div>
        </div>

        <div style={s.miniStatsRow}>
          {[{ label: "Classes Attended", value: overallPresent, color: "#15803d" }, { label: "Classes Missed", value: overallTotal - overallPresent, color: "#b91c1c" }, { label: "Total Subjects", value: subjects.length, color: "#1d4ed8" }].map((item, i) => (
            <div key={i} style={s.miniStat}>
              <div style={{ ...s.miniNum, color: item.color }}>{item.value}</div>
              <div style={s.miniLbl}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={s.typeTabs}>
          {["Theory", "Practical"].map((type) => (
            <button key={type} style={{ ...s.typeTab, ...(activeType === type ? s.typeTabActive(type) : {}) }} onClick={() => setActiveType(type)}>
              {type} ({type === "Theory" ? theorySubjects.length : practicalSubjects.length})
            </button>
          ))}
        </div>

        <div style={s.subjectGrid}>
          {displayed.length === 0 ? (
            <div style={s.emptyMsg}>No {activeType} subjects found for your semester.</div>
          ) : displayed.map((subject) => {
            const stat = getStats(subject._id);
            const c = getColor(stat.percentage);
            return (
              <div key={subject._id} style={{ ...s.subjectCard, border: `1px solid ${c.border}` }} onClick={() => openSubject(subject)}>
                <div style={s.subjectCardTop}>
                  <div style={s.subjectCardName}>{subject.name}</div>
                  <div style={{ ...s.subjectPct, color: c.color }}>{stat.percentage}%</div>
                </div>
                <div style={s.subjectCode}>{subject.code}</div>
                <div style={s.barWrap}><div style={{ ...s.barFill, width: `${Math.min(parseFloat(stat.percentage), 100)}%`, background: c.bar }} /></div>
                <div style={s.subjectCardBottom}>
                  <span style={s.subjectMeta}>{stat.present} of {stat.total} classes attended</span>
                  {parseFloat(stat.percentage) < 75 && stat.total > 0 && <span style={s.warnTag}>⚠ Low</span>}
                  <span style={s.viewDetail}>View Details →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif", paddingBottom: 32 },
  centered: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc" },
  spinner: { width: 36, height: 36, border: "3px solid #e2e8f0", borderTop: "3px solid #3b82f6", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  header: { background: "#0f172a", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  backBtn: { background: "none", border: "none", color: "#94a3b8", fontSize: 14, cursor: "pointer", padding: "6px 10px", borderRadius: 8, fontWeight: 500 },
  headerCenter: { textAlign: "center" },
  headerTitle: { fontSize: 17, fontWeight: 700, color: "#f8fafc" },
  headerSub: { fontSize: 12, color: "#64748b", marginTop: 2 },
  greeting: { fontSize: 13, color: "#64748b", marginBottom: 2 },
  logoutBtn: { background: "rgba(255,255,255,0.08)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 14px", fontSize: 13, cursor: "pointer" },
  body: { maxWidth: 520, margin: "0 auto", padding: "20px 16px 0" },
  profileCard: { background: "#fff", borderRadius: 16, padding: "18px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 14 },
  photoWrap: { position: "relative", flexShrink: 0 },
  profilePhoto: { width: 68, height: 68, borderRadius: "50%", overflow: "hidden", border: "2px solid #e2e8f0", position: "relative" },
  profilePhotoImg: { width: "100%", height: "100%", objectFit: "cover" },
  profileInitial: { width: "100%", height: "100%", background: "#0f172a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800 },
  photoOverlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" },
  photoSpinner: { width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTop: "3px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  uploadPhotoBtn: { position: "absolute", bottom: 0, right: 0, width: 22, height: 22, background: "#3b82f6", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, cursor: "pointer", border: "2px solid #fff" },
  profileInfo: { flex: 1, minWidth: 0 },
  profileName: { fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 3 },
  profileMeta: { fontSize: 12, color: "#64748b", marginBottom: 4 },
  uploadHint: { fontSize: 11, color: "#3b82f6", fontWeight: 500 },
  circleWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 },
  defaulterPill: { background: "#fef2f2", color: "#b91c1c", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, border: "1px solid #fecaca" },
  miniStatsRow: { display: "flex", background: "#fff", borderRadius: 14, padding: "16px 0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 14 },
  miniStat: { flex: 1, textAlign: "center", borderRight: "1px solid #f1f5f9" },
  miniNum: { fontSize: 20, fontWeight: 800 },
  miniLbl: { fontSize: 11, color: "#94a3b8", marginTop: 3, fontWeight: 500 },
  typeTabs: { display: "flex", gap: 10, marginBottom: 14 },
  typeTab: { flex: 1, padding: "10px 0", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#64748b" },
  typeTabActive: (t) => ({ background: t === "Theory" ? "#eff6ff" : "#f0fdf4", color: t === "Theory" ? "#1d4ed8" : "#15803d", border: "none" }),
  subjectGrid: { display: "flex", flexDirection: "column", gap: 10 },
  subjectCard: { background: "#fff", borderRadius: 14, padding: "16px", cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  subjectCardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  subjectCardName: { fontSize: 15, fontWeight: 700, color: "#0f172a", flex: 1, paddingRight: 8 },
  subjectPct: { fontSize: 20, fontWeight: 800, flexShrink: 0 },
  subjectCode: { fontSize: 12, color: "#94a3b8", fontFamily: "monospace", marginBottom: 10 },
  barWrap: { height: 5, background: "#f1f5f9", borderRadius: 99, overflow: "hidden", marginBottom: 10 },
  barFill: { height: "100%", borderRadius: 99, transition: "width 0.6s ease" },
  subjectCardBottom: { display: "flex", alignItems: "center", gap: 8 },
  subjectMeta: { fontSize: 12, color: "#94a3b8", flex: 1 },
  warnTag: { background: "#fef2f2", color: "#b91c1c", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 },
  viewDetail: { fontSize: 12, color: "#3b82f6", fontWeight: 600 },
  emptyMsg: { textAlign: "center", color: "#94a3b8", padding: "40px 0", fontSize: 14 },
  subjectStatCard: { borderRadius: 14, padding: "18px", marginBottom: 16 },
  subjectStatRow: { display: "flex", gap: 0 },
  subjectStatBox: { flex: 1, textAlign: "center", borderRight: "1px solid rgba(0,0,0,0.06)", padding: "8px 0" },
  subjectStatNum: { fontSize: 26, fontWeight: 800 },
  subjectStatLbl: { fontSize: 12, color: "#64748b", marginTop: 3, fontWeight: 500 },
  defaulterAlert: { marginTop: 12, background: "#fef2f2", color: "#b91c1c", padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600, textAlign: "center", border: "1px solid #fecaca" },
  historySection: { background: "#fff", borderRadius: 14, padding: "18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" },
  historyTitle: { fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" },
  historyRow: { display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "1px solid #f8fafc" },
  historyDate: { textAlign: "center", minWidth: 44 },
  historyDay: { fontSize: 14, fontWeight: 700, color: "#0f172a" },
  historyYear: { fontSize: 11, color: "#94a3b8" },
  historyWeekday: { flex: 1, fontSize: 13, color: "#64748b" },
  statusBadge: { padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" },
};

export default StudentDashboard;