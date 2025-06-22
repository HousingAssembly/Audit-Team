import ViewAudit from "./ViewAuditGuest";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [isViewAuditOpen, setIsViewAuditOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const closeModal = () => {
    setIsViewAuditOpen(false);
  }; // or import.meta.env.VITE_REACT_APP_BASE_URL

  return (
    <>
      {isViewAuditOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start py-10 overflow-y-auto">
          <ViewAudit
            openViewAudit={() => setIsViewAuditOpen(true)}
            closeModal={closeModal}
          />
        </div>
      )}

      <div className="flex flex-col space-y-20 w-full pt-11 sm:pt-12 overflow-hidden">
        <div className="flex flex-col lg:flex-row mx-12 justify-center items-center">
          <div className="w-full lg:w-1/2 text-center md:pl-2 mx-auto">
            <img
              src="housing-landing.png"
              alt="Houses"
              className="object-contain w-[300px] sm:w-[740px] h-auto h-auto inline-block ml-0 xl:ml-10"
            />
          </div>

          <div className="w-1/2 text-center">
            <div className="flex flex-col justify-center items-center">
              <div class="w-[498px] h-[504px] text-center justify-center text-zinc-700 text-2xl sm:text-[85px] font-bold font-['Sumana'] leading-[120px] sm:leading-[155px] mt-[-20px] sm:mt-[10px] tracking-widest sm:tracking-wider">
                DECENT HOUSING FOR ALL
              </div>
              <button
                className="flex bg-palette-red hover:bg-red-900 font-medium text-[15px] sm:text-[25px] text-white px-4 sm:px-7 py-2 rounded-xl m-4 items-center justify-center mt-[-400px] sm:mt-0"
                onClick={() => setIsViewAuditOpen(true)}
              >
                <span className="font-bold mr-2 -mt-1 whitespace-nowrap">
                  View Audit
                </span>
                <img
                  src="arrow-right.svg"
                  alt="Arrow"
                  className="w-5 h-5 sm:w-8 sm:h-8 sm:ml-1 inline-block"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden overflow-visible bg-white">
          <div className="min-h-screen">
            <div className="bg-white" />
            <section
              id="about"
              className="relative w-full scroll-mt-[-140px] mt-[-35px] sm:mt-0"
            >
              <div className="absolute inset-0 skew-y-6 overflow-hidden z-0 h-[1300px] w-full">
                <img
                  src="protest-image.png"
                  alt="Protest"
                  className="w-full h-[800px] sm:h-[1300px] object-cover"
                />
              </div>

              <div className="absolute inset-0 skew-y-6 bg-palette-red h-[800px] sm:h-[1300px] opacity-90 z-10"></div>
              <div className="relative z-20 skew-y-6">
                <div className="-skew-y-6 max-w-7xl mx-auto px-6 py-20 text-white flex flex-col md:flex-row items-center justify-between">
                  <div className="w-full md:w-1/3 text-center font-bold text-[20px] sm:text-[48px] mt-[-25px] sm:mt-[-5px] mb-0 sm:mb-12 tracking-wider">
                    ABOUT US
                  </div>
                  <div className="w-full md:w-2/3 space-y-8 text-[12px] sm:text-[18px] lg:text-[28px] leading-[35px] sm:leading-[55px] mt-[30px] sm:mt-[70px] sm:mt-[7rem] mb-[7rem] px-4 sm:px-0">
                    <p>
                      HouseAudit is a digital platform developed by Housing
                      Assembly, a grassroots movement serving over 20
                      communities across the Western Cape. Built to address
                      long-standing challenges in housing distribution,
                      HouseAudit brings transparency, accountability, and
                      fairness to the audit process through simple, accessible
                      technology.
                    </p>
                    <p>
                      Our platform allows Housing Assembly to digitally capture,
                      organize, and manage audit records—giving communities
                      access to meaningful statistics such as waiting time,
                      regional distribution, and demographic breakdowns. These
                      insights help expose patterns of inequality and potential
                      corruption in housing allocation. By replacing scattered
                      paper forms with a unified digital system, HouseAudit
                      makes it easier to track progress, promote transparency,
                      and hold decision-makers accountable.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section id="contact" className="scroll-mt-[100px]">
              <div className="relative flex justify-center px-4 sm:px-12">
                <div className="relative z-20 bg-black text-white py-24 w-[400px] sm:w-[900px] h-[420px] sm:h-[740px] max-w-4xl rounded-md shadow-lg transform rotate-6 mt-[-120px] sm:mt-[-46px] sm:mb-0 mb-[-40px]">
                  <div className="text-center text-[20px] sm:text-[48px] font-bold -rotate-[6deg] tracking-wider mt-[-35px] sm:mt-0 sm:ml-0 ml-[-20px]">
                    CONTACT
                  </div>

                  <div className="mt-16 transform -rotate-6 px-12 md:px-12">
                    <div className="flex flex-row gap-10 items-start sm:justify-center text-center sm:text-left ml-[35px] sm:ml-[20px] sm:mt-0 mt-[-30px]">
                      <div className="flex flex-col items-center sm:items-end gap-[40px] sm:gap-[75px]">
                        <img
                          src="email.png"
                          alt="Email Icon"
                          className="h-5 sm:h-10 min-w-[42px] object-contain"
                        />
                        <img
                          src="location.png"
                          alt="Pin Icon"
                          className="h-8 sm:h-14 w-a  uto object-contain mr-0 sm:mr-1"
                        />
                      </div>

                      <div className="flex flex-col gap-[30px] sm:gap-[60px] text-[15px] lg:text-[28px] leading-[35px] sm:leading-loose text-left mt-[-6px] sm:mt-[-2px] sm:ml-0 ml-[-25px]">
                        <div>info@housingassembly.org.za</div>
                        <div>
                          <div className="font-semibold">Community House:</div>
                          <div>
                            41 Salt River Road,
                            <br />
                            Salt River,
                            <br />
                            Cape Town,
                            <br />
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
        </div>
      </div>
    </>
  );
}
