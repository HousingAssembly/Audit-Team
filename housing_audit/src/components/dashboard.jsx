import { Link, Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col font-['Sumana']">
      <div className="w-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="flex flex-row items-center mx-12">
          <img src="logo.png" alt="Logo" className="object-contain h-16 w-auto"/>
          <div className="px-6 text-4xl font-medium"><span className="text-palette-red">H</span>ouse <span className="text-palette-red">A</span>udit</div>
          <div className="ml-auto">
            <Link to="/"><img src="profile.png" alt="Profile Icon" className="object-contain h-16 w-auto"/></Link>
          </div>
        </div> 
      </div>
      <div className="flex flex-row min-h-[calc(100vh-64px)]"> 
        <div className="w-1/4 bg-palette-red">
          <div className="flex flex-col text-white text-xl font-bold h-full p-8">
            <div className="flex flex-col space-y-12">
              <Link to="overview">
                <div className="flex flex-row space-x-4 flex-shrink-0">
                  <img src="overview.png" alt="Overview Icon" className="h-6 w-auto object-contain"/>
                  <div>Overview</div>
                </div>
              </Link>
              <Link to="upload-audit">
                <div className="flex flex-row space-x-4 flex-shrink-0">
                  <img src="upload-audit.png" alt="Upload Audit Icon" className="h-6 w-auto object-contain"/>
                  <div>Upload Audit</div> 
                </div>
              </Link>
              <Link to="view-audit">
                <div className="flex flex-row space-x-4 flex-shrink-0">
                  <img src="view-audit.png" alt="View Audit Icon" className="h-6 w-auto object-contain"/>
                  <div>View Audits</div>
                </div>
              </Link>
              <Link to="waitlist">
                <div className="flex flex-row space-x-4 flex-shrink-0">
                  <img src="waitlist.png" alt="Waitlist Icon" className="h-6 w-auto object-contain"/>
                  <div>Waiting List</div>
                </div>
              </Link>
              <Link to="statistics">
                <div className="flex flex-row space-x-4 flex-shrink-0">
                  <img src="statistics.png" alt="Statistics Icon" className="h-6 w-auto object-contain"/>
                  <div>Statistics</div>
                </div>
              </Link>
              <Link to="export">
                <div className="flex flex-row space-x-4 flex-shrink-0">
                  <img src="export-csv.png" alt="Export CSV Icon" className="h-6 w-auto object-contain"/>
                  <div>Export CSV</div>
                </div>
              </Link>
              <Link to="pending-approvals">
                <div className="flex flex-row space-x-4 flex-shrink-0">
                  <img src="pending-approval.png" alt="Pending Approvals Icon" className="h-6 w-auto object-contain"/>
                  <div>Pending Approvals</div>
                </div>
              </Link>
            </div>
            <div className="mt-auto flex flex-col space-y-12">
              <Link to="account">
                <div className="flex flex-row space-x-4 flex-shrink-0">
                  <img src="profile-white.png" alt="Profile Icon" className="h-6 w-auto object-contain"/>
                  <div>Account</div>
                </div>
              </Link>
              <div className="flex flex-row space-x-4 flex-shrink-0">
                <img src="logout.png" alt="logout Icon" className="h-6 w-auto object-contain"/>
                <div>Logout</div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
