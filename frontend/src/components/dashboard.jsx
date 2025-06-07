import { Link, Outlet, useNavigate } from 'react-router-dom';



export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex flex-col font-['Sumana']">
      
      <div className="flex flex-row"> 
        <div className="w-[297px] bg-palette-red h-[calc(100vh-80px)] fixed bottom-0 left-0">
          <div className="flex flex-col justify-between h-full text-white text-[17px] font-bold p-8">
            <div className="flex flex-row space-x-6 items-start cursor-pointer">
              {/* Top Section */}
              <div className="flex flex-col">
                <Link to="overview">
                  <img src="/overview.png" alt="Overview Icon" className="h-7 w-auto object-contain transition hover:opacity-75" />
                </Link>
                <Link to="upload-audit">
                  <img src="/upload-audit.png" alt="Upload Audit Icon" className="h-5 w-auto object-contain mt-[51px] transition hover:opacity-75" />
                </Link>
                <Link to="view-audit">
                  <img src="/view-audit.png" alt="View Audit Icon" className="h-6 w-auto object-contain mt-[54px] transition hover:opacity-75" />
                </Link>
                <Link to="export">
                  <img src="/export-csv.png" alt="Export CSV Icon" className="h-5 w-auto object-contain mt-[53px] transition hover:opacity-75" />
                </Link>
                <Link to="pending-approvals">
                  <img src="/pending-approval.png" alt="Pending Approvals Icon" className="h-7 w-auto object-contain mt-[52px] transition hover:opacity-75" />
                </Link>
                <Link to="housing-projects">
                  <img src="/housing-projects.png" alt="Housing Projects Icon" className="h-5 w-auto object-contain mt-[52px] transition hover:opacity-75" />
                </Link>
              </div>

              <div className="flex flex-col text-white text-[17px] font-bold">
                <Link to="overview" className="transition hover:opacity-75">Overview</Link>
                <Link to="upload-audit" className="mt-[50px] transition hover:opacity-75">Upload Files</Link>
                <Link to="view-audit" className="mt-[50px] transition hover:opacity-75">View Audits</Link>
                <Link to="export" className="mt-[50px] transition hover:opacity-75">Export CSV</Link>
                <Link to="pending-approvals" className="mt-[50px] transition hover:opacity-75">Pending Approvals</Link>
                <Link to="housing-projects" className="mt-[50px] transition hover:opacity-75">Housing Projects</Link>
              </div>
            </div>

            {/* Bottom Section: Account + Logout */}
            <div className="flex flex-row space-x-6 items-start cursor-pointer mt-8 ml-[-4px]">
              <div className="flex flex-col">
                <Link to="account">
                  <img src="/profile-white.png" alt="Profile Icon" className="h-9 w-auto object-contain mt-[3px] ml-[-4px] transition hover:opacity-75" />
                </Link>
                <button onClick={handleLogout}>
                  <img src="/logout.png" alt="Logout Icon" className="h-7 w-auto object-contain mt-[43px] ml-[1px] transition hover:opacity-75" />
                </button>
              </div>
              <div className="flex flex-col mt-[7px]">
                <Link to="account" className="transition hover:opacity-75">Account</Link>
                <button onClick={handleLogout} className="text-left mt-[50px] transition hover:opacity-75">Logout</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[80px] ml-[297px] min-h-[calc(100vh-80px)] w-[calc(100vw-297px)] bg-palette-dashboard">
        <Outlet />
        </div>
      </div>

      <div className="flex flex-row">
        <div className="ml-[298px] w-[calc(100vw-297px)] h-[84px] flex flex items-center row bg-white shadow-[2px_2px_5px_rgba(0,0,0,0.3)] px-6 mt-[-2px] fixed top-0 left-0">
          <div className="text-[50px] text-zinc-600 font-bold">
            Dashboard
          </div>
          <div className="ml-auto">
            <Link to="/"><img src="/profile.png" alt="Profile Icon" className="object-contain h-[45px] w-auto"/></Link>
          </div>
        </div>
        <div className="bg-white shadow-[2px_2px_5px_rgba(0,0,0,0.3)] py-4 px-6  fixed top-0 left-0 w-[297px]">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center justify-center mb-[-15px] ml-[-6px]">
              <img src="/logo.png" alt="Logo" className="object-contain h-[50px] w-auto mb-[15px]" />
              <div className="text-[31px] flex flex-row">
                <div>
                  <span className="text-palette-red font-['Chelsea_Market']">H</span>
                  <span className="font-['Chelsea_Market']">ouse</span>
                </div>
                <div>
                  <span className="text-palette-red font-['Chelsea_Market']">A</span>
                  <span className="font-['Chelsea_Market']">udit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

  
      </div>

      
    </div>
  );
}
