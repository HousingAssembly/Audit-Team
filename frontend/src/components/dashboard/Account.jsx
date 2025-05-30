export default function Account() {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col items-center space-y-4 w-1/3">
        <div className="text-center text-zinc-700 font-bold py-8 text-4xl mt-8">Account Details</div>
        <div className="flex flex-col py-4 bg-white rounded-lg justify-center items-center border border-zinc-700/30 w-full">
          <div className="flex flex-row p-4">
            <div className="text-zinc-700 font-bold px-4 text-lg">Username</div>
            <input className="text-zinc-700/75 border border-zinc-700/50 outline-none rounded-md px-2 py-1" placeholder="Admin"/>
          </div>
          <div className="flex flex-row p-4">
            <div className="text-zinc-700 font-bold px-4 text-lg">Password</div>
            <input className="text-zinc-700/75 border border-zinc-700/50 outline-none rounded-md px-2 py-1" placeholder="***************"/>
          </div>
        </div>
        <button className="flex flex-row space-x-4 px-5 py-3 bg-red-800 ml-auto text-white font-bold rounded-lg">
          <img src="/save-changes.png" alt="Save Changes Icon" className="h-6 w-auto object-contain"/>
          <div>Save Changes</div>
        </button>
      </div>
    </div>
  );
}
