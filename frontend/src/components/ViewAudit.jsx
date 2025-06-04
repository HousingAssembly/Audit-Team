export default function ViewAudit({ closeModal, openViewAudit }) {

  const handleClose = (e) => {
      e.preventDefault(); 
      closeModal(); 
  };

  return (
    <form>
      <div className="bg-white rounded-3xl flex flex-col items-center py-4 px-7 mt-[40px] sm:mt-[45px] overflow-y-auto w-[450px] sm:w-[650px] relative">
        <div className="flex flex-row justify-center items-end mt-[5px]">
          <div className="mb-[6px] sm:mb-0">
            <img src="logo.png" alt="Logo" className="object-contain h-10 sm:h-16 w-auto" />
          </div>
          <div className="px-2 text-[25px] sm:text-4xl font-medium">
            <span className="ml-[-8px] text-palette-red font-['Chelsea_Market']">H</span><span className="font-['Chelsea_Market']">ouse</span>
            <span className="text-palette-red font-['Chelsea_Market']">A</span><span className="font-['Chelsea_Market']">udit</span>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 hover:scale-105">
          <button onClick={handleClose}>
            <img src="x.png" alt="X" className="object-contain h-5 sm:h-6 w-auto"/>
          </button>
        </div>
        
        <div className="flex justify-center pb-7 text-[15px] sm:text-xl text-palette-text font-bold mt-[-4px] sm:mt-[-2px]">
          Decent Housing For All
        </div>        
        <div className="text-center text-[18px] sm:text-[25px] mt-[-3px] mb-[10px] font-bold">ENTER PERSONAL INFORMATION</div>

        <div className="flex flex-col space-y-1 py-3 items-left w-full">
          <div className="px-5 text-zinc-700 font-bold text-[15px] sm:text-[17px]">ID Number</div>
          <div className="flex flex-row space-x-2 border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] sm:h-[40px] h-[35px] w-full">
            <input className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]" placeholder="Enter ID Number"/>
          </div>
        </div>

        <div className="flex flex-col space-y-1 py-3 items-left w-full">
          <div className="px-5 text-zinc-700 font-bold text-[15px] sm:text-[17px]">Surname</div>
          <div className="flex flex-row space-x-2 border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] sm:h-[40px] h-[35px] w-full">
            <input className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]" placeholder="Enter Surname"/>
          </div>
        </div>

        <div className="flex flex-col space-y-1 py-3 items-left w-full">
          <div className="px-5 text-zinc-700 font-bold text-[15px] sm:text-[17px]">First Name</div>
          <div className="flex flex-row space-x-2 border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] sm:h-[40px] h-[35px] w-full">
            <input className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]" placeholder="Enter First Name"/>
          </div>
        </div>

        <div className="flex flex-row w-full">
          <div className="flex flex-col space-y-1 py-3 items-left w-full mb-4">
            <div className="px-5 text-zinc-700 font-bold text-[15px] sm:text-[17px]">Date of Birth</div>
            <div className="flex flex-row items-center w-full space-x-2 w-full">
              <div className="flex w-1/4 space-x-2 border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] sm:h-[40px] h-[35px]">
                <input className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]" placeholder="Day"/>
              </div>

              <div className="flex w-2/4 space-x-2 border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] sm:h-[40px] h-[35px]">
                <input className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]" placeholder="Month"/>
              </div>

              <div className="flex w-1/4 space-x-2 border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] sm:h-[40px] h-[35px]">
                <input className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]" placeholder="Year"/>
              </div>
            </div>
          </div>
        </div>
        
        <button className="py-2 w-full bg-red-800 text-white text-[16px] sm:text-[19px] font-bold rounded-full my-4 h-[35px] sm:h-[40px] hover:bg-red-900 mt-[15px] sm:mt-[20px] mb-[8px] sm:mb-[12px]" type="submit">
          <div className="mt-[-3px]">
            VIEW AUDIT
          </div>
        </button>    
      </div>
    </form>
  );
}
