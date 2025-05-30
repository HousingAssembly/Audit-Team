import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import ProtectedRoute from "./protectedRoute";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import Overview from "./components/dashboard/Overview";
import UploadAudit from "./components/dashboard/UploadAudit";
import ViewAudit from "./components/dashboard/ViewAudit";
import Waitlist from "./components/dashboard/Waitlist";
import ExportCSV from "./components/dashboard/ExportCSV";
import PendingApprovals from "./components/dashboard/PendingApprovals";
import HousingProjects from "./components/dashboard/HousingProjects";
import Account from "./components/dashboard/Account";
import ProjectShowcasePage from "./Projects";


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const shouldHideFooterHeader = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        // Token expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Session expired. Please log in again.");
        navigate("/");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {!shouldHideFooterHeader && <Header />}

      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectShowcasePage />} />

        {/* admin only stuff */} 
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="view-audit" element={<ViewAudit />} />
          <Route path="overview" element={<Overview />} />
          <Route path="upload-audit" element={<UploadAudit />} />
          <Route path="waitlist" element={<Waitlist />} />
          <Route path="export" element={<ExportCSV />} />
          <Route path="pending-approvals" element={<PendingApprovals />} />
          <Route path="housing-projects" element={<HousingProjects />} />
          <Route path="account" element={<Account />} />
        </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {!shouldHideFooterHeader && <Footer />}
    </>
  );
}

export default App;
