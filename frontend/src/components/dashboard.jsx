import { Link, Outlet, useNavigate } from 'react-router-dom';



export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col font-['Sumana']">
      <div className="w-full z-10">
        <div className="flex flex-row items-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.50)]">
          <img src="/logo.png" alt="Logo" className="object-contain h-16 w-1/4 bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.50)]"/>
          <div className="text-4xl text-zinc-700 px-6 font-bold">Dashboard</div>
          <div className="ml-auto px-6">
            <Link to="/"><img src="/profile.png" alt="Profile Icon" className="object-contain h-16 w-auto"/></Link>
          </div>
        </div> 
      </div>
      <div className="flex flex-row min-h-[calc(100vh-64px)]"> 
        <div className="w-1/4 bg-palette-red">
          <div className="flex flex-col text-white text-xl font-bold h-full p-8">
            <div className="flex flex-col space-y-12">
              <Link to="overview">
                <div className="flex flex-row space-x-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition">
                  <img src="/overview.png" alt="Overview Icon" className="h-6 w-auto object-contain"/>
                  <div>Overview</div>
                </div>
              </Link>
              <Link to="upload-audit">
                <div className="flex flex-row space-x-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition">
                  <img src="/upload-audit.png" alt="Upload Audit Icon" className="h-6 w-auto object-contain"/>
                  <div>Upload Audit</div> 
                </div>
              </Link>
              <Link to="view-audit">
                <div className="flex flex-row space-x-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition">
                  <img src="/view-audit.png" alt="View Audit Icon" className="h-6 w-auto object-contain"/>
                  <div>View Audits</div>
                </div>
              </Link>
              <Link to="waitlist">
                <div className="flex flex-row space-x-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition">
                  <img src="/waitlist.png" alt="Waitlist Icon" className="h-6 w-auto object-contain"/>
                  <div>Waiting List</div>
                </div>
              </Link>
              <Link to="statistics">
                <div className="flex flex-row space-x-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition">
                  <img src="/statistics.png" alt="Statistics Icon" className="h-6 w-auto object-contain"/>
                  <div>Statistics</div>
                </div>
              </Link>
              <Link to="export">
                <div className="flex flex-row space-x-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition">
                  <img src="/export-csv.png" alt="Export CSV Icon" className="h-6 w-auto object-contain"/>
                  <div>Export CSV</div>
                </div>
              </Link>
              <Link to="pending-approvals">
                <div className="flex flex-row space-x-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition">
                  <img src="/pending-approval.png" alt="Pending Approvals Icon" className="h-6 w-auto object-contain"/>
                  <div>Pending Approvals</div>
                </div>
              </Link>
            </div>
            <div className="mt-auto flex flex-col space-y-12">
              <Link to="account">
                <div className="flex flex-row space-x-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition">
                  <img src="/profile-white.png" alt="Profile Icon" className="h-6 mt-1 w-auto object-contain"/>
                  <div>Account</div>
                </div>
              </Link>
              <div className="flex flex-row space-x-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition cursor-pointer hover:opacity-80 transition" onClick={handleLogout}>
                <img src="/logout.png" alt="logout Icon" className="h-6 w-auto object-contain"/>
                <div>Logout</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-full bg-palette-dashboard">
        <Outlet />
        </div>
      </div>
    </div>
  );
}
