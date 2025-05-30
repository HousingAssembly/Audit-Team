const Users = ({ projectName, area, cutoffYear, municipality, status, actions, isLast }) => {
  return (
    <div className={`flex flex-row space-x-4 py-4 px-6 ${isLast ? '' : 'border-b border-zinc-700/60'} text-zinc-700 font-bold`}>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{projectName}</div>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{area}</div>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{cutoffYear}</div>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{municipality}</div>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{status}</div>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{actions}</div>
    </div>
  );
};

export default function HousingProjects() {
  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Housing Projects</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Add, remove, or edit housing project details.
      </div>
      <div className="py-8">
        <div className="flex flex-col space-y-2 p-6 bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
          <div className="flex flex-row space-x-4">
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 w-2/5 bg-white items-center px-2">
              <img src="/search.png" alt="Search Icon" className="h-4 w-auto object-contain"/>
              <input className="py-2 px-2 w-full outline-none" placeholder="Search by project name"/>
            </div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 w-1/5 bg-white items-center px-2">
              <input className="py-2 px-2 w-full outline-none" placeholder="Area"/>
            </div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 w-2/5 bg-white items-center px-2">
              <input className="py-2 px-2 w-full outline-none" placeholder="Municipality"/>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white border border-solid border-zinc-700/60">
            <div className="flex flex-row space-x-4 border-b py-4 px-6 border-zinc-700/60 w-full text-zinc-700/60 font-bold">
              <div className="w-1/6">Project Name</div>
              <div className="w-1/6">Area</div>
              <div className="w-1/6">Cutoff Year</div>
              <div className="w-1/6">Municipality</div>
              <div className="w-1/6">Status</div>
              <div className="w-1/6">Actions</div>
            </div>
            <Users
              projectName="The Lucas Project"
              area="Eastern Cape"
              cutoffYear="2006"
              municipality="George Local"
              status="Ongoing"
              actions="15 Years"
              isLast={false}
            />
            <Users
              projectName="The Lucas Project"
              area="Eastern Cape"
              cutoffYear="2006"
              municipality="George Local"
              status="Ongoing"
              actions="10 Years"
              isLast={false}
            />
            <Users
              projectName="The Lucas Project"
              area="Eastern Cape"
              cutoffYear="2006"
              municipality="George Local"
              status="Ongoing"
              actions="5 Years"
              isLast={true}
            />
          </div>
          <div className="flex flex-row space-x-4">
            <div className="mr-auto  text-zinc-700/60 font-bold">Showing 3 out of 3 housing projects</div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-zinc-700/60 bg-white items-center py-2 px-4 font-bold">Previous</div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-black bg-white items-center py-2 px-5 font-bold">1</div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-zinc-700/60 bg-white items-center py-2 px-4 font-bold">Next</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-screen mt-8">
        <div className="flex flex-col items-center space-y-4 w-1/2">
          <div className="flex flex-col py-4 bg-white rounded-lg justify-center items-end border border-zinc-700/30 w-full">
            <div className="mr-auto px-4 text-zinc-700 font-bold text-4xl px-8 py-4">Add New Housing Project</div>
            <div className="mr-auto px-4 text-zinc-700/75 font-bold text-xl px-8">Enter the details for the new housing project.</div>
            <div className="flex flex-row p-4 mt-4">
              <div className="text-zinc-700 font-bold px-4 text-lg">Project Name</div>
              <input className="text-zinc-700/75 border border-zinc-700/50 outline-none rounded-md px-2 py-1 mr-28"/>
            </div>
            <div className="flex flex-row p-4">
              <div className="text-zinc-700 font-bold px-4 text-lg">Area</div>
              <input className="text-zinc-700/75 border border-zinc-700/50 outline-none rounded-md px-2 py-1 mr-28"/>
            </div>
            <div className="flex flex-row p-4">
              <div className="text-zinc-700 font-bold px-4 text-lg">Cutoff Year</div>
              <input className="text-zinc-700/75 border border-zinc-700/50 outline-none rounded-md px-2 py-1 mr-28"/>
            </div>
            <div className="flex flex-row p-4">
              <div className="text-zinc-700 font-bold px-4 text-lg">Municipality</div>
              <input className="text-zinc-700/75 border border-zinc-700/50 outline-none rounded-md px-2 py-1 mr-28"/>
            </div>
            <div className="flex flex-row p-4">
              <div className="text-zinc-700 font-bold px-4 text-lg">Status</div>
              <input className="text-zinc-700/75 border border-zinc-700/50 outline-none rounded-md px-2 py-1 mr-28"/>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <button className="bg-white border border-zinc-700/50 px-8 py-3 text-zinc-700 font-bold rounded-lg">Clear</button>
            <button className="bg-red-800 px-5 py-3 text-white font-bold rounded-lg">Add Project</button>
          </div>
        </div>
      </div>
    </div>
  );
}
