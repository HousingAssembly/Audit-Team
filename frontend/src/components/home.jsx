import { useState } from 'react';
import ViewAudit from './ViewAudit';

export default function Home() { 

  const [isViewAuditOpen, setIsViewAuditOpen] = useState(false);

  const closeModal = () => {
    setIsViewAuditOpen(false); 
  };

  const openViewAudit = () => {
    setIsViewAuditOpen(!isViewAuditOpen);
  }

  return ( 
    <div className="flex flex-col space-y-20 w-full pt-12">
      <div className="flex flex-row mx-12 justify-center items-center">
        <div className="w-1/2 text-center pl-20">
          <img src="housing-landing.png" alt="Houses" className="object-contain w-[600px] h-auto inline-block -mt-12 ml-10"/>
        </div>
        <div className="w-1/2 text-center">
          <div className="flex flex-col justify-center items-center">
            <div class="w-[498px] h-[504px] text-center justify-center text-zinc-700 text-8xl font-bold font-['Sumana'] leading-[155px]">DECENT HOUSING FOR ALL</div>
            <button className="flex bg-palette-red font-medium text-[25px] text-white px-6 py-2 rounded-xl m-4 items-center justify-center" onClick={() => setIsViewAuditOpen(true)}>
              <span className="font-bold mr-2 -mt-1">View Audit</span>
              <img src="arrow-right.svg" alt="Arrow" className="w-6 h-6 ml-1 inline-block" />
            </button>
          </div>        
        </div>
      </div>
      <div className="relative w-full overflow-x-hidden overflow-y-visible bg-white">
        <div className="min-h-screen overflow-x-hidden">
          <div className="h-12 bg-white"/>
          <section id="about" className="scroll-mt-[10vw]">
            <div className="skew-y-3 bg-palette-red">
              <div className="-skew-y-3 max-w-7xl mx-auto px-6 py-40 text-white flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-2/3 space-y-8 text-[20px] leading-[3rem]">
                  <p>
                    HouseAudit is a digital platform developed by Housing Assembly, a
                    grassroots movement serving over 20 communities across the 
                    Western Cape. Built to address long-standing challenges in housing 
                    distribution, HouseAudit brings transparency, accountability, and 
                    fairness to the audit process through simple, accessible technology.
                  </p>
                  <p>
                    Our platform enables Housing Assembly to digitally capture, organize, 
                    and monitor audit data—allowing communities to see which housing 
                    projects are completed, which remain pending, and how long 
                    individuals have been waiting. By replacing fragmented paperwork 
                    with a centralized system, HouseAudit empowers communities to 
                    track progress and hold decision-makers accountable.
                  </p>
                </div>
                <div className="w-full md:w-1/3 text-center font-bold text-[48px] mt-12 md:mt-0">
                  ABOUT US
                </div>
              </div>
            </div>
          </section>
          <section id="contact" className="scroll-mt-[7vw]">
            <div className="relative">
              <div className="absolute z-20 left-1/2 -translate-x-1/2 top-[-40px] rotate-[2.5deg] bg-black text-white px-12 py-24 w-[90%] max-w-5xl rounded-md shadow-lg">
                <div className="text-center text-5xl font-bold -rotate-[2.5deg]">CONTACT</div>
                <div className="flex flex-col items-center justify-around items-start gap-12 -rotate-[2.5deg]">
                  <div className="flex gap-4 mt-24 items-center">
                    <img src="email.png" alt="Email Icon" className="h-14 w-auto object-contain"/>
                    <span className="ml-8 text-xl">info@housingassembly.org.za</span>
                  </div>
                  <div className="flex transform -translate-x-[35px]">
                    <img src="location.png" alt="Pin Icon" className="h-16 mr-2 w-auto object-contain"/>
                    <div className="text-xl leading-loose ml-12">
                      <div className="font-semibold">Community House:</div>
                      <div>
                        41 Salt River Road,<br />
                        Salt River,<br />
                        Cape Town,<br />
                        South Africa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="h-[650px] bg-white" />
        </div>

        {isViewAuditOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center">
            <ViewAudit openViewAudit={openViewAudit} closeModal={closeModal}/>
          </div>
        )}

      </div>
    </div>
  );
}