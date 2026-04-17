import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function AttendanceSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { attendanceLog = [], students = [], subject } = location.state || {};
  const [filter, setFilter] = useState("All");

  const enriched = attendanceLog.map((log) => {
    const student = students.find((s) => s._id === log.studentId);
    return { ...log, name: student?.name || "Unknown", rollNumber: student?.rollNumber || "-", department: student?.department || "-", photo: student?.photo || null };
  });

  const presentList = enriched.filter((r) => r.status === "Present");
  const absentList = enriched.filter((r) => r.status === "Absent");
  const displayed = filter === "All" ? enriched : filter === "Present" ? presentList : absentList;
  const percentage = enriched.length ? ((presentList.length / enriched.length) * 100).toFixed(1) : 0;
  const reportDate = attendanceLog[0]?.date ? new Date(attendanceLog[0].date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "Today";

  const downloadExcel = () => {
    const data = enriched.map((r) => ({ "Roll No": r.rollNumber, Name: r.name, Department: r.department, Date: new Date(r.date).toLocaleDateString("en-IN"), Status: r.status }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, `Attendance_${subject?.name || "Report"}.xlsx`);
  };

  if (!attendanceLog.length) {
    return (
      <div style={s.centered}>
        <div style={s.emptyCard}>
          <div style={s.emptyIcon}>📋</div>
          <h3 style={s.emptyTitle}>No Session Data</h3>
          <p style={s.emptyText}>No attendance data was found for this session.</p>
          <button style={s.goBackBtn} onClick={() => navigate("/swipe-attendance")}>Start New Session</button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate("/")}>← Dashboard</button>
        <div style={s.headerCenter}>
          <h2 style={s.headerTitle}>Session Summary</h2>
          <div style={s.headerSub}>{subject?.name} · {reportDate}</div>
        </div>
        <button style={s.excelBtn} onClick={downloadExcel}>↓ Export</button>
      </div>

      <div style={s.body}>
        <div style={s.statsRow}>
          {[
            { label: "Present", value: presentList.length, bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
            { label: "Absent", value: absentList.length, bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
            { label: "Attendance Rate", value: percentage + "%", bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
          ].map((card, i) => (
            <div key={i} style={{ ...s.statCard, background: card.bg, border: `1px solid ${card.border}` }}>
              <div style={{ ...s.statValue, color: card.color }}>{card.value}</div>
              <div style={{ ...s.statLabel, color: card.color }}>{card.label}</div>
            </div>
          ))}
        </div>

        <div style={s.filterRow}>
          {["All", "Present", "Absent"].map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)} style={{ ...s.filterTab, ...(filter === tab ? s.filterTabActive(tab) : {}) }}>
              {tab} <span style={s.filterCount}>{tab === "All" ? enriched.length : tab === "Present" ? presentList.length : absentList.length}</span>
            </button>
          ))}
        </div>

        <div style={s.list}>
          {displayed.map((record, index) => (
            <div key={index} style={s.listItem}>
              <div style={{ ...s.avatar, background: record.status === "Present" ? "#f0fdf4" : "#fef2f2", color: record.status === "Present" ? "#15803d" : "#b91c1c" }}>
                {record.photo ? (
                  <img src={`http://localhost:5000/uploads/${record.photo}`} alt={record.name} style={s.avatarImg} />
                ) : record.name?.charAt(0).toUpperCase()}
              </div>
              <div style={s.itemInfo}>
                <div style={s.itemName}>{record.name}</div>
                <div style={s.itemSub}>{record.rollNumber} · {record.department}</div>
              </div>
              <div style={{ ...s.statusBadge, background: record.status === "Present" ? "#f0fdf4" : "#fef2f2", color: record.status === "Present" ? "#15803d" : "#b91c1c", border: `1px solid ${record.status === "Present" ? "#bbf7d0" : "#fecaca"}` }}>
                {record.status === "Present" ? "✓" : "✗"} {record.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={s.bottomBar}>
        <button style={s.newSessionBtn} onClick={() => navigate("/swipe-attendance")}>Start New Session</button>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif", paddingBottom: 80 },
  centered: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", fontFamily: "'Inter', sans-serif", padding: "0 20px" },
  header: { background: "#0f172a", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 },
  backBtn: { background: "none", border: "none", color: "#64748b", fontSize: 13, cursor: "pointer", padding: "6px 10px", borderRadius: 8, fontWeight: 500 },
  headerCenter: { textAlign: "center" },
  headerTitle: { fontSize: 16, fontWeight: 700, color: "#f8fafc", margin: 0 },
  headerSub: { fontSize: 12, color: "#64748b", marginTop: 2 },
  excelBtn: { background: "#166534", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  body: { maxWidth: 560, margin: "0 auto", padding: "24px 16px 0" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 },
  statCard: { borderRadius: 14, padding: "16px 12px", textAlign: "center" },
  statValue: { fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 4 },
  statLabel: { fontSize: 12, fontWeight: 600 },
  filterRow: { display: "flex", gap: 8, marginBottom: 16 },
  filterTab: { flex: 1, padding: "9px 0", border: "1.5px solid #e2e8f0", borderRadius: 10, background: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },
  filterTabActive: (tab) => ({ background: tab === "Present" ? "#f0fdf4" : tab === "Absent" ? "#fef2f2" : "#eff6ff", color: tab === "Present" ? "#15803d" : tab === "Absent" ? "#b91c1c" : "#1d4ed8", border: "none", fontWeight: 700 }),
  filterCount: { fontSize: 11, opacity: 0.7 },
  list: { display: "flex", flexDirection: "column", gap: 8 },
  listItem: { background: "#fff", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #f8fafc" },
  avatar: { width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, flexShrink: 0, overflow: "hidden" },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: 600, color: "#0f172a" },
  itemSub: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  statusBadge: { padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" },
  bottomBar: { position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 20px", background: "#fff", boxShadow: "0 -1px 0 #f1f5f9" },
  newSessionBtn: { width: "100%", maxWidth: 560, display: "block", margin: "0 auto", padding: "14px 0", background: "#0f172a", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" },
  emptyCard: { background: "#fff", borderRadius: 20, padding: "48px 40px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", maxWidth: 380, width: "100%" },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" },
  emptyText: { fontSize: 14, color: "#64748b", margin: "0 0 24px" },
  goBackBtn: { width: "100%", padding: "13px 0", background: "#0f172a", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" },
};

export default AttendanceSummary;