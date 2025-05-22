export default function Home() { 
  return ( 
    <div className="flex flex-col space-y-24 w-full py-12">
      <div className="flex flex-row mx-12 justify-center items-center">
        <div className="w-1/2 text-center">
          <img src="house-landing.png" alt="Houses" className="object-contain h-128 w-auto"/>
        </div>
        <div className="w-1/2 text-center">
          <div className="flex flex-col space-y-24 justify-center items-center">
            <div className="text-palette-text text-[92px] font-normal max-w-[540px]">DECENT HOUSING FOR ALL</div>
            <button className="flex bg-palette-red font-medium text-2xl text-white px-6 py-1 rounded-lg m-4 items-center justify-center">View Audit<span className="text-4xl mb-1">→</span></button>
          </div>        
        </div>
      </div>
      <div className="relative w-full overflow-x-hidden overflow-y-visible bg-white">
        <div className="min-h-screen overflow-x-hidden">
          <div className="h-16 bg-white" />
          <div className="skew-y-3 bg-palette-red">
            <div className="-skew-y-3 max-w-7xl mx-auto px-6 py-24 text-white flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-2/3 space-y-8 text-[20px] leading-[3rem]">
                <p>
                  HouseAudit is a digital platform developed by Housing Assembly, a grassroots movement
                  serving over 20 communities across the Western Cape. Built to address long-standing
                  challenges in housing distribution, HouseAudit brings transparency, accountability, and fairness
                  to the audit process through simple, accessible technology.
                </p>
                <p>
                  Our platform enables Housing Assembly to digitally capture, organize, and monitor audit data—
                  allowing communities to see which housing projects are completed, which remain pending,
                  and how long individuals have been waiting. By replacing fragmented paperwork with a
                  centralized system, HouseAudit empowers communities to track progress and hold decision-makers accountable.
                </p>
              </div>
              <div className="w-full md:w-1/3 text-center font-bold text-[48px] mt-12 md:mt-0">
                ABOUT US
              </div>
            </div>
          </div>
          <div className="h-16 bg-white" />
        </div>
      </div>
    </div>
  );
}