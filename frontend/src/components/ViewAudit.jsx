export default function ViewAudit({ closeModal, openViewAudit }) {

  const handleClose = (e) => {
      e.preventDefault(); 
      closeModal(); 
  };

  return (
    <form>
      <div className="bg-white rounded-3xl flex flex-col items-center py-4 px-6 mt-6 overflow-y-auto max-w-[720px] relative">
        <div className="absolute top-4 right-4">
          <button onClick={handleClose}>
            <img src="x.png" alt="X" className="object-contain h-6 w-auto"/>
          </button>
        </div>

        <div className="flex flex-row justify-center items-end ml-24">
          <img src="logo.png" alt="Logo" className="object-contain h-16 w-auto"/>
          <div className="px-2 text-4xl font-medium"><span className="text-palette-red">H</span>ouse <span className="text-palette-red">A</span>udit</div>
        </div>
        <div className="flex justify-center py-4 text-xl text-palette-text font-medium">Decent Housing For All</div>
        <div className="text-center text-3xl mt-4 mb-2 font-bold">ENTER PERSONAL INFORMATION</div>

        <div className="flex flex-col space-y-2 py-4 items-left w-full">
          <div className="px-5 text-zinc-700 font-bold text-lg">ID Number</div>
          <div className="flex flex-row space-x-2 border border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full">
            <input className="px-5 py-2 rounded-full w-full outline-none" placeholder="0000000000000"/>
          </div>
        </div>

        <div className="flex flex-col space-y-2 py-4 items-left w-full">
          <div className="px-5 text-zinc-700 font-bold text-lg">Surname</div>
          <div className="flex flex-row space-x-2 items-center border border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full">
            <input className="px-5 py-2 rounded-full w-full outline-none" placeholder="Smith"/>
          </div>
        </div>

        <div className="flex flex-col space-y-2 py-4 items-left w-full">
          <div className="px-5 text-zinc-700 font-bold text-lg">First Name</div>
          <div className="flex flex-row space-x-2 items-center border border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full">
            <input className="px-5 py-2 rounded-full w-full outline-none" placeholder="John"/>
          </div>
        </div>

        <div className="flex flex-row w-full">
          <div className="flex flex-col space-y-2 py-4 items-left w-full mb-4">
            <div className="px-5 text-zinc-700 font-bold text-lg">Date of Birth</div>
            <div className="flex flex-row items-center w-full space-x-2 w-full">
              <div className="flex w-1/4 space-x-2 items-center border border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <input className="px-5 py-2 rounded-full w-full outline-none" placeholder="22"/>
              </div>

              <div className="flex w-2/4 space-x-2 items-center border border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <input className="px-5 py-2 rounded-full w-full outline-none" placeholder="September"/>
              </div>

              <div className="flex w-1/4 space-x-2 items-center border border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <input className="px-5 py-2 rounded-full w-full outline-none" placeholder="1995"/>
              </div>
            </div>
          </div>
        </div>

        <button className="py-2 w-full bg-red-800 text-white text-2xl font-medium rounded-full my-4" type="submit">View Audit</button>    
      </div>
    </form>
  );
}
