import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const COURSES = ["BE", "ME", "BCA", "MCA"];
const DEPARTMENTS = ["IT", "CS", "EC", "ME", "CE", "EE"];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const GROUPS = ["A1", "A2", "A3", "B1", "B2"];

function SwipeAttendance() {
  const navigate = useNavigate();
  const teacherDept = localStorage.getItem("department") || "IT";
  const [step, setStep] = useState(1);
  const [course, setCourse] = useState("BE");
  const [department, setDepartment] = useState(teacherDept);
  const [semester, setSemester] = useState(1);
  const [group, setGroup] = useState("A1");
  const [subjectType, setSubjectType] = useState("Theory");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [students, setStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [lastSwipe, setLastSwipe] = useState(null);
  const [done, setDone] = useState(false);
  const [swipeAnim, setSwipeAnim] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const touchStartX = useRef(null);
  const mouseStartX = useRef(null);

  useEffect(() => {
    setLoadingSubjects(true);
    setSelectedSubject(null);
    axios.get(`http://localhost:5000/subject/all?course=${course}&department=${department}&semester=${semester}&type=${subjectType}`)
      .then((res) => setSubjects(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoadingSubjects(false));
  }, [course, department, semester, subjectType]);

  const startAttendance = async () => {
    if (!selectedSubject) { alert("Please select a subject to continue"); return; }
    setLoadingStudents(true);
    try {
      const res = await axios.get(`http://localhost:5000/student/all?course=${course}&department=${department}&semester=${semester}&group=${group}`);
      const sorted = res.data.sort((a, b) => a.rollNumber.localeCompare(b.rollNumber, undefined, { numeric: true }));
      if (sorted.length === 0) { alert(`No students found for ${course} ${department} Sem ${semester} Group ${group}`); return; }
      setStudents(sorted);
      setCurrentIndex(0);
      setAttendanceLog([]);
      setDone(false);
      setStep(2);
    } catch (err) {
      alert("Failed to load students. Please try again.");
    } finally {
      setLoadingStudents(false);
    }
  };

  const markAttendance = (direction) => {
    const currentStudent = students[currentIndex];
    if (!currentStudent || swipeAnim) return;
    const status = direction === "left" ? "Absent" : "Present";
    setSwipeAnim(direction);
    setDragX(0);
    setTimeout(() => {
      setLastSwipe({ name: currentStudent.name, status });
      setAttendanceLog((prev) => [...prev, { studentId: currentStudent._id, subjectId: selectedSubject._id, date: selectedDate, status }]);
      setSwipeAnim(null);
      const next = currentIndex + 1;
      if (next >= students.length) setDone(true);
      else setCurrentIndex(next);
    }, 300);
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove = (e) => { if (touchStartX.current === null) return; setDragX(e.touches[0].clientX - touchStartX.current); };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 80) markAttendance(diff > 0 ? "left" : "right");
    else setDragX(0);
    touchStartX.current = null;
  };
  const onMouseDown = (e) => { mouseStartX.current = e.clientX; setIsDragging(true); };
  const onMouseMove = (e) => { if (!isDragging || mouseStartX.current === null) return; setDragX(e.clientX - mouseStartX.current); };
  const onMouseUp = (e) => {
    if (mouseStartX.current === null) return;
    const diff = e.clientX - mouseStartX.current;
    if (Math.abs(diff) > 80) markAttendance(diff > 0 ? "left" : "right");
    else setDragX(0);
    mouseStartX.current = null;
    setIsDragging(false);
  };

  const submitAttendance = async () => {
    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/attendance/mark-bulk", attendanceLog);
      navigate("/attendance-summary", { state: { attendanceLog, students, subject: selectedSubject } });
    } catch (err) {
      alert("Failed to submit attendance. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 1) {
    return (
      <div style={s.page}>
        <div style={s.header}>
          <button style={s.backBtn} onClick={() => navigate("/")}>← Back</button>
          <h2 style={s.headerTitle}>Attendance Setup</h2>
          <div style={s.deptBadge}>{department}</div>
        </div>
        <div style={s.setupWrap}>
          <div style={s.setupCard}>
            <div style={s.setupCardTitle}>Date</div>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={s.dateInput} />
          </div>
          <div style={s.setupCard}>
            <div style={s.setupCardTitle}>Course</div>
            <div style={s.chipRow}>
              {COURSES.map((c) => (
                <button key={c} style={{ ...s.chip, ...(course === c ? s.chipActive : {}) }} onClick={() => setCourse(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div style={s.setupCard}>
            <div style={s.setupCardTitle}>Department <span style={s.autoTag}>Auto-selected</span></div>
            <div style={s.chipRow}>
              {DEPARTMENTS.map((d) => (
                <button key={d} style={{ ...s.chip, ...(department === d ? s.chipActive : {}), ...(d !== teacherDept ? s.chipDisabled : {}) }} onClick={() => setDepartment(d)} disabled={d !== teacherDept}>{d}</button>
              ))}
            </div>
          </div>
          <div style={s.setupCard}>
            <div style={s.setupCardTitle}>Semester</div>
            <div style={s.chipRow}>
              {SEMESTERS.map((n) => (
                <button key={n} style={{ ...s.chip, ...(semester === n ? s.chipActive : {}) }} onClick={() => setSemester(n)}>Sem {n}</button>
              ))}
            </div>
          </div>
          <div style={s.setupCard}>
            <div style={s.setupCardTitle}>Group</div>
            <div style={s.chipRow}>
              {GROUPS.map((g) => (
                <button key={g} style={{ ...s.chip, ...(group === g ? s.chipActive : {}) }} onClick={() => setGroup(g)}>{g}</button>
              ))}
            </div>
          </div>
          <div style={s.setupCard}>
            <div style={s.setupCardTitle}>Subject Type</div>
            <div style={s.typeRow}>
              <button style={{ ...s.typeBtn, ...(subjectType === "Theory" ? s.typeBtnActive("#3b82f6") : {}) }} onClick={() => setSubjectType("Theory")}>Theory</button>
              <button style={{ ...s.typeBtn, ...(subjectType === "Practical" ? s.typeBtnActive("#059669") : {}) }} onClick={() => setSubjectType("Practical")}>Practical / Lab</button>
            </div>
          </div>
          <div style={s.setupCard}>
            <div style={s.setupCardTitle}>Select Subject {loadingSubjects && <span style={s.loadingDot}>Loading...</span>}</div>
            {!loadingSubjects && subjects.length === 0 ? (
              <div style={s.noSubject}>
                <p style={s.noSubjectText}>No subjects found for the selected criteria.</p>
                <button style={s.manageBtn} onClick={() => navigate("/subjects")}>+ Add Subjects</button>
              </div>
            ) : (
              <div style={s.subjectList}>
                {subjects.map((sub) => (
                  <button key={sub._id} style={{ ...s.subjectBtn, ...(selectedSubject?._id === sub._id ? s.subjectBtnActive : {}) }} onClick={() => setSelectedSubject(sub)}>
                    <div>
                      <div style={s.subjectBtnName}>{sub.name}</div>
                      <div style={s.subjectBtnCode}>{sub.code}</div>
                    </div>
                    {selectedSubject?._id === sub._id && <span style={s.checkmark}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button style={{ ...s.startBtn, opacity: (!selectedSubject || loadingStudents) ? 0.5 : 1 }} onClick={startAttendance} disabled={!selectedSubject || loadingStudents}>
            {loadingStudents ? "Loading Students..." : selectedSubject ? `Start Attendance — ${selectedSubject.name}` : "Select a subject to continue"}
          </button>
        </div>
      </div>
    );
  }

  const currentStudent = students[currentIndex];

  if (done) {
    const presentCount = attendanceLog.filter((a) => a.status === "Present").length;
    const absentCount = attendanceLog.filter((a) => a.status === "Absent").length;
    return (
      <div style={s.centered}>
        <div style={s.doneCard}>
          <div style={s.doneIconWrap}><div style={s.doneIcon}>✓</div></div>
          <h2 style={s.doneTitle}>Session Complete</h2>
          <p style={s.doneSub}>{selectedSubject?.name} · {new Date(selectedDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
          <div style={s.summaryRow}>
            <div style={s.summaryBox("#f0fdf4", "#15803d")}>
              <div style={s.summaryNum("#15803d")}>{presentCount}</div>
              <div style={s.summaryLbl}>Present</div>
            </div>
            <div style={s.summaryBox("#fef2f2", "#b91c1c")}>
              <div style={s.summaryNum("#b91c1c")}>{absentCount}</div>
              <div style={s.summaryLbl}>Absent</div>
            </div>
          </div>
          <button style={{ ...s.submitBtn, opacity: submitting ? 0.7 : 1 }} onClick={submitAttendance} disabled={submitting}>
            {submitting ? "Saving..." : "Save & View Summary"}
          </button>
          <button style={s.backToSetup} onClick={() => setStep(1)}>Mark Another Subject</button>
        </div>
      </div>
    );
  }

  const rotation = dragX / 15;
  const presentOpacity = Math.min(Math.max(-dragX / 80, 0), 1); // LEFT swipe = Present ✓
  const absentOpacity  = Math.min(Math.max( dragX / 80, 0), 1); // RIGHT swipe = Absent ✓
  const cardStyle = swipeAnim === "left"
    ? { ...s.card, transform: "translateX(-130%) rotate(-20deg)", opacity: 0, transition: "all 0.3s ease" }
    : swipeAnim === "right"
    ? { ...s.card, transform: "translateX(130%) rotate(20deg)", opacity: 0, transition: "all 0.3s ease" }
    : { ...s.card, transform: `translateX(${dragX}px) rotate(${rotation}deg)`, transition: isDragging ? "none" : "transform 0.3s ease" };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => setStep(1)}>← Setup</button>
        <div style={s.headerCenter}>
          <div style={s.headerTitle}>{selectedSubject?.name}</div>
          <div style={s.headerSub}>{department} · Semester {semester} · {selectedSubject?.type}</div>
        </div>
        <div style={{ width: 60 }} />
      </div>
      <div style={s.progressWrap}>
        <div style={s.progressTop}>
          <span style={s.progressLabel}>Progress</span>
          <span style={s.progressCount}>{currentIndex} of {students.length} students</span>
        </div>
        <div style={s.progressBar}><div style={{ ...s.progressFill, width: `${(currentIndex / students.length) * 100}%` }} /></div>
      </div>
      {lastSwipe && (
        <div style={{ ...s.lastBadge, background: lastSwipe.status === "Present" ? "#f0fdf4" : "#fef2f2", color: lastSwipe.status === "Present" ? "#15803d" : "#b91c1c", border: `1px solid ${lastSwipe.status === "Present" ? "#bbf7d0" : "#fecaca"}` }}>
          {lastSwipe.status === "Present" ? "✓" : "✗"} {lastSwipe.name} marked as {lastSwipe.status}
        </div>
      )}
      <div style={s.hintRow}>
        <span style={s.presentHint}>← Present</span>
        <span style={s.absentHint}>Absent →</span>
      </div>
      <div style={s.cardArea}>
        <div style={cardStyle} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
          <div style={{ ...s.overlayPresent, opacity: presentOpacity }}>PRESENT</div>
          <div style={{ ...s.overlayAbsent, opacity: absentOpacity }}>ABSENT</div>
          <div style={s.photoWrap}>
            {currentStudent?.photo ? (
              <img src={`http://localhost:5000/uploads/${currentStudent.photo}`} alt={currentStudent.name} style={s.photo} draggable={false} />
            ) : (
              <div style={s.photoInitial}>{currentStudent?.name?.charAt(0).toUpperCase()}</div>
            )}
          </div>
          <div style={s.cardInfo}>
            <h3 style={s.studentName}>{currentStudent?.name}</h3>
            <div style={s.infoGrid}>
              <div style={s.infoItem}><span style={s.infoLabel}>Roll No.</span><span style={s.infoValue}>{currentStudent?.rollNumber}</span></div>
              <div style={s.infoItem}><span style={s.infoLabel}>Department</span><span style={s.infoValue}>{currentStudent?.department}</span></div>
              <div style={s.infoItem}><span style={s.infoLabel}>Semester</span><span style={s.infoValue}>{currentStudent?.semester}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div style={s.btnRow}>
        <button style={s.presentBtn} onClick={() => markAttendance("left")}>✓ Present</button>
        <button style={s.absentBtn} onClick={() => markAttendance("right")}>✗ Absent</button>
      </div>
      <p style={s.dragHint}>Swipe the card left for Present · Right for Absent</p>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Inter', sans-serif", paddingBottom: 32, overflowX: "hidden" },
  centered: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: "0 20px", fontFamily: "'Inter', sans-serif" },
  header: { width: "100%", background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 },
  backBtn: { background: "none", border: "none", color: "#94a3b8", fontSize: 14, cursor: "pointer", padding: "6px 10px", borderRadius: 8, fontWeight: 500 },
  headerCenter: { textAlign: "center" },
  headerTitle: { fontSize: 15, fontWeight: 700, color: "#f8fafc" },
  headerSub: { fontSize: 11, color: "#64748b", marginTop: 2 },
  deptBadge: { background: "rgba(59,130,246,0.2)", color: "#60a5fa", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, border: "1px solid rgba(59,130,246,0.3)" },
  setupWrap: { width: "100%", maxWidth: 520, padding: "20px 16px 0" },
  setupCard: { background: "#fff", borderRadius: 14, padding: "18px", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" },
  setupCardTitle: { fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12, display: "flex", alignItems: "center", gap: 8, textTransform: "uppercase", letterSpacing: 0.5 },
  autoTag: { background: "#f0fdf4", color: "#15803d", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, textTransform: "none", letterSpacing: 0 },
  loadingDot: { fontSize: 11, color: "#94a3b8", fontWeight: 400, textTransform: "none" },
  dateInput: { padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", width: "100%", background: "#f8fafc", boxSizing: "border-box" },
  chipRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  chip: { padding: "7px 16px", borderRadius: 20, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#475569" },
  chipActive: { background: "#0f172a", color: "#fff", border: "1.5px solid #0f172a", fontWeight: 700 },
  chipDisabled: { opacity: 0.3, cursor: "not-allowed" },
  typeRow: { display: "flex", gap: 10 },
  typeBtn: { flex: 1, padding: "11px 0", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 14, cursor: "pointer", fontWeight: 500, color: "#475569" },
  typeBtnActive: (color) => ({ background: color + "15", color, border: `1.5px solid ${color}40`, fontWeight: 700 }),
  noSubject: { textAlign: "center", padding: "20px 0" },
  noSubjectText: { color: "#94a3b8", fontSize: 14, marginBottom: 12 },
  manageBtn: { background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  subjectList: { display: "flex", flexDirection: "column", gap: 8 },
  subjectBtn: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", textAlign: "left" },
  subjectBtnActive: { border: "1.5px solid #0f172a", background: "#f1f5f9" },
  subjectBtnName: { fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 2 },
  subjectBtnCode: { fontSize: 12, color: "#94a3b8", fontFamily: "monospace" },
  checkmark: { fontSize: 16, color: "#0f172a", fontWeight: 700 },
  startBtn: { width: "100%", padding: "15px 0", background: "#0f172a", color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4, marginBottom: 24 },
  progressWrap: { width: "100%", maxWidth: 420, padding: "16px 20px 0" },
  progressTop: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  progressLabel: { fontSize: 12, color: "#64748b", fontWeight: 600 },
  progressCount: { fontSize: 12, color: "#0f172a", fontWeight: 700 },
  progressBar: { height: 6, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" },
  progressFill: { height: "100%", background: "#3b82f6", borderRadius: 99, transition: "width 0.4s ease" },
  lastBadge: { marginTop: 12, padding: "8px 20px", borderRadius: 20, fontSize: 13, fontWeight: 600, maxWidth: "90%", textAlign: "center" },
  hintRow: { width: "100%", maxWidth: 420, display: "flex", justifyContent: "space-between", padding: "10px 24px 0" },
  presentHint: { fontSize: 13, fontWeight: 700, color: "#16a34a" },
  absentHint: { fontSize: 13, fontWeight: 700, color: "#dc2626" },
  cardArea: { width: "100%", maxWidth: 420, padding: "10px 20px", display: "flex", justifyContent: "center", minHeight: 380, alignItems: "center" },
  card: { width: "100%", background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.12)", overflow: "hidden", cursor: "grab", userSelect: "none", position: "relative", border: "1px solid #f1f5f9" },
  overlayPresent: { position: "absolute", top: 16, left: 16, background: "#16a34a", color: "#fff", padding: "6px 16px", borderRadius: 8, fontSize: 15, fontWeight: 800, zIndex: 10, transform: "rotate(-12deg)", pointerEvents: "none", letterSpacing: 1 },
  overlayAbsent: { position: "absolute", top: 16, right: 16, background: "#dc2626", color: "#fff", padding: "6px 16px", borderRadius: 8, fontSize: 15, fontWeight: 800, zIndex: 10, transform: "rotate(12deg)", pointerEvents: "none", letterSpacing: 1 },
  photoWrap: { width: "100%", height: 200, background: "#f1f5f9", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
  photo: { width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" },
  photoInitial: { fontSize: 72, fontWeight: 800, color: "#cbd5e1", userSelect: "none" },
  cardInfo: { padding: "18px 20px 20px" },
  studentName: { fontSize: 20, fontWeight: 800, margin: "0 0 14px", color: "#0f172a" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))", gap: 12 },
  infoItem: { display: "flex", flexDirection: "column", gap: 4 },
  infoLabel: { fontSize: 10, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 },
  infoValue: { fontSize: 13, fontWeight: 700, color: "#1e293b" },
  btnRow: { display: "flex", gap: 12, width: "100%", maxWidth: 420, padding: "0 20px" },
  presentBtn: { flex: 1, padding: "15px 0", background: "#16a34a", color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.3 },
  absentBtn: { flex: 1, padding: "15px 0", background: "#dc2626", color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.3 },
  dragHint: { fontSize: 12, color: "#94a3b8", marginTop: 12, textAlign: "center" },
  doneCard: { background: "#fff", borderRadius: 20, padding: "44px 36px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", width: "100%", maxWidth: 380, border: "1px solid #f1f5f9" },
  doneIconWrap: { display: "flex", justifyContent: "center", marginBottom: 20 },
  doneIcon: { width: 72, height: 72, background: "#f0fdf4", color: "#16a34a", borderRadius: "50%", fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #bbf7d0" },
  doneTitle: { fontSize: 24, fontWeight: 800, margin: "0 0 6px", color: "#0f172a" },
  doneSub: { fontSize: 14, color: "#64748b", margin: "0 0 28px" },
  summaryRow: { display: "flex", gap: 12, marginBottom: 28 },
  summaryBox: (bg, color) => ({ flex: 1, background: bg, borderRadius: 14, padding: "18px 0", textAlign: "center" }),
  summaryNum: (color) => ({ fontSize: 32, fontWeight: 800, color }),
  summaryLbl: { fontSize: 13, color: "#64748b", marginTop: 4, fontWeight: 500 },
  submitBtn: { width: "100%", padding: "14px 0", background: "#0f172a", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 12 },
  backToSetup: { width: "100%", padding: "13px 0", background: "#fff", color: "#0f172a", border: "1.5px solid #e2e8f0", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" },
};

export default SwipeAttendance;