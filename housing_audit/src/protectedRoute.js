import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.role === "admin") {
        setAuthorized(true);
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
    } finally {
      setChecking(false); // Done checking regardless of outcome
    }
  }, []);

  if (checking) return null; // Or a loading spinner if you want

  if (!authorized) {
    alert("Access denied: Admins only.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
