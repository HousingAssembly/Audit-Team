export default function ExportCSV() {
  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Export CSV</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Export housing audit data to a CSV file.
      </div>
      <div className="flex justify-center h-screen">
        <div className="flex flex-col items-center space-y-4 py-12 w-1/2">
          <div className="flex flex-col py-4 bg-white rounded-lg justify-center items-start border border-zinc-700/30 w-full">
              <div className="text-zinc-700 font-bold text-lg px-8">Date Range</div>
              <div className="flex flex-row">
                <div className="relative flex flex-row space-x-2">
                  <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
                    <img src="/calendar.png" alt="Calendar Icon" className="h-6 w-auto object-contain"/>
                  </div>
                  <input className="text-zinc-700/60 font-bold border border-zinc-700/30 outline-none rounded-md p-2 pl-10 text-lg my-3" placeholder="Start Date"/>
                </div>
                <div className="relative flex flex-row space-x-2">
                  <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
                    <img src="/calendar.png" alt="Calendar Icon" className="h-6 w-auto object-contain"/>
                  </div>
                  <input className="text-zinc-700/60 font-bold border border-zinc-700/30 outline-none rounded-md p-2 pl-10 text-lg my-3" placeholder="End Date"/>
                </div>
              </div>   
              <div className="text-zinc-700 font-bold text-lg px-8">File Name</div>
              <div className="px-2 w-full">
              <input className="text-zinc-700/60 font-bold border border-zinc-700/30 outline-none rounded-md p-2 text-lg my-3 w-full" placeholder="audit-data-from-01-18-09-to-01-25-10"/>
              </div>
          </div>
          <div className="flex justify-between w-full">
              <button className="bg-white border border-zinc-700/50 px-8 py-3 text-zinc-700 font-bold rounded-lg">Clear</button>
              <button className="flex flex-row space-x-4 px-5 py-3 bg-red-800 ml-auto text-white font-bold rounded-lg">
                <img src="/save-changes.png" alt="Save Changes Icon" className="h-6 w-auto object-contain"/>
                <div>Save Changes</div>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}