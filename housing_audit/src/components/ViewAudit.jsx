export default function ViewAudit({ closeModal, openViewAudit }) {

  const handleClose = (e) => {
      e.preventDefault(); 
      closeModal(); 
  };

  return (
    <form>
      <div className="bg-white rounded-3xl mt-12 flex flex-col py-6 px-6">
        <div className="flex flex-row justify-center items-end ml-24">
          <img src="logo.png" alt="Logo" className="object-contain h-16 w-auto"/>
          <div className="px-2 text-4xl font-medium"><span className="text-palette-red">H</span>ouse <span className="text-palette-red">A</span>udit</div>
          <div className="flex ml-24 mb-auto">
            <button onClick={handleClose}>
              <img src="x.png" alt="X" className="object-contain h-6 w-auto"/>
            </button>
          </div>
        </div>
        <div className="flex justify-center py-4 text-xl text-palette-text font-medium">Decent Housing For All</div>
        <div className="text-center text-3xl mt-4 mb-2 font-medium">ENTER PERSONAL INFORMATION</div>
        <div className="flex flex-col space-y-2 py-6">
          <div className="px-5 font-medium text-palette-text">ID Number</div>
          <div className="flex flex-row space-x-2 items-center border border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <input className="px-5 py-2 rounded-full" placeholder="0000000000000"/>
          </div>
        </div>
        <div className="flex flex-col space-y-2 py-6">
          <div className="px-5 font-medium text-palette-text">Surname</div>
          <div className="flex flex-row space-x-2 items-center border border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <input className="px-5 py-2 rounded-full" placeholder="Smith"/>
          </div>
        </div>
        <div className="flex flex-col space-y-2 py-6">
          <div className="px-5 font-medium text-palette-text">First Name</div>
          <div className="flex flex-row space-x-2 items-center border border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <input className="px-5 py-2 rounded-full" placeholder="John"/>
          </div>
        </div>
        <button className="py-2 w-full bg-red-800 text-white text-2xl font-medium rounded-full" type="submit">View Audit</button>    
      </div>
    </form>
  );
}