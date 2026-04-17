import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function AttendanceHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/attendance/all")
      .then((res) => setRecords(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = records.filter((r) => {
    const matchDate = searchDate ? new Date(r.date).toISOString().split("T")[0] === searchDate : true;
    const matchName = searchName ? r.studentId?.name?.toLowerCase().includes(searchName.toLowerCase()) || r.studentId?.rollNumber?.toLowerCase().includes(searchName.toLowerCase()) : true;
    const matchStatus = filterStatus === "All" ? true : r.status === filterStatus;
    return matchDate && matchName && matchStatus;
  });

  const presentCount = filtered.filter((r) => r.status === "Present").length;
  const absentCount = filtered.filter((r) => r.status === "Absent").length;

  const downloadExcel = () => {
    const data = filtered.map((r) => ({ Date: new Date(r.date).toLocaleDateString("en-IN"), "Roll No": r.studentId?.rollNumber || "N/A", Name: r.studentId?.name || "N/A", Status: r.status }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, "Attendance_History.xlsx");
  };

  const toggleStatus = async (record) => {
    if (updating) return;
    const newStatus = record.status === "Present" ? "Absent" : "Present";
    setEditingId(record._id);
    setUpdating(true);
    try {
      await axios.put(`http://localhost:5000/attendance/update/${record._id}`, { status: newStatus });
      setRecords(records.map((r) => r._id === record._id ? { ...r, status: newStatus } : r));
    } catch (err) {
      alert("Failed to update record. Please try again.");
    } finally {
      setEditingId(null);
      setUpdating(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student and all their attendance records?")) return;
    try {
      await axios.delete(`http://localhost:5000/student/delete/${id}`);
      setRecords(records.filter((r) => r.studentId?._id !== id));
    } catch (err) { console.log(err); }
  };

  const deleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all students? This action cannot be undone.")) return;
    try {
      await axios.delete("http://localhost:5000/student/delete-all");
      setRecords([]);
    } catch (err) { console.log(err); }
  };

  const grouped = filtered.reduce((acc, r) => {
    const date = new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    if (!acc[date]) acc[date] = [];
    acc[date].push(r);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Attendance Records</h2>
          <p style={s.subtitle}>View, edit and export attendance history</p>
        </div>
        <div style={s.headerBtns}>
          <button style={s.excelBtn} onClick={downloadExcel}>↓ Export Excel</button>
          <button style={s.deleteAllBtn} onClick={deleteAll}>Delete All</button>
        </div>
      </div>

      <div style={s.editHint}>
        <span style={s.editHintIcon}>✏️</span>
        Click on any status badge to toggle between Present and Absent
      </div>

      <div style={s.body}>
        <div style={s.statsRow}>
          {[
            { label: "Total Records", value: filtered.length, bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
            { label: "Present", value: presentCount, bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
            { label: "Absent", value: absentCount, bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
          ].map((card, i) => (
            <div key={i} style={{ ...s.statCard, background: card.bg, border: `1px solid ${card.border}` }}>
              <div style={{ ...s.statValue, color: card.color }}>{card.value}</div>
              <div style={{ ...s.statLabel, color: card.color }}>{card.label}</div>
            </div>
          ))}
        </div>

        <div style={s.filterCard}>
          <input style={s.searchInput} placeholder="Search by name or roll number..." value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          <div style={s.filterRow}>
            <input type="date" style={s.dateInput} value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
            <div style={s.tabRow}>
              {["All", "Present", "Absent"].map((tab) => (
                <button key={tab} onClick={() => setFilterStatus(tab)} style={{ ...s.tab, ...(filterStatus === tab ? s.tabActive(tab) : {}) }}>{tab}</button>
              ))}
            </div>
            {(searchDate || searchName || filterStatus !== "All") && (
              <button style={s.clearBtn} onClick={() => { setSearchDate(""); setSearchName(""); setFilterStatus("All"); }}>Clear Filters</button>
            )}
          </div>
        </div>

        {loading ? (
          <div style={s.centered}><div style={s.spinner} /></div>
        ) : sortedDates.length === 0 ? (
          <div style={s.emptyWrap}>
            <div style={s.emptyIcon}>📋</div>
            <p style={s.emptyTitle}>No Records Found</p>
            <p style={s.emptyText}>No attendance records match the selected filters.</p>
          </div>
        ) : (
          sortedDates.map((date) => (
            <div key={date} style={s.dateGroup}>
              <div style={s.dateHeader}>
                <div style={s.dateLabel}>{date}</div>
                <div style={s.dateMeta}>
                  <span style={s.presentPill}>{grouped[date].filter((r) => r.status === "Present").length} Present</span>
                  <span style={s.absentPill}>{grouped[date].filter((r) => r.status === "Absent").length} Absent</span>
                </div>
              </div>
              {grouped[date].map((record) => (
                <div key={record._id} style={s.recordRow}>
                  <div style={{ ...s.avatar, background: record.status === "Present" ? "#f0fdf4" : "#fef2f2", color: record.status === "Present" ? "#15803d" : "#b91c1c" }}>
                    {record.studentId?.photo ? (
                      <img src={`http://localhost:5000/uploads/${record.studentId.photo}`} alt="" style={s.avatarImg} />
                    ) : record.studentId?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div style={s.recordInfo}>
                    <div style={s.recordName}>{record.studentId?.name || "Unknown"}</div>
                    <div style={s.recordSub}>{record.studentId?.rollNumber || "N/A"}</div>
                  </div>
                  <button
                    style={{ ...s.badge, background: record.status === "Present" ? "#f0fdf4" : "#fef2f2", color: record.status === "Present" ? "#15803d" : "#b91c1c", border: `1.5px dashed ${record.status === "Present" ? "#86efac" : "#fca5a5"}`, opacity: editingId === record._id ? 0.5 : 1 }}
                    onClick={() => toggleStatus(record)}
                    disabled={editingId === record._id}
                    title="Click to toggle status"
                  >
                    {editingId === record._id ? "..." : record.status === "Present" ? "✓ Present" : "✗ Absent"}
                    <span style={s.editIcon}>✏</span>
                  </button>
                  <button style={s.delBtn} onClick={() => deleteStudent(record.studentId?._id)} title="Delete student">🗑</button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif", paddingBottom: 40 },
  header: { background: "#0f172a", padding: "28px 32px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 },
  title: { fontSize: 22, fontWeight: 800, color: "#f8fafc", margin: "0 0 4px" },
  subtitle: { fontSize: 13, color: "#64748b", margin: 0 },
  headerBtns: { display: "flex", gap: 10 },
  excelBtn: { background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  deleteAllBtn: { background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  editHint: { background: "#eff6ff", color: "#1d4ed8", padding: "10px 32px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #bfdbfe" },
  editHintIcon: { fontSize: 14 },
  body: { maxWidth: 800, margin: "0 auto", padding: "24px 24px 0" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 },
  statCard: { borderRadius: 14, padding: "18px 20px", border: "1px solid" },
  statValue: { fontSize: 32, fontWeight: 800, lineHeight: 1, marginBottom: 4 },
  statLabel: { fontSize: 13, fontWeight: 600 },
  filterCard: { background: "#fff", borderRadius: 14, padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 },
  searchInput: { padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", background: "#f8fafc", width: "100%", boxSizing: "border-box" },
  filterRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  dateInput: { padding: "9px 12px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none", background: "#f8fafc" },
  tabRow: { display: "flex", gap: 6 },
  tab: { padding: "7px 16px", borderRadius: 20, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#475569" },
  tabActive: (tab) => ({ background: tab === "Present" ? "#f0fdf4" : tab === "Absent" ? "#fef2f2" : "#eff6ff", color: tab === "Present" ? "#15803d" : tab === "Absent" ? "#b91c1c" : "#1d4ed8", border: "none", fontWeight: 700 }),
  clearBtn: { padding: "7px 16px", borderRadius: 20, border: "1.5px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  centered: { display: "flex", justifyContent: "center", padding: "60px 0" },
  spinner: { width: 32, height: 32, border: "3px solid #e2e8f0", borderTop: "3px solid #3b82f6", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  emptyWrap: { textAlign: "center", padding: "60px 0" },
  emptyIcon: { fontSize: 48, marginBottom: 14 },
  emptyTitle: { fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" },
  emptyText: { color: "#94a3b8", fontSize: 14, margin: 0 },
  dateGroup: { marginBottom: 20 },
  dateHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 4px 10px", borderBottom: "1.5px solid #f1f5f9", marginBottom: 8 },
  dateLabel: { fontSize: 14, fontWeight: 700, color: "#0f172a" },
  dateMeta: { display: "flex", gap: 8 },
  presentPill: { background: "#f0fdf4", color: "#15803d", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 },
  absentPill: { background: "#fef2f2", color: "#b91c1c", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 },
  recordRow: { background: "#fff", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, marginBottom: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #f8fafc" },
  avatar: { width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, flexShrink: 0, overflow: "hidden" },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  recordInfo: { flex: 1 },
  recordName: { fontSize: 14, fontWeight: 600, color: "#0f172a" },
  recordSub: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  badge: { padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", background: "none" },
  editIcon: { fontSize: 10, opacity: 0.6 },
  delBtn: { background: "none", border: "none", fontSize: 15, cursor: "pointer", padding: "4px", opacity: 0.5 },
};

export default AttendanceHistory;