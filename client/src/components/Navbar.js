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
  nav: { background: "#0f172a", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 0 rgba(255,255,255,0.06)", fontFamily: "'Inter', sans-serif" },
  inner: { maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" },
  brand: { display: "flex", alignItems: "center", gap: 10, textDecoration: "none" },
  brandIcon: { width: 30, height: 30, background: "#3b82f6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#fff", flexShrink: 0 },
  brandText: { fontSize: 16, fontWeight: 700, color: "#f8fafc", letterSpacing: 0.2 },
  desktopMenu: { display: "flex", alignItems: "center", gap: 2 },
  link: { color: "#64748b", textDecoration: "none", fontSize: 13, padding: "6px 12px", borderRadius: 8, fontWeight: 500, whiteSpace: "nowrap", transition: "all 0.15s" },
  linkActive: { color: "#f8fafc", background: "rgba(255,255,255,0.08)" },
  divider: { width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 8px" },
  deptTag: { background: "rgba(59,130,246,0.15)", color: "#60a5fa", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(59,130,246,0.2)" },
  logoutBtn: { background: "rgba(239,68,68,0.1)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginLeft: 6 },
  mobileRight: { display: "flex", alignItems: "center", gap: 12 },
  currentPage: { fontSize: 13, color: "#64748b", fontWeight: 500 },
  hamburger: { background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 },
  burgerLines: { display: "flex", flexDirection: "column", gap: 5 },
  bar: { display: "block", width: 20, height: 2, background: "#94a3b8", borderRadius: 2 },
  closeX: { color: "#94a3b8", fontSize: 17, lineHeight: 1, fontWeight: 300 },
  mobileMenu: { background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 0 16px" },
  mobileUserInfo: { padding: "14px 24px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 8 },
  mobileUserName: { fontSize: 14, fontWeight: 700, color: "#f8fafc", marginBottom: 2 },
  mobileUserMeta: { fontSize: 12, color: "#475569" },
  mobileLink: { display: "flex", alignItems: "center", justifyContent: "space-between", color: "#64748b", textDecoration: "none", fontSize: 14, padding: "11px 24px", fontWeight: 500 },
  mobileLinkActive: { color: "#f8fafc", background: "rgba(255,255,255,0.05)" },
  activeIndicator: { width: 6, height: 6, background: "#3b82f6", borderRadius: "50%", flexShrink: 0 },
  mobileDivider: { height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 0" },
  mobileLogout: { width: "calc(100% - 48px)", margin: "4px 24px 0", padding: "11px 0", background: "rgba(239,68,68,0.1)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", textAlign: "center" },
};

export default Navbar;