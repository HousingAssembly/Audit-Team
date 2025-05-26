import { Routes, Route, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();
  const shouldHideFooterHeader = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!shouldHideFooterHeader && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="upload-audit" element={<UploadAudit />} />
          <Route path="view-audit" element={<ViewAudit />} />
          <Route path="waitlist" element={<Waitlist />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="export" element={<ExportCSV />} />
          <Route path="pending-approvals" element={<PendingApprovals />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>

      {!shouldHideFooterHeader && <Footer />}
    </>
  );
}

export default App;
