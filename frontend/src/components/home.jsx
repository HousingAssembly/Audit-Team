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
      <div className="flex flex-col xl:flex-row mx-12 justify-center items-center">
        <div className="w-full sm:w-1/2 text-center sm:pl-20 mx-auto">
          <img 
            src="housing-landing.png" 
            alt="Houses" 
            className="object-contain w-auto min-w-[300px] h-auto inline-block -mt-13 ml-0 sm:ml-10"
          />
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

      <div className="relative w-full overflow-hidden overflow-visible bg-white">
        <div className="min-h-screen">
          <div className="bg-white"/>
          <section id="about" className="relative w-full scroll-mt-[-30px]">
            <div className="absolute inset-0 skew-y-6 overflow-hidden z-0 h-[1000px] w-full">
              <img
                src="protest-image.png"
                alt="Protest"
                className="w-full h-[1000px] object-cover"
              />
            </div>
            
            <div className="absolute inset-0 skew-y-6 bg-palette-red h-[1400px] sm:h-[1000px] opacity-90 z-10"></div>
            <div className="relative z-20 skew-y-6">
              <div className="-skew-y-6 max-w-7xl mx-auto px-6 py-20 text-white flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/3 text-center font-bold text-[48px] mb-12 md:mt-0 tracking-wider">
                  ABOUT US
                </div>
                <div className="w-full md:w-2/3 space-y-8 text-[25px] leading-[3rem] ">
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
              </div>
            </div>
          </section>
          <section id="contact" className="scroll-mt-[4vw]">
            <div className="relative flex justify-center px-4 sm:px-12">
              <div className="relative z-20 bg-black text-white py-24 w-full max-w-4xl rounded-md shadow-lg transform rotate-6">
                <div className="text-center text-5xl font-bold -rotate-[6deg] tracking-wider">CONTACT</div>

                <div className="mt-16 transform -rotate-6 px-12 sm:px-12">
                  <div className="flex flex-row gap-10 items-start sm:justify-center text-center sm:text-left">
                    <div className="flex flex-col items-center sm:items-end gap-16">
                      <img src="email.png" alt="Email Icon" className="h-10 min-w-[42px] object-contain" />
                      <img src="location.png" alt="Pin Icon" className="h-14 w-auto object-contain mr-1" />
                    </div>

                    <div className="flex flex-col gap-12 text-xl leading-loose">
                      <div>info@housingassembly.org.za</div>
                      <div>
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
            </div>
          </section>
          <div className="h-[100px] bg-white" />
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