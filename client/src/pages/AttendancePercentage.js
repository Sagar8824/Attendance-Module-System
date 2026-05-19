import React, { useEffect, useState } from "react";
import axios from "axios";

function AttendancePercentage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rollNumber");

  useEffect(() => {
    axios.get("http://localhost:5000/attendance/percentage")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = data
    .filter((s) => {
      const matchSearch = s.name?.toLowerCase().includes(search.toLowerCase()) || s.rollNumber?.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "All" ? true : filter === "Defaulter" ? parseFloat(s.percentage) < 75 : parseFloat(s.percentage) >= 75;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (sortBy === "percentage") return parseFloat(b.percentage) - parseFloat(a.percentage);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.rollNumber.localeCompare(b.rollNumber, undefined, { numeric: true });
    });

  const totalStudents = data.length;
  const defaulters = data.filter((s) => parseFloat(s.percentage) < 75).length;
  const safe = totalStudents - defaulters;
  const avgPercentage = data.length ? (data.reduce((sum, s) => sum + parseFloat(s.percentage), 0) / data.length).toFixed(1) : 0;

  const getColor = (pct) => {
    const p = parseFloat(pct);
    if (p >= 85) return { bg: "#f0fdf4", color: "#15803d", bar: "#22c55e", border: "#bbf7d0" };
    if (p >= 75) return { bg: "#fffbeb", color: "#92400e", bar: "#f59e0b", border: "#fde68a" };
    return { bg: "#fef2f2", color: "#b91c1c", bar: "#ef4444", border: "#fecaca" };
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Attendance Report</h2>
          <p style={s.subtitle}>Subject-wise attendance percentage for all students</p>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.statsRow}>
          {[
            { label: "Class Average", value: avgPercentage + "%", bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
            { label: "Satisfactory", value: safe, bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
            { label: "Defaulters (<75%)", value: defaulters, bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
          ].map((card, i) => (
            <div key={i} style={{ ...s.statCard, background: card.bg, border: `1px solid ${card.border}` }}>
              <div style={{ ...s.statValue, color: card.color }}>{card.value}</div>
              <div style={{ ...s.statLabel, color: card.color }}>{card.label}</div>
            </div>
          ))}
        </div>

        {defaulters > 0 && !loading && (
          <div style={s.alertBanner}>
            <span>⚠️</span>
            <span><strong>{defaulters} student{defaulters > 1 ? "s have" : " has"}</strong> attendance below the required 75% threshold.</span>
          </div>
        )}

        <div style={s.filterCard}>
          <input style={s.searchInput} placeholder="Search by name or roll number..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <div style={s.filterRow}>
            <div style={s.tabRow}>
              {["All", "Satisfactory", "Defaulter"].map((tab) => (
                <button key={tab} onClick={() => setFilter(tab)} style={{ ...s.tab, ...(filter === tab ? s.tabActive(tab) : {}) }}>{tab}</button>
              ))}
            </div>
            <select style={s.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="rollNumber">Sort by Roll No.</option>
              <option value="percentage">Sort by Percentage</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={s.centered}><div style={s.spinner} /></div>
        ) : filtered.length === 0 ? (
          <div style={s.emptyWrap}>
            <div style={s.emptyIcon}>📊</div>
            <p style={s.emptyTitle}>No Records Found</p>
            <p style={s.emptyText}>No students match the selected filter criteria.</p>
          </div>
        ) : (
          <div style={s.list}>
            {filtered.map((student, index) => {
              const c = getColor(student.percentage);
              const pct = parseFloat(student.percentage);
              return (
                <div key={index} style={{ ...s.card, border: `1px solid ${c.border}`, background: "#fff" }}>
                  <div style={{ ...s.rankBadge, background: c.bg, color: c.color }}>{String(index + 1).padStart(2, "0")}</div>
                  <div style={s.cardInfo}>
                    <div style={s.cardTop}>
                      <div style={s.cardName}>{student.name}</div>
                      <div style={{ ...s.cardPct, color: c.color }}>{student.percentage}%</div>
                    </div>
                    <div style={s.cardMeta}>
                      <span style={s.rollTag}>{student.rollNumber}</span>
                      <span style={s.classesTag}>{student.present} / {student.total} classes attended</span>
                      {pct < 75 && <span style={s.defaulterTag}>⚠ Below Threshold</span>}
                    </div>
                    <div style={s.barWrap}>
                      <div style={{ ...s.barFill, width: `${Math.min(pct, 100)}%`, background: c.bar }} />
                      <div style={{ ...s.barThreshold }} title="75% threshold" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif", paddingBottom: 40 },
  header: { background: "#0f172a", padding: "28px 32px" },
  title: { fontSize: 22, fontWeight: 800, color: "#f8fafc", margin: "0 0 4px" },
  subtitle: { fontSize: 13, color: "#64748b", margin: 0 },
  body: { maxWidth: 800, margin: "0 auto", padding: "24px 24px 0" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 16 },
  statCard: { borderRadius: 14, padding: "18px 20px" },
  statValue: { fontSize: 30, fontWeight: 800, lineHeight: 1, marginBottom: 4 },
  statLabel: { fontSize: 13, fontWeight: 600 },
  alertBanner: { background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 18px", display: "flex", gap: 10, alignItems: "center", fontSize: 13, color: "#b91c1c", fontWeight: 500, marginBottom: 16 },
  filterCard: { background: "#fff", borderRadius: 14, padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 },
  searchInput: { padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", background: "#f8fafc", width: "100%", boxSizing: "border-box" },
  filterRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  tabRow: { display: "flex", gap: 6 },
  tab: { padding: "7px 16px", borderRadius: 20, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#475569" },
  tabActive: (tab) => ({ background: tab === "Satisfactory" ? "#f0fdf4" : tab === "Defaulter" ? "#fef2f2" : "#eff6ff", color: tab === "Satisfactory" ? "#15803d" : tab === "Defaulter" ? "#b91c1c" : "#1d4ed8", border: "none", fontWeight: 700 }),
  select: { padding: "8px 12px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none", background: "#f8fafc", cursor: "pointer" },
  centered: { display: "flex", justifyContent: "center", padding: "60px 0" },
  spinner: { width: 32, height: 32, border: "3px solid #e2e8f0", borderTop: "3px solid #3b82f6", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  emptyWrap: { textAlign: "center", padding: "60px 0" },
  emptyIcon: { fontSize: 48, marginBottom: 14 },
  emptyTitle: { fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" },
  emptyText: { color: "#94a3b8", fontSize: 14, margin: 0 },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  card: { borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  rankBadge: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 },
  cardInfo: { flex: 1 },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  cardName: { fontSize: 15, fontWeight: 700, color: "#0f172a" },
  cardPct: { fontSize: 20, fontWeight: 800 },
  cardMeta: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 10 },
  rollTag: { background: "#f1f5f9", color: "#475569", fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 20 },
  classesTag: { fontSize: 12, color: "#64748b" },
  defaulterTag: { background: "#fef2f2", color: "#b91c1c", fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20 },
  barWrap: { height: 6, background: "#f1f5f9", borderRadius: 99, overflow: "hidden", position: "relative" },
  barFill: { height: "100%", borderRadius: 99, transition: "width 0.6s ease" },
  barThreshold: { position: "absolute", top: 0, left: "75%", width: 2, height: "100%", background: "#94a3b8", opacity: 0.5 },
};

export default AttendancePercentage;