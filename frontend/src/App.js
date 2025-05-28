import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import Overview from "./components/dashboard/Overview";
import UploadAudit from "./components/dashboard/UploadAudit";
import ViewAudit from "./components/dashboard/ViewAudit";
import Waitlist from "./components/dashboard/Waitlist";
import Statistics from "./components/dashboard/Statistics";
import ExportCSV from "./components/dashboard/ExportCSV";
import PendingApprovals from "./components/dashboard/PendingApprovals";
import Account from "./components/dashboard/Account";
import ProjectShowcasePage from "./Projects";


function App() {
  const location = useLocation();
  const shouldHideFooterHeader = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!shouldHideFooterHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectShowcasePage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="view-audit" element={<ViewAudit />} />
          <Route path="overview" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
          <Route path="upload-audit" element={<ProtectedRoute><UploadAudit /></ProtectedRoute>} />
          <Route path="waitlist" element={<ProtectedRoute><Waitlist /></ProtectedRoute>} />
          <Route path="statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
          <Route path="export" element={<ProtectedRoute><ExportCSV /></ProtectedRoute>} />
          <Route path="pending-approvals" element={<ProtectedRoute><PendingApprovals /></ProtectedRoute>} />
          <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        </Route>
      </Routes>

      {!shouldHideFooterHeader && <Footer />}
    </>
  );
}

export default App;
