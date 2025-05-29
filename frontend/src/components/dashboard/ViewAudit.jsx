const Users = ({ id, name, region, priority, period, status, actions, isLast }) => {
  return (
    <div className={`flex flex-row space-x-4 py-4 px-6 ${isLast ? '' : 'border-b border-zinc-700/60'} text-zinc-700 font-bold`}>
      <div className="w-1/3 whitespace-nowrap overflow-hidden truncate">{id}</div>
      <div className="w-1/3 whitespace-nowrap overflow-hidden truncate">{name}</div>
      <div className="w-1/4 whitespace-nowrap overflow-hidden truncate">{region}</div>
      <div className="w-1/3 whitespace-nowrap overflow-hidden truncate">{priority}</div>
      <div className="w-1/3 whitespace-nowrap overflow-hidden truncate">{period}</div>
      <div className="w-1/5 whitespace-nowrap overflow-hidden truncate">{status}</div>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{actions}</div>
    </div>
  );
};

export default function ViewAudit() {
  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">View Audit</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Browse, search, and filter all housing audit records in the system.
      </div>
      
      <div className="py-8">
        <div className="flex flex-col space-y-2 p-6 bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
          <div className="flex flex-row space-x-4">
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 w-2/5 bg-white items-center px-2">
              <img src="/search.png" alt="Search Icon" className="h-4 w-auto object-contain"/>
              <input className="py-2 px-2 w-full outline-none" placeholder="Search by ID or name"/>
            </div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 w-1/5 bg-white items-center px-2">
              <input className="py-2 px-2 w-full outline-none" placeholder="Cape Town"/>
            </div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 w-2/5 bg-white items-center px-2">
              <input className="py-2 px-2 w-full outline-none" placeholder="Disabled/Chronic Illness"/>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white border border-solid border-zinc-700/60">
            <div className="flex flex-row space-x-4 border-b py-4 px-6 border-zinc-700/60 w-full text-zinc-700/60 font-bold">
              <div className="w-1/3">ID</div>
              <div className="w-1/3">Name</div>
              <div className="w-1/4">Region</div>
              <div className="w-1/3">Priority</div>
              <div className="w-1/3">Waiting Period</div>
              <div className="w-1/5">Status</div>
              <div className="w-1/6">Actions</div>
            </div>
            <Users
              id="12345678"
              name="Lucas Romero"
              region="Cape Town"
              priority="Disabled/Chronic Illness"
              period="15 Years"
              status="Active"
              actions="View"
              isLast={false}
            />
            <Users
              id="12345679"
              name="John Doe"
              region="Johannesburg"
              priority="Elderly"
              period="10 Years"
              status="Pending"
              actions="View"
              isLast={false} 
            />
            <Users
              id="12345680"
              name="Jane Smith"
              region="Durban"
              priority="Single Parent"
              period="5 Years"
              status="Active"
              actions="View"
              isLast={true} 
            />
          </div>
          <div className="flex flex-row space-x-4">
            <div className="mr-auto  text-zinc-700/60 font-bold">Showing 3 out of 3 audits</div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-zinc-700/60 bg-white items-center py-2 px-4 font-bold">Previous</div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-black bg-white items-center py-2 px-5 font-bold">1</div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-zinc-700/60 bg-white items-center py-2 px-4 font-bold">Next</div>
          </div>
        </div>
      </div>
    </div>
  );
}
