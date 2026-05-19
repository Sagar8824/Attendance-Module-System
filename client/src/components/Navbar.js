import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const teacher = JSON.parse(localStorage.getItem("teacher") || "{}");
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const logout = () => {
    localStorage.clear();
    window.location.href = role === "student" ? "/student-login" : "/login";
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    ...s.link,
    ...(isActive(path) ? s.linkActive : {}),
  });

  const teacherLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/swipe-attendance", label: "Mark Attendance" },
    { to: "/subjects", label: "Subjects" },
    { to: "/history", label: "History" },
    { to: "/percentage", label: "Reports" },
    { to: "/add-student", label: "Add Student" },
    { to: "/upload", label: "Import" },
  ];

  const studentLinks = [{ to: "/student-dashboard", label: "My Attendance" }];
  const links = role === "teacher" ? teacherLinks : role === "student" ? studentLinks : [];
  const currentPage = links.find((l) => l.to === location.pathname)?.label || "";

  return (
    <nav style={s.nav}>
      <div style={s.inner}>
        <Link to="/" style={s.brand}>
          <div style={s.brandIcon}>A</div>
          <span style={s.brandText}>AttendanceIQ</span>
        </Link>

        {!isMobile && (
          <div style={s.desktopMenu}>
            {links.map((l) => (
              <Link key={l.to} style={linkStyle(l.to)} to={l.to}>{l.label}</Link>
            ))}
            <div style={s.divider} />
            {role === "teacher" && teacher.department && (
              <div style={s.deptTag}>{teacher.department}</div>
            )}
            <button style={s.logoutBtn} onClick={logout}>Sign Out</button>
          </div>
        )}

        {isMobile && (
          <div style={s.mobileRight}>
            {currentPage && <span style={s.currentPage}>{currentPage}</span>}
            <button style={s.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <span style={s.closeX}>✕</span> : <div style={s.burgerLines}><span style={s.bar} /><span style={s.bar} /><span style={s.bar} /></div>}
            </button>
          </div>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={s.mobileMenu}>
          {role === "teacher" && teacher.name && (
            <div style={s.mobileUserInfo}>
              <div style={s.mobileUserName}>{teacher.name}</div>
              <div style={s.mobileUserMeta}>{teacher.department} Department</div>
            </div>
          )}
          {links.map((l) => (
            <Link key={l.to} style={{ ...s.mobileLink, ...(isActive(l.to) ? s.mobileLinkActive : {}) }} to={l.to} onClick={() => setMenuOpen(false)}>
              {l.label}
              {isActive(l.to) && <span style={s.activeIndicator} />}
            </Link>
          ))}
          <div style={s.mobileDivider} />
          <button style={s.mobileLogout} onClick={logout}>Sign Out</button>
        </div>
      )}
    </nav>
  );
}

const s = {
  nav: { 
    background: "rgba(15, 23, 42, 0.85)", 
    backdropFilter: "blur(12px)", 
    WebkitBackdropFilter: "blur(12px)", 
    position: "sticky", 
    top: 0, 
    zIndex: 100, 
    borderBottom: "1px solid rgba(255,255,255,0.08)", 
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)", 
    fontFamily: "'Inter', sans-serif" 
  },
  inner: { maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" },
  brand: { display: "flex", alignItems: "center", gap: 12, textDecoration: "none" },
  brandIcon: { 
    width: 32, 
    height: 32, 
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", 
    borderRadius: 10, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    fontSize: 16, 
    fontWeight: 800, 
    color: "#fff", 
    flexShrink: 0,
    boxShadow: "0 2px 10px rgba(59, 130, 246, 0.4)"
  },
  brandText: { fontSize: 18, fontWeight: 700, color: "#f8fafc", letterSpacing: 0.3 },
  desktopMenu: { display: "flex", alignItems: "center", gap: 4 },
  link: { 
    color: "#94a3b8", 
    textDecoration: "none", 
    fontSize: 14, 
    padding: "8px 14px", 
    borderRadius: 8, 
    fontWeight: 600, 
    whiteSpace: "nowrap", 
    transition: "all 0.2s ease" 
  },
  linkActive: { 
    color: "#fff", 
    background: "rgba(59, 130, 246, 0.15)",
    boxShadow: "inset 0 0 0 1px rgba(59, 130, 246, 0.3)" 
  },
  divider: { width: 1, height: 24, background: "rgba(255,255,255,0.1)", margin: "0 12px" },
  deptTag: { 
    background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))", 
    color: "#a78bfa", 
    fontSize: 12, 
    fontWeight: 700, 
    padding: "6px 14px", 
    borderRadius: 20, 
    border: "1px solid rgba(139,92,246,0.3)",
    boxShadow: "0 2px 8px rgba(139,92,246,0.15)"
  },
  logoutBtn: { 
    background: "linear-gradient(135deg, #ef4444, #b91c1c)", 
    color: "#fff", 
    border: "none", 
    borderRadius: 8, 
    padding: "8px 16px", 
    fontSize: 13, 
    fontWeight: 700, 
    cursor: "pointer", 
    marginLeft: 12,
    boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
    transition: "transform 0.1s"
  },
  mobileRight: { display: "flex", alignItems: "center", gap: 12 },
  currentPage: { fontSize: 13, color: "#94a3b8", fontWeight: 600 },
  hamburger: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", padding: 8, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 },
  burgerLines: { display: "flex", flexDirection: "column", gap: 4 },
  bar: { display: "block", width: 18, height: 2, background: "#e2e8f0", borderRadius: 2 },
  closeX: { color: "#e2e8f0", fontSize: 18, lineHeight: 1, fontWeight: 400 },
  mobileMenu: { background: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 0 20px" },
  mobileUserInfo: { padding: "16px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 12 },
  mobileUserName: { fontSize: 15, fontWeight: 700, color: "#f8fafc", marginBottom: 4 },
  mobileUserMeta: { fontSize: 13, color: "#94a3b8" },
  mobileLink: { display: "flex", alignItems: "center", justifyContent: "space-between", color: "#94a3b8", textDecoration: "none", fontSize: 15, padding: "12px 24px", fontWeight: 600 },
  mobileLinkActive: { color: "#fff", background: "rgba(59, 130, 246, 0.1)", borderLeft: "4px solid #3b82f6", paddingLeft: 20 },
  activeIndicator: { width: 8, height: 8, background: "#3b82f6", borderRadius: "50%", flexShrink: 0, boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)" },
  mobileDivider: { height: 1, background: "rgba(255,255,255,0.08)", margin: "12px 0" },
  mobileLogout: { width: "calc(100% - 48px)", margin: "8px 24px 0", padding: "12px 0", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", textAlign: "center", boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)" },
};

export default Navbar;