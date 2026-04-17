import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "teacher") navigate("/");
    if (role === "student") navigate("/student-dashboard");
  }, [navigate]);

  const validate = () => {
    if (!email.trim()) return "Email address is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address";
    if (!password) return "Password is required";
    return null;
  };

  const login = async (e) => {
    e.preventDefault();
    setError(""); setErrorType("");
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("teacher", JSON.stringify(res.data.teacher));
      localStorage.setItem("department", res.data.teacher.department);
      navigate("/");
    } catch (err) {
      const status = err.response?.data?.status;
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
      setErrorType(status || "error");
    } finally {
      setLoading(false);
    }
  };

  const errorStyle = errorType === "pending"
    ? { ...s.errorBox, background: "#fffbeb", color: "#92400e", borderLeft: "4px solid #f59e0b" }
    : errorType === "rejected"
    ? { ...s.errorBox, background: "#fef2f2", color: "#991b1b", borderLeft: "4px solid #ef4444" }
    : s.errorBox;

  return (
    <div style={s.page}>
      {/* Left Panel */}
      <div style={s.leftPanel}>
        <div style={s.leftContent}>
          <div style={s.logoWrap}>
            <div style={s.logoIcon}>A</div>
            <span style={s.logoText}>AttendanceIQ</span>
          </div>
          <h1 style={s.headline}>Smart Attendance Management System</h1>
          <p style={s.subheadline}>
            A modern solution for tracking and managing student attendance with real-time insights and analytics.
          </p>
          <div style={s.featureList}>
            {[
              { icon: "⚡", text: "Swipe-based attendance marking" },
              { icon: "📊", text: "Subject-wise analytics & reports" },
              { icon: "🔔", text: "Automatic defaulter detection" },
              { icon: "📁", text: "Excel export & bulk import" },
            ].map((f, i) => (
              <div key={i} style={s.featureItem}>
                <span style={s.featureIcon}>{f.icon}</span>
                <span style={s.featureText}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={s.leftFooter}>
          © 2025 AttendanceIQ · Built with MERN Stack
        </div>
      </div>

      {/* Right Panel */}
      <div style={s.rightPanel}>
        <div style={s.formCard}>
          {/* Mobile Logo */}
          <div style={s.mobileLogo}>
            <div style={s.mobileLogoIcon}>A</div>
            <span style={s.mobileLogoText}>AttendanceIQ</span>
          </div>

          <div style={s.formHeader}>
            <h2 style={s.formTitle}>Teacher Sign In</h2>
            <p style={s.formSub}>Enter your credentials to access the dashboard</p>
          </div>

          {/* Role switch */}
          <div style={s.roleSwitch}>
            <span style={s.roleSwitchText}>Are you a student?</span>
            <button style={s.roleSwitchBtn} onClick={() => navigate("/student-login")}>
              Student Login →
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={errorStyle}>
              <div style={s.errorTitle}>
                {errorType === "pending" ? "⏳ Account Pending Approval" : errorType === "rejected" ? "✗ Account Rejected" : "⚠ Authentication Failed"}
              </div>
              <div style={s.errorMsg}>{error}</div>
              {errorType === "pending" && <div style={s.errorHint}>Your registration is under review. Please contact the administrator.</div>}
              {errorType === "rejected" && <div style={s.errorHint}>Your account has been rejected. Please contact the administrator.</div>}
            </div>
          )}

          <form onSubmit={login} style={s.form}>
            <div style={s.fieldWrap}>
              <label style={s.label}>Email Address</label>
              <input
                style={s.input}
                type="email"
                placeholder="your@college.edu"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                autoComplete="email"
              />
            </div>

            <div style={s.fieldWrap}>
              <label style={s.label}>Password</label>
              <div style={s.pwWrap}>
                <input
                  style={{ ...s.input, paddingRight: 48 }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  autoComplete="current-password"
                />
                <button type="button" style={s.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{ ...s.submitBtn, opacity: loading ? 0.75 : 1 }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={s.divider}><span style={s.dividerText}>New to the system?</span></div>

          <button style={s.registerBtn} onClick={() => navigate("/register")}>
            Register as Teacher
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" },

  // Left Panel
  leftPanel: {
    flex: 1, minWidth: 340,
    background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
    padding: "0 56px",
    display: "flex", flexDirection: "column", justifyContent: "space-between",
    paddingTop: 56, paddingBottom: 32,
  },
  leftContent: { display: "flex", flexDirection: "column", gap: 32 },
  logoWrap: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: {
    width: 44, height: 44, background: "#3b82f6", borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 22, fontWeight: 800, color: "#fff",
  },
  logoText: { fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: 0.3 },
  headline: { fontSize: 32, fontWeight: 800, color: "#f8fafc", margin: 0, lineHeight: 1.3 },
  subheadline: { fontSize: 15, color: "#94a3b8", margin: 0, lineHeight: 1.7 },
  featureList: { display: "flex", flexDirection: "column", gap: 16 },
  featureItem: { display: "flex", alignItems: "center", gap: 14 },
  featureIcon: { fontSize: 18, width: 36, height: 36, background: "rgba(59,130,246,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  featureText: { fontSize: 14, color: "#cbd5e1" },
  leftFooter: { fontSize: 12, color: "#475569" },

  // Right Panel
  rightPanel: {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
    background: "#f8fafc", padding: "40px 24px", minHeight: "100vh",
  },
  formCard: {
    background: "#fff", borderRadius: 20, padding: "40px 36px",
    width: "100%", maxWidth: 420,
    boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
  },
  mobileLogo: {
    display: "flex", alignItems: "center", gap: 10,
    marginBottom: 28, paddingBottom: 24,
    borderBottom: "1px solid #f1f5f9",
  },
  mobileLogoIcon: {
    width: 34, height: 34, background: "#3b82f6", borderRadius: 9,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 17, fontWeight: 800, color: "#fff",
  },
  mobileLogoText: { fontSize: 16, fontWeight: 700, color: "#0f172a" },
  formHeader: { marginBottom: 20 },
  formTitle: { fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" },
  formSub: { fontSize: 14, color: "#64748b", margin: 0 },

  roleSwitch: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "#f8fafc", border: "1px solid #e2e8f0",
    borderRadius: 10, padding: "10px 14px", marginBottom: 20,
  },
  roleSwitchText: { fontSize: 13, color: "#64748b" },
  roleSwitchBtn: { fontSize: 13, color: "#3b82f6", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 },

  errorBox: {
    background: "#fef2f2", borderLeft: "4px solid #ef4444",
    borderRadius: "0 8px 8px 0", padding: "12px 16px", marginBottom: 20,
  },
  errorTitle: { fontSize: 13, fontWeight: 700, marginBottom: 4 },
  errorMsg: { fontSize: 13 },
  errorHint: { fontSize: 12, marginTop: 4, opacity: 0.8 },

  form: { display: "flex", flexDirection: "column", gap: 18 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  input: {
    padding: "13px 14px", borderRadius: 10,
    border: "1.5px solid #e2e8f0", fontSize: 14,
    color: "#0f172a", outline: "none", background: "#fff",
    width: "100%", boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  pwWrap: { position: "relative" },
  eyeBtn: {
    position: "absolute", right: 12, top: "50%",
    transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 4,
  },
  submitBtn: {
    width: "100%", padding: "14px 0",
    background: "#1e293b", color: "#fff",
    border: "none", borderRadius: 12,
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    marginTop: 4, letterSpacing: 0.3,
  },
  divider: {
    display: "flex", alignItems: "center",
    margin: "20px 0", gap: 12,
  },
  dividerText: {
    fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap",
    background: "#fff", padding: "0 8px",
    position: "relative",
  },
  registerBtn: {
    width: "100%", padding: "13px 0",
    background: "#fff", color: "#1e293b",
    border: "1.5px solid #e2e8f0", borderRadius: 12,
    fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
};

export default Login;