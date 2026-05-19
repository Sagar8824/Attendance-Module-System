import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DEPARTMENTS = ["IT", "CS", "EC", "ME", "CE", "EE"];

function TeacherRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", department: "IT" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 4) e.password = "Password must be at least 4 characters";
    return e;
  };

  const register = async (e) => {
    e.preventDefault();
    setErrors({});
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/auth/register", form);
      setDone(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  // Success Screen
  if (done) {
    return (
      <div style={s.successPage}>
        <div style={s.successCard}>
          <div style={s.successIconWrap}>
            <div style={s.successIcon}>✓</div>
          </div>
          <h2 style={s.successTitle}>Registration Submitted</h2>
          <p style={s.successSub}>
            Your registration request has been sent to the administrator for review.
            You will be able to log in once your account is approved.
          </p>
          <div style={s.successDetails}>
            <div style={s.detailRow}>
              <span style={s.detailLabel}>Name</span>
              <span style={s.detailValue}>{form.name}</span>
            </div>
            <div style={s.detailRow}>
              <span style={s.detailLabel}>Email</span>
              <span style={s.detailValue}>{form.email}</span>
            </div>
            <div style={s.detailRow}>
              <span style={s.detailLabel}>Department</span>
              <span style={s.detailValue}>{form.department}</span>
            </div>
            <div style={s.detailRow}>
              <span style={s.detailLabel}>Status</span>
              <span style={s.pendingBadge}>⏳ Pending Approval</span>
            </div>
          </div>
          <button style={s.goLoginBtn} onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Left Panel */}
      <div style={s.leftPanel}>
        <div style={s.leftContent}>
          <div style={s.logoWrap}>
            <div style={s.logoIcon}>A</div>
            <span style={s.logoText}>AttendanceIQ</span>
          </div>
          <div>
            <h1 style={s.headline}>Create Your Teacher Account</h1>
            <p style={s.subheadline}>
              Register to access the attendance management dashboard for your department.
            </p>
          </div>
          <div style={s.steps}>
            <div style={s.stepTitle}>How it works</div>
            {[
              { num: "01", title: "Submit Registration", desc: "Fill in your details and submit the form" },
              { num: "02", title: "Admin Review", desc: "Administrator reviews and approves your request" },
              { num: "03", title: "Access Granted", desc: "Log in and start managing attendance" },
            ].map((step) => (
              <div key={step.num} style={s.step}>
                <div style={s.stepNum}>{step.num}</div>
                <div>
                  <div style={s.stepName}>{step.title}</div>
                  <div style={s.stepDesc}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={s.leftFooter}>© 2025 AttendanceIQ · Built with MERN Stack</div>
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
            <h2 style={s.formTitle}>Teacher Registration</h2>
            <p style={s.formSub}>All fields are required to complete your registration</p>
          </div>

          {errors.general && (
            <div style={s.errorBox}>
              <div style={s.errorTitle}>⚠ Registration Failed</div>
              <div style={s.errorMsg}>{errors.general}</div>
            </div>
          )}

          <form onSubmit={register} style={s.form}>
            {/* Full Name */}
            <div style={s.fieldWrap}>
              <label style={s.label}>Full Name</label>
              <input
                style={{ ...s.input, ...(errors.name ? s.inputErr : {}) }}
                placeholder="e.g. Prof. Rahul Sharma"
                value={form.name}
                onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
              />
              {errors.name && <span style={s.errText}>{errors.name}</span>}
            </div>

            {/* Email */}
            <div style={s.fieldWrap}>
              <label style={s.label}>College Email Address</label>
              <input
                style={{ ...s.input, ...(errors.email ? s.inputErr : {}) }}
                type="email"
                placeholder="your@college.edu"
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
              />
              {errors.email && <span style={s.errText}>{errors.email}</span>}
            </div>

            {/* Department */}
            <div style={s.fieldWrap}>
              <label style={s.label}>Department</label>
              <div style={s.deptGrid}>
                {DEPARTMENTS.map((d) => (
                  <button
                    key={d} type="button"
                    style={{ ...s.deptBtn, ...(form.department === d ? s.deptBtnActive : {}) }}
                    onClick={() => setForm({ ...form, department: d })}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div style={s.fieldWrap}>
              <label style={s.label}>Password</label>
              <div style={s.pwWrap}>
                <input
                  style={{ ...s.input, paddingRight: 48, ...(errors.password ? s.inputErr : {}) }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  value={form.password}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: "" }); }}
                />
                <button type="button" style={s.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              {errors.password && <span style={s.errText}>{errors.password}</span>}
            </div>

            <button
              type="submit"
              style={{ ...s.submitBtn, opacity: loading ? 0.75 : 1 }}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </form>

          <div style={s.loginLink}>
            Already have an account?{" "}
            <span style={s.loginLinkBtn} onClick={() => navigate("/login")}>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" },
  successPage: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#f8fafc", padding: "24px 16px", fontFamily: "'Inter', sans-serif",
  },
  successCard: {
    background: "#fff", borderRadius: 20, padding: "48px 40px",
    maxWidth: 460, width: "100%", textAlign: "center",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  },
  successIconWrap: { display: "flex", justifyContent: "center", marginBottom: 24 },
  successIcon: {
    width: 72, height: 72, background: "#f0fdf4", color: "#16a34a",
    borderRadius: "50%", fontSize: 32, display: "flex",
    alignItems: "center", justifyContent: "center",
    border: "2px solid #bbf7d0",
  },
  successTitle: { fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 10px" },
  successSub: { fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: "0 0 28px" },
  successDetails: {
    background: "#f8fafc", border: "1px solid #e2e8f0",
    borderRadius: 12, padding: "16px 20px", marginBottom: 28, textAlign: "left",
  },
  detailRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 0", borderBottom: "1px solid #f1f5f9",
  },
  detailLabel: { fontSize: 13, color: "#64748b" },
  detailValue: { fontSize: 13, fontWeight: 600, color: "#0f172a" },
  pendingBadge: {
    background: "#fffbeb", color: "#92400e", fontSize: 12,
    fontWeight: 700, padding: "4px 12px", borderRadius: 20,
    border: "1px solid #fde68a",
  },
  goLoginBtn: {
    width: "100%", padding: "14px 0", background: "#1e293b", color: "#fff",
    border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer",
  },

  leftPanel: {
    flex: 1, minWidth: 340,
    background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
    padding: "56px 56px 32px",
    display: "flex", flexDirection: "column", justifyContent: "space-between",
  },
  leftContent: { display: "flex", flexDirection: "column", gap: 36 },
  logoWrap: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: {
    width: 44, height: 44, background: "#3b82f6", borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 22, fontWeight: 800, color: "#fff",
  },
  logoText: { fontSize: 20, fontWeight: 700, color: "#fff" },
  headline: { fontSize: 30, fontWeight: 800, color: "#f8fafc", margin: "0 0 12px", lineHeight: 1.3 },
  subheadline: { fontSize: 15, color: "#94a3b8", margin: 0, lineHeight: 1.7 },
  steps: { display: "flex", flexDirection: "column", gap: 20 },
  stepTitle: { fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  step: { display: "flex", alignItems: "flex-start", gap: 16 },
  stepNum: {
    width: 32, height: 32, background: "rgba(59,130,246,0.2)",
    color: "#60a5fa", borderRadius: 8,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: 800, flexShrink: 0,
  },
  stepName: { fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 2 },
  stepDesc: { fontSize: 13, color: "#64748b" },
  leftFooter: { fontSize: 12, color: "#475569" },

  rightPanel: {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
    background: "#f8fafc", padding: "40px 24px", minHeight: "100vh",
  },
  formCard: {
    background: "#fff", borderRadius: 20, padding: "40px 36px",
    width: "100%", maxWidth: 440,
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  },
  mobileLogo: {
    display: "flex", alignItems: "center", gap: 10,
    marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid #f1f5f9",
  },
  mobileLogoIcon: {
    width: 34, height: 34, background: "#3b82f6", borderRadius: 9,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 17, fontWeight: 800, color: "#fff",
  },
  mobileLogoText: { fontSize: 16, fontWeight: 700, color: "#0f172a" },
  formHeader: { marginBottom: 24 },
  formTitle: { fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" },
  formSub: { fontSize: 14, color: "#64748b", margin: 0 },
  errorBox: {
    background: "#fef2f2", borderLeft: "4px solid #ef4444",
    borderRadius: "0 8px 8px 0", padding: "12px 16px", marginBottom: 20,
  },
  errorTitle: { fontSize: 13, fontWeight: 700, color: "#991b1b", marginBottom: 4 },
  errorMsg: { fontSize: 13, color: "#991b1b" },
  form: { display: "flex", flexDirection: "column", gap: 18 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  input: {
    padding: "13px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0",
    fontSize: 14, color: "#0f172a", outline: "none", background: "#fff",
    width: "100%", boxSizing: "border-box",
  },
  inputErr: { borderColor: "#ef4444", background: "#fff5f5" },
  errText: { fontSize: 12, color: "#ef4444" },
  deptGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))", gap: 8 },
  deptBtn: {
    padding: "10px 0", borderRadius: 10, border: "1.5px solid #e2e8f0",
    background: "#f8fafc", fontSize: 14, fontWeight: 600,
    cursor: "pointer", color: "#475569",
  },
  deptBtnActive: { background: "#1e293b", color: "#fff", border: "1.5px solid #1e293b" },
  pwWrap: { position: "relative" },
  eyeBtn: {
    position: "absolute", right: 12, top: "50%",
    transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 4,
  },
  submitBtn: {
    width: "100%", padding: "14px 0", background: "#1e293b", color: "#fff",
    border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
    cursor: "pointer", marginTop: 4,
  },
  loginLink: { fontSize: 13, color: "#64748b", textAlign: "center", marginTop: 20 },
  loginLinkBtn: { color: "#3b82f6", fontWeight: 600, cursor: "pointer", textDecoration: "underline" },
};

export default TeacherRegister;