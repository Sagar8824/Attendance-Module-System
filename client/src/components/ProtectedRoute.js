import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const student = localStorage.getItem("student");

  // Student route check
  if (allowedRole === "student") {
    if (!student) return <Navigate to="/student-login" />;
    return children;
  }

  // Teacher route check
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && role !== allowedRole) {
    if (role === "student") return <Navigate to="/student-dashboard" />;
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;