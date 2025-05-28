import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user || user.role !== "admin") {
        throw new Error("Invalid or missing credentials");
      }

      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        throw new Error("Token expired");
      }

      setAuthorized(true);
    } catch (err) {
      console.warn("Access denied:", err.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setChecking(false);
    }
  }, []);

  if (checking) return null; // Or a loading spinner

  if (!authorized) {
;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
