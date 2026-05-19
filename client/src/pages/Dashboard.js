import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const teacher = JSON.parse(localStorage.getItem("teacher") || "{}");
  const [stats, setStats] = useState({ totalStudents: 0, todayAttendance: 0, defaulters: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/attendance/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const quickActions = [
    { label: "Mark Attendance", desc: "Swipe-based attendance marking", icon: "✦", path: "/swipe-attendance", color: "#3b82f6" },
    { label: "Manage Subjects", desc: "Add or remove subjects", icon: "◈", path: "/subjects", color: "#8b5cf6" },
    { label: "Attendance History", desc: "View & edit past records", icon: "◷", path: "/history", color: "#0891b2" },
    { label: "Attendance Report", desc: "Percentage & defaulters", icon: "◉", path: "/percentage", color: "#059669" },
    { label: "Add Student", desc: "Manually register a student", icon: "◎", path: "/add-student", color: "#d97706" },
    { label: "Bulk Upload", desc: "Import students via Excel", icon: "⊞", path: "/upload", color: "#dc2626" },
  ];

  const statCards = [
    { label: "Total Students", value: stats.totalStudents, icon: "👥", bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    { label: "Present Today", value: stats.todayAttendance, icon: "✅", bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
    { label: "Defaulters", value: stats.defaulters, icon: "⚠️", bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
  ];

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          <div style={s.greeting}>
            {new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 17 ? "Good Afternoon" : "Good Evening"},
          </div>
          <h1 style={s.teacherName}>{teacher.name || "Teacher"}</h1>
          <div style={s.deptBadge}>{teacher.department || ""} Department</div>
        </div>
        <div style={s.headerRight}>
          <div style={s.dateBox}>
            <div style={s.dateDay}>{new Date().toLocaleDateString("en-IN", { weekday: "long" })}</div>
            <div style={s.dateNum}>
              {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>
        </div>
      </div>

      <div style={s.body}>
        {/* Stat Cards */}
        <div style={s.statsGrid}>
          {statCards.map((card, i) => (
            <div key={i} style={{ ...s.statCard, background: card.bg, border: `1px solid ${card.border}` }}>
              {loading ? (
                <div style={s.statSkeleton} />
              ) : (
                <>
                  <div style={s.statTop}>
                    <span style={s.statIcon}>{card.icon}</span>
                    <span style={{ ...s.statValue, color: card.color }}>{card.value}</span>
                  </div>
                  <div style={{ ...s.statLabel, color: card.color }}>{card.label}</div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Defaulter alert */}
        {!loading && stats.defaulters > 0 && (
          <div style={s.alertBanner}>
            <span style={s.alertIcon}>⚠️</span>
            <div>
              <div style={s.alertTitle}>Attendance Alert</div>
              <div style={s.alertMsg}>
                {stats.defaulters} student{stats.defaulters > 1 ? "s have" : " has"} attendance below 75%.{" "}
                <span style={s.alertLink} onClick={() => navigate("/percentage")}>
                  View Report →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Quick Actions</h2>
          <p style={s.sectionSub}>Navigate to frequently used features</p>
        </div>

        <div style={s.actionsGrid}>
          {quickActions.map((action, i) => (
            <div
              key={i}
              style={s.actionCard}
              onClick={() => navigate(action.path)}
            >
              <div style={{ ...s.actionIconWrap, background: action.color + "15" }}>
                <span style={{ ...s.actionIcon, color: action.color }}>{action.icon}</span>
              </div>
              <div style={s.actionInfo}>
                <div style={s.actionLabel}>{action.label}</div>
                <div style={s.actionDesc}>{action.desc}</div>
              </div>
              <div style={s.actionArrow}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" },

  header: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    padding: "32px 32px 40px",
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    flexWrap: "wrap", gap: 16,
  },
  headerLeft: { display: "flex", flexDirection: "column", gap: 6 },
  greeting: { fontSize: 14, color: "#94a3b8", fontWeight: 500 },
  teacherName: { fontSize: 28, fontWeight: 800, color: "#f8fafc", margin: 0 },
  deptBadge: {
    display: "inline-block", background: "rgba(59,130,246,0.2)",
    color: "#60a5fa", fontSize: 13, fontWeight: 600,
    padding: "4px 14px", borderRadius: 20, border: "1px solid rgba(59,130,246,0.3)",
    width: "fit-content",
  },
  headerRight: { display: "flex", alignItems: "flex-start" },
  dateBox: { textAlign: "right" },
  dateDay: { fontSize: 13, color: "#64748b", marginBottom: 2 },
  dateNum: { fontSize: 14, color: "#94a3b8", fontWeight: 500 },

  body: { padding: "0 24px 40px", maxWidth: 900, margin: "0 auto", width: "100%" },

  statsGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16, marginTop: -24, marginBottom: 20,
  },
  statCard: {
    borderRadius: 16, padding: "20px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  statSkeleton: {
    height: 60, background: "#f1f5f9",
    borderRadius: 8, animation: "pulse 1.5s infinite",
  },
  statTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  statIcon: { fontSize: 22 },
  statValue: { fontSize: 36, fontWeight: 800, lineHeight: 1 },
  statLabel: { fontSize: 13, fontWeight: 600 },

  alertBanner: {
    background: "#fef2f2", border: "1px solid #fecaca",
    borderRadius: 12, padding: "14px 18px",
    display: "flex", gap: 14, alignItems: "flex-start",
    marginBottom: 28,
  },
  alertIcon: { fontSize: 20, flexShrink: 0 },
  alertTitle: { fontSize: 14, fontWeight: 700, color: "#991b1b", marginBottom: 2 },
  alertMsg: { fontSize: 13, color: "#b91c1c" },
  alertLink: { fontWeight: 700, cursor: "pointer", textDecoration: "underline" },

  sectionHeader: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" },
  sectionSub: { fontSize: 13, color: "#64748b", margin: 0 },

  actionsGrid: { display: "flex", flexDirection: "column", gap: 10 },
  actionCard: {
    background: "#fff", borderRadius: 14,
    padding: "16px 20px", display: "flex",
    alignItems: "center", gap: 16, cursor: "pointer",
    border: "1px solid #f1f5f9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    transition: "box-shadow 0.2s",
  },
  actionIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  actionIcon: { fontSize: 20 },
  actionInfo: { flex: 1 },
  actionLabel: { fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 2 },
  actionDesc: { fontSize: 13, color: "#64748b" },
  actionArrow: { fontSize: 22, color: "#cbd5e1", fontWeight: 300 },
};

export default Dashboard;