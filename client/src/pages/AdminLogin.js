import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("adminToken")) navigate("/admin-dashboard");
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("All fields are required"); return; }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.leftPanel}>
        <div style={s.leftContent}>
          <div style={s.logoWrap}>
            <div style={s.logoIcon}>⚙</div>
            <span style={s.logoText}>AttendanceIQ</span>
          </div>
          <div>
            <h1 style={s.headline}>Administrator Panel</h1>
            <p style={s.subheadline}>Manage teacher accounts, review registration requests, and oversee the system.</p>
          </div>
          <div style={s.capList}>
            {["Review and approve teacher registrations", "Manage department assignments", "Reset teacher passwords", "Monitor system activity"].map((item, i) => (
              <div key={i} style={s.capItem}>
                <div style={s.capDot} />
                <span style={s.capText}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={s.leftFooter}>© 2025 AttendanceIQ · Administrator Access Only</div>
      </div>

      <div style={s.rightPanel}>
        <div style={s.formCard}>
          <div style={s.mobileLogo}>
            <div style={s.mobileLogoIcon}>⚙</div>
            <span style={s.mobileLogoText}>Admin Panel</span>
          </div>
          <div style={s.formHeader}>
            <h2 style={s.formTitle}>Administrator Sign In</h2>
            <p style={s.formSub}>Restricted access — authorized personnel only</p>
          </div>
          {error && (
            <div style={s.errorBox}>
              <div style={s.errorTitle}>⚠ Authentication Failed</div>
              <div style={s.errorMsg}>{error}</div>
            </div>
          )}
          <form onSubmit={login} style={s.form}>
            <div style={s.fieldWrap}>
              <label style={s.label}>Email Address</label>
              <input style={s.input} type="email" placeholder="admin@college.edu" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} autoComplete="email" />
            </div>
            <div style={s.fieldWrap}>
              <label style={s.label}>Password</label>
              <div style={s.pwWrap}>
                <input style={{ ...s.input, paddingRight: 48 }} type={showPassword ? "text" : "password"} placeholder="Enter admin password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} autoComplete="current-password" />
                <button type="button" style={s.eyeBtn} onClick={() => setShowPassword(!showPassword)}>{showPassword ? "🙈" : "👁"}</button>
              </div>
            </div>
            <button type="submit" style={{ ...s.submitBtn, opacity: loading ? 0.75 : 1 }} disabled={loading}>
              {loading ? "Signing in..." : "Sign In as Administrator"}
            </button>
          </form>
          <div style={s.divider} />
          <div style={s.links}>
            <span style={s.link} onClick={() => navigate("/login")}>Teacher Login</span>
            <span style={s.link} onClick={() => navigate("/student-login")}>Student Login</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" },
  leftPanel: { flex: 1, minWidth: 340, background: "linear-gradient(145deg, #1e0a3c 0%, #3b0764 100%)", padding: "56px 56px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  leftContent: { display: "flex", flexDirection: "column", gap: 32 },
  logoWrap: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: { width: 44, height: 44, background: "#7c3aed", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#fff" },
  logoText: { fontSize: 20, fontWeight: 700, color: "#fff" },
  headline: { fontSize: 30, fontWeight: 800, color: "#f5f3ff", margin: "0 0 12px", lineHeight: 1.3 },
  subheadline: { fontSize: 14, color: "#c4b5fd", margin: 0, lineHeight: 1.7 },
  capList: { display: "flex", flexDirection: "column", gap: 14 },
  capItem: { display: "flex", alignItems: "center", gap: 12 },
  capDot: { width: 6, height: 6, background: "#7c3aed", borderRadius: "50%", flexShrink: 0 },
  capText: { fontSize: 14, color: "#ddd6fe" },
  leftFooter: { fontSize: 12, color: "#581c87" },
  rightPanel: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: "40px 24px", minHeight: "100vh" },
  formCard: { background: "#fff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 420, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" },
  mobileLogo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid #f1f5f9" },
  mobileLogoIcon: { width: 34, height: 34, background: "#7c3aed", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800, color: "#fff" },
  mobileLogoText: { fontSize: 16, fontWeight: 700, color: "#0f172a" },
  formHeader: { marginBottom: 24 },
  formTitle: { fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" },
  formSub: { fontSize: 13, color: "#64748b", margin: 0 },
  errorBox: { background: "#fef2f2", borderLeft: "4px solid #ef4444", borderRadius: "0 8px 8px 0", padding: "12px 16px", marginBottom: 20 },
  errorTitle: { fontSize: 13, fontWeight: 700, color: "#991b1b", marginBottom: 4 },
  errorMsg: { fontSize: 13, color: "#991b1b" },
  form: { display: "flex", flexDirection: "column", gap: 18 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  input: { padding: "13px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a", outline: "none", background: "#fff", width: "100%", boxSizing: "border-box" },
  pwWrap: { position: "relative" },
  eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 4 },
  submitBtn: { width: "100%", padding: "14px 0", background: "#4c1d95", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 },
  divider: { height: 1, background: "#f1f5f9", margin: "24px 0 20px" },
  links: { display: "flex", justifyContent: "space-between" },
  link: { fontSize: 13, color: "#7c3aed", cursor: "pointer", fontWeight: 500, textDecoration: "underline" },
};

export default AdminLogin;