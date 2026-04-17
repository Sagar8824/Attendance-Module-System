import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Teacher Pages
import TeacherRegister from "./pages/TeacherRegister";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AttendancePage from "./pages/AttendancePage";
import AttendanceHistory from "./pages/AttendanceHistory";
import AttendancePercentage from "./pages/AttendancePercentage";
import AddStudent from "./pages/AddStudent";
import UploadStudents from "./pages/UploadStudents";
import UploadZip from "./pages/UploadZip";

// New Pages
import SwipeAttendance from "./pages/SwipeAttendance";
import AttendanceSummary from "./pages/AttendanceSummary";
import ManageSubjects from "./pages/ManageSubjects";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";           // ✅ Naya
import AdminDashboard from "./pages/AdminDashboard";   // ✅ Naya

// Student Pages
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";

// Navbar hide karne wale routes
const HIDE_NAVBAR_ROUTES = [
  "/login",
  "/register",
  "/student-login",
  "/swipe-attendance",
  "/admin-login",      // ✅ Naya
  "/admin-dashboard",  // ✅ Naya
];

function Layout() {
  const location = useLocation();
  const hideNavbar = HIDE_NAVBAR_ROUTES.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* ── Auth Routes ── */}
        <Route path="/register" element={<TeacherRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />

        {/* ── Admin Routes ── */}
        <Route path="/admin-login" element={<AdminLogin />} />           {/* ✅ Naya */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />   {/* ✅ Naya */}

        {/* ── Teacher Routes (Protected) ── */}
        <Route path="/" element={
          <ProtectedRoute allowedRole="teacher"><Dashboard /></ProtectedRoute>
        } />

        <Route path="/attendance" element={
          <ProtectedRoute allowedRole="teacher"><AttendancePage /></ProtectedRoute>
        } />

        <Route path="/swipe-attendance" element={
          <ProtectedRoute allowedRole="teacher"><SwipeAttendance /></ProtectedRoute>
        } />

        <Route path="/attendance-summary" element={
          <ProtectedRoute allowedRole="teacher"><AttendanceSummary /></ProtectedRoute>
        } />

        <Route path="/history" element={
          <ProtectedRoute allowedRole="teacher"><AttendanceHistory /></ProtectedRoute>
        } />

        <Route path="/percentage" element={
          <ProtectedRoute allowedRole="teacher"><AttendancePercentage /></ProtectedRoute>
        } />

        <Route path="/add-student" element={
          <ProtectedRoute allowedRole="teacher"><AddStudent /></ProtectedRoute>
        } />

        <Route path="/upload" element={
          <ProtectedRoute allowedRole="teacher"><UploadStudents /></ProtectedRoute>
        } />

        <Route path="/upload-zip" element={
          <ProtectedRoute allowedRole="teacher"><UploadZip /></ProtectedRoute>
        } />

        <Route path="/subjects" element={
          <ProtectedRoute allowedRole="teacher"><ManageSubjects /></ProtectedRoute>
        } />

        {/* ── Student Routes (Protected) ── */}
        <Route path="/student-dashboard" element={
          <ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>
        } />

        {/* ── 404 Fallback ── */}
        <Route path="*" element={
          <div style={styles.notFound}>
            <h2 style={styles.notFoundTitle}>404</h2>
            <p style={styles.notFoundSub}>Yeh page exist nahi karta</p>
            <a href="/" style={styles.notFoundLink}>Home pe wapas jao</a>
          </div>
        } />

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

const styles = {
  notFound: { minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", textAlign: "center" },
  notFoundTitle: { fontSize: 80, fontWeight: 800, color: "#1a1a2e", margin: 0 },
  notFoundSub: { fontSize: 18, color: "#888", margin: "8px 0 24px" },
  notFoundLink: { background: "#1a1a2e", color: "#fff", padding: "12px 28px", borderRadius: 10, textDecoration: "none", fontSize: 15, fontWeight: 600 },
};

export default App;