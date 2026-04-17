import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const navigate = useNavigate();
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const student = localStorage.getItem("student");
    const role = localStorage.getItem("role");
    if (student && role === "student") navigate("/student-dashboard");
    if (role === "teacher") navigate("/");
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    if (!rollNumber.trim()) { setError("Roll number is required"); return; }
    if (!password) { setError("Password is required"); return; }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/student-auth/login", { rollNumber, password });
      localStorage.setItem("role", "student");
      localStorage.setItem("student", JSON.stringify(res.data.student));
      navigate("/student-dashboard");
    } catch (err) {
      if (err.response?.status === 404) setError("Roll number not found. Please contact your teacher.");
      else if (err.response?.status === 401) setError("Incorrect password. Please try again.");
      else setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.leftPanel}>
        <div style={s.leftContent}>
          <div style={s.logoWrap}>
            <div style={s.logoIcon}>A</div>
            <span style={s.logoText}>AttendanceIQ</span>
          </div>
          <div>
            <h1 style={s.headline}>Student Portal</h1>
            <p style={s.subheadline}>View your attendance records, track your progress, and stay informed about your academic performance.</p>
          </div>
          <div style={s.featureList}>
            {[
              { icon: "📊", text: "Subject-wise attendance breakdown" },
              { icon: "📅", text: "Date-wise attendance history" },
              { icon: "🔔", text: "Instant defaulter alerts" },
              { icon: "📷", text: "Upload your profile photo" },
            ].map((f, i) => (
              <div key={i} style={s.featureItem}>
                <span style={s.featureIcon}>{f.icon}</span>
                <span style={s.featureText}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={s.leftFooter}>© 2025 AttendanceIQ · Built with MERN Stack</div>
      </div>

      <div style={s.rightPanel}>
        <div style={s.formCard}>
          <div style={s.mobileLogo}>
            <div style={s.mobileLogoIcon}>A</div>
            <span style={s.mobileLogoText}>AttendanceIQ</span>
          </div>
          <div style={s.formHeader}>
            <h2 style={s.formTitle}>Student Sign In</h2>
            <p style={s.formSub}>Use your roll number and password to access your portal</p>
          </div>
          <div style={s.roleSwitch}>
            <span style={s.roleSwitchText}>Are you a teacher?</span>
            <button style={s.roleSwitchBtn} onClick={() => navigate("/login")}>Teacher Login →</button>
          </div>
          {error && (
            <div style={s.errorBox}>
              <div style={s.errorTitle}>⚠ Sign In Failed</div>
              <div style={s.errorMsg}>{error}</div>
            </div>
          )}
          <form onSubmit={login} style={s.form}>
            <div style={s.fieldWrap}>
              <label style={s.label}>Roll Number</label>
              <input style={s.input} type="text" placeholder="e.g. 21IT001" value={rollNumber} onChange={(e) => { setRollNumber(e.target.value); setError(""); }} autoComplete="username" />
            </div>
            <div style={s.fieldWrap}>
              <label style={s.label}>Password</label>
              <div style={s.pwWrap}>
                <input style={{ ...s.input, paddingRight: 48 }} type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} autoComplete="current-password" />
                <button type="button" style={s.eyeBtn} onClick={() => setShowPassword(!showPassword)}>{showPassword ? "🙈" : "👁"}</button>
              </div>
            </div>
            <button type="submit" style={{ ...s.submitBtn, opacity: loading ? 0.75 : 1 }} disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p style={s.helpText}>Forgot your password? Please contact your class teacher.</p>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" },
  leftPanel: { flex: 1, minWidth: 340, background: "linear-gradient(145deg, #0c1a2e 0%, #1a3a5c 100%)", padding: "56px 56px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  leftContent: { display: "flex", flexDirection: "column", gap: 32 },
  logoWrap: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: { width: 44, height: 44, background: "#3b82f6", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#fff" },
  logoText: { fontSize: 20, fontWeight: 700, color: "#fff" },
  headline: { fontSize: 30, fontWeight: 800, color: "#f8fafc", margin: "0 0 12px", lineHeight: 1.3 },
  subheadline: { fontSize: 14, color: "#93c5fd", margin: 0, lineHeight: 1.7 },
  featureList: { display: "flex", flexDirection: "column", gap: 16 },
  featureItem: { display: "flex", alignItems: "center", gap: 14 },
  featureIcon: { fontSize: 18, width: 36, height: 36, background: "rgba(59,130,246,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  featureText: { fontSize: 14, color: "#bfdbfe" },
  leftFooter: { fontSize: 12, color: "#1e40af" },
  rightPanel: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: "40px 24px", minHeight: "100vh" },
  formCard: { background: "#fff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 420, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" },
  mobileLogo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid #f1f5f9" },
  mobileLogoIcon: { width: 34, height: 34, background: "#3b82f6", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800, color: "#fff" },
  mobileLogoText: { fontSize: 16, fontWeight: 700, color: "#0f172a" },
  formHeader: { marginBottom: 20 },
  formTitle: { fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" },
  formSub: { fontSize: 14, color: "#64748b", margin: 0 },
  roleSwitch: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", marginBottom: 20 },
  roleSwitchText: { fontSize: 13, color: "#64748b" },
  roleSwitchBtn: { fontSize: 13, color: "#3b82f6", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 },
  errorBox: { background: "#fef2f2", borderLeft: "4px solid #ef4444", borderRadius: "0 8px 8px 0", padding: "12px 16px", marginBottom: 20 },
  errorTitle: { fontSize: 13, fontWeight: 700, color: "#991b1b", marginBottom: 4 },
  errorMsg: { fontSize: 13, color: "#991b1b" },
  form: { display: "flex", flexDirection: "column", gap: 18 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  input: { padding: "13px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a", outline: "none", background: "#fff", width: "100%", boxSizing: "border-box" },
  pwWrap: { position: "relative" },
  eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 4 },
  submitBtn: { width: "100%", padding: "14px 0", background: "#0c1a2e", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 },
  helpText: { fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 20, marginBottom: 0 },
};

export default StudentLogin;