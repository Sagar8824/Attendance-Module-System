import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DEPARTMENTS = ["IT", "CS", "EC", "ME", "CE", "EE"];

function AdminDashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  const [activeTab, setActiveTab] = useState("pending");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [filterDept, setFilterDept] = useState("All");
  const [resetId, setResetId] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) { navigate("/admin-login"); return; }
    loadTeachers();
  }, [activeTab, navigate]);

  const authHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } });

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/admin/teachers?status=${activeTab}`, authHeader());
      setTeachers(res.data);
    } catch (err) { if (err.response?.status === 401) logout(); }
    finally { setLoading(false); }
  };

  const approve = async (id) => {
    setActionLoading(id);
    try {
      await axios.put(`http://localhost:5000/admin/teachers/approve/${id}`, {}, authHeader());
      setTeachers(teachers.filter((t) => t._id !== id));
    } catch (err) { console.log(err); }
    finally { setActionLoading(null); }
  };

  const reject = async (id, name) => {
    if (!window.confirm(`Are you sure you want to reject "${name}"?`)) return;
    setActionLoading(id);
    try {
      await axios.put(`http://localhost:5000/admin/teachers/reject/${id}`, {}, authHeader());
      setTeachers(teachers.filter((t) => t._id !== id));
    } catch (err) { console.log(err); }
    finally { setActionLoading(null); }
  };

  const deleteTeacher = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    try {
      await axios.delete(`http://localhost:5000/admin/teachers/delete/${id}`, authHeader());
      setTeachers(teachers.filter((t) => t._id !== id));
    } catch (err) { console.log(err); }
  };

  const resetPassword = async (id) => {
    if (!newPassword || newPassword.length < 4) { alert("Password must be at least 4 characters"); return; }
    try {
      await axios.put(`http://localhost:5000/admin/teachers/reset-password/${id}`, { newPassword }, authHeader());
      alert("Password has been reset successfully.");
      setResetId(null);
      setNewPassword("");
    } catch (err) { console.log(err); }
  };

  const logout = () => { localStorage.removeItem("adminToken"); localStorage.removeItem("admin"); navigate("/admin-login"); };

  const filtered = filterDept === "All" ? teachers : teachers.filter((t) => t.department === filterDept);
  const pendingCount = teachers.filter((t) => t.status === "pending").length;

  const tabs = [
    { key: "pending", label: "Pending", color: "#92400e", bg: "#fffbeb", border: "#fde68a" },
    { key: "approved", label: "Approved", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
    { key: "rejected", label: "Rejected", color: "#b91c1c", bg: "#fef2f2", border: "#fecaca" },
  ];

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <div style={s.headerTop}>
            <div style={s.logoIcon}>⚙</div>
            <span style={s.logoText}>AttendanceIQ</span>
            <span style={s.adminBadge}>Administrator</span>
          </div>
          <div style={s.headerSub}>Welcome, {admin.name}</div>
        </div>
        <button style={s.logoutBtn} onClick={logout}>Sign Out</button>
      </div>

      <div style={s.tabsBar}>
        {tabs.map((tab) => (
          <button key={tab.key} style={{ ...s.tab, ...(activeTab === tab.key ? { ...s.tabActive, color: tab.color, borderBottom: `3px solid ${tab.color}` } : {}) }} onClick={() => { setActiveTab(tab.key); setFilterDept("All"); }}>
            {tab.label}
            {tab.key === "pending" && pendingCount > 0 && activeTab !== "pending" && (
              <span style={s.pendingBubble}>{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "pending" && teachers.length > 0 && (
        <div style={s.pendingAlert}>
          ⏳ {teachers.length} registration request{teachers.length > 1 ? "s are" : " is"} awaiting your review
        </div>
      )}

      <div style={s.body}>
        <div style={s.filterBar}>
          {["All", ...DEPARTMENTS].map((d) => {
            const count = d === "All" ? teachers.length : teachers.filter((t) => t.department === d).length;
            if (d !== "All" && count === 0) return null;
            return (
              <button key={d} style={{ ...s.chip, ...(filterDept === d ? s.chipActive : {}) }} onClick={() => setFilterDept(d)}>
                {d} <span style={s.chipCount}>{count}</span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div style={s.centered}><div style={s.spinner} /></div>
        ) : filtered.length === 0 ? (
          <div style={s.emptyWrap}>
            <div style={s.emptyIcon}>{activeTab === "pending" ? "⏳" : activeTab === "approved" ? "✓" : "✗"}</div>
            <p style={s.emptyTitle}>{activeTab === "pending" ? "No Pending Requests" : activeTab === "approved" ? "No Approved Teachers" : "No Rejected Accounts"}</p>
            <p style={s.emptyText}>{activeTab === "pending" ? "All registration requests have been processed." : `No teachers found in the ${activeTab} status.`}</p>
          </div>
        ) : (
          filtered.map((teacher) => (
            <div key={teacher._id} style={s.card}>
              <div style={s.cardTop}>
                <div style={{ ...s.avatar, background: activeTab === "pending" ? "#fffbeb" : activeTab === "approved" ? "#f0fdf4" : "#fef2f2", color: activeTab === "pending" ? "#92400e" : activeTab === "approved" ? "#15803d" : "#b91c1c" }}>
                  {teacher.name?.charAt(0).toUpperCase()}
                </div>
                <div style={s.info}>
                  <div style={s.name}>{teacher.name}</div>
                  <div style={s.email}>{teacher.email}</div>
                  <div style={s.meta}>
                    <span style={s.deptTag}>{teacher.department}</span>
                    <span style={s.dateTag}>{new Date(teacher.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                </div>
              </div>
              <div style={s.actions}>
                {activeTab === "pending" && (
                  <>
                    <button style={{ ...s.approveBtn, opacity: actionLoading === teacher._id ? 0.7 : 1 }} onClick={() => approve(teacher._id)} disabled={actionLoading === teacher._id}>
                      {actionLoading === teacher._id ? "Processing..." : "✓ Approve"}
                    </button>
                    <button style={{ ...s.rejectBtn, opacity: actionLoading === teacher._id ? 0.7 : 1 }} onClick={() => reject(teacher._id, teacher.name)} disabled={actionLoading === teacher._id}>
                      ✗ Reject
                    </button>
                  </>
                )}
                {activeTab === "approved" && (
                  <>
                    <button style={s.resetPassBtn} onClick={() => { setResetId(resetId === teacher._id ? null : teacher._id); setNewPassword(""); }}>Reset Password</button>
                    <button style={s.revokeBtn} onClick={() => reject(teacher._id, teacher.name)}>Revoke Access</button>
                    <button style={s.deleteBtn} onClick={() => deleteTeacher(teacher._id, teacher.name)}>Delete</button>
                  </>
                )}
                {activeTab === "rejected" && (
                  <>
                    <button style={s.approveBtn} onClick={() => approve(teacher._id)}>Reinstate</button>
                    <button style={s.deleteBtn} onClick={() => deleteTeacher(teacher._id, teacher.name)}>Delete</button>
                  </>
                )}
              </div>
              {resetId === teacher._id && (
                <div style={s.resetWrap}>
                  <input style={s.resetInput} type="password" placeholder="Enter new password (min. 4 characters)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <button style={s.resetConfirmBtn} onClick={() => resetPassword(teacher._id)}>Save</button>
                  <button style={s.resetCancelBtn} onClick={() => setResetId(null)}>Cancel</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif", paddingBottom: 40 },
  header: { background: "#1e0a3c", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  headerTop: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4 },
  logoIcon: { width: 32, height: 32, background: "#7c3aed", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#fff", fontWeight: 800 },
  logoText: { fontSize: 16, fontWeight: 700, color: "#f5f3ff" },
  adminBadge: { background: "rgba(124,58,237,0.3)", color: "#c4b5fd", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(124,58,237,0.4)" },
  headerSub: { fontSize: 13, color: "#6d28d9" },
  logoutBtn: { background: "rgba(255,255,255,0.08)", color: "#c4b5fd", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 14px", fontSize: 13, cursor: "pointer" },
  tabsBar: { display: "flex", background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "0 28px" },
  tab: { flex: 1, maxWidth: 160, padding: "14px 0", background: "none", border: "none", borderBottom: "3px solid transparent", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#94a3b8", position: "relative" },
  tabActive: { color: "#0f172a" },
  pendingBubble: { position: "absolute", top: 10, right: 16, background: "#ef4444", color: "#fff", fontSize: 10, fontWeight: 800, padding: "1px 6px", borderRadius: 20, minWidth: 18, textAlign: "center" },
  pendingAlert: { background: "#fffbeb", color: "#92400e", padding: "10px 28px", fontSize: 13, fontWeight: 600, borderBottom: "1px solid #fde68a" },
  body: { maxWidth: 760, margin: "0 auto", padding: "24px 24px 0" },
  filterBar: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 },
  chip: { padding: "6px 14px", borderRadius: 20, border: "1.5px solid #e2e8f0", background: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#475569", display: "flex", alignItems: "center", gap: 6 },
  chipActive: { background: "#4c1d95", color: "#fff", border: "1.5px solid #4c1d95", fontWeight: 700 },
  chipCount: { fontSize: 11, opacity: 0.7 },
  centered: { display: "flex", justifyContent: "center", padding: "60px 0" },
  spinner: { width: 32, height: 32, border: "3px solid #e2e8f0", borderTop: "3px solid #7c3aed", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  emptyWrap: { textAlign: "center", padding: "60px 0" },
  emptyIcon: { fontSize: 48, marginBottom: 14 },
  emptyTitle: { fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" },
  emptyText: { color: "#94a3b8", fontSize: 14, margin: 0 },
  card: { background: "#fff", borderRadius: 14, padding: "18px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" },
  cardTop: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 },
  avatar: { width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, flexShrink: 0 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 2 },
  email: { fontSize: 13, color: "#64748b", marginBottom: 6 },
  meta: { display: "flex", gap: 8, alignItems: "center" },
  deptTag: { background: "#eff6ff", color: "#1d4ed8", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20 },
  dateTag: { fontSize: 12, color: "#94a3b8" },
  actions: { display: "flex", gap: 8, flexWrap: "wrap" },
  approveBtn: { background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  rejectBtn: { background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  resetPassBtn: { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  revokeBtn: { background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  deleteBtn: { background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer" },
  resetWrap: { display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" },
  resetInput: { flex: 1, minWidth: 200, padding: "10px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none" },
  resetConfirmBtn: { background: "#4c1d95", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  resetCancelBtn: { background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", fontSize: 13, cursor: "pointer" },
};

export default AdminDashboard;