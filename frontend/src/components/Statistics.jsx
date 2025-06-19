import { useState, useEffect } from "react";
import { fetchStats } from "../statsServices";

const Stats = ({ title, stat }) => (
  <div className="flex flex-col items-center justify-center px-6 py-5 bg-white rounded-xl border border-zinc-400 w-full min-w-[180px] shadow-sm">
    <div className="text-zinc-600 text-[15px] sm:text-lg font-semibold mb-1">{title}</div>
    <div className="text-zinc-800 text-[20px] sm:text-4xl font-extrabold">{stat}</div>
  </div>
);

const ProgressBar = ({ title, people, percent }) => (
  <div className="mb-8">
    <div className="flex justify-between items-end mb-1">
      <div className="flex flex-col items-start">
        <span className="text-zinc-700 font-medium">{title}</span>
        <span className="text-zinc-500 text-sm mt-1 mb-1">{people}</span>
      </div>
      <span className="text-zinc-700 font-bold">{percent}</span>
    </div>
    <div className="w-full bg-zinc-200 rounded-full h-3 relative">
      <div
        className="bg-red-500 h-3 rounded-full transition-all duration-300"
        style={{ width: percent }}
      ></div>
    </div>
  </div>
);

const ProgressCircle = ({ percent, color }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-28 h-28 mb-2">
      <svg
        className="absolute top-0 left-0"
        width="112"
        height="112"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.5s" }}
        />
      </svg>
      <div className="absolute inset-0 flex justify-center items-center text-xl font-bold text-gray-800">
        <span>{percent}%</span>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <div className="text-2xl md:text-3xl font-bold text-zinc-700">{title}</div>
    {subtitle && (
      <div className="text-zinc-500 text-base md:text-lg font-medium mt-1">{subtitle}</div>
    )}
  </div>
);

export default function Statistics() {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    maleCount: 0,
    femaleCount: 0,
    ageGroups: { "0-30": 0, "31-45": 0, "46-60": 0, "60+": 0 },
    waitingTimes: { "0-5": 0, "5-10": 0, "10+": 0 },
    regions: {},
    averageWaitingTime: 0
  });

  const [activeTab, setActiveTab] = useState("suburb");

  const tabList = [
    { key: "suburb", label: "Suburb Distribution" },
    { key: "demographics", label: "Age and Gender Distribution" },
    { key: "waiting", label: "Waiting Time Distribution" },
  ];

  useEffect(() => {
    fetchStats().then(setStatsData).catch(console.error);
  }, []);

  const {
    totalUsers = 0,
    maleCount = 0,
    femaleCount = 0,
    ageGroups = { "0-30": 0, "31-45": 0, "46-60": 0, "60+": 0 },
    waitingTimes = { "0-5": 0, "5-10": 0, "10+": 0 },
    regions = {},
    averageWaitingTime = 0
  } = statsData;

  return (
    <div className="flex flex-col w-full py-7 sm:py-12 overflow-hidden">
      {/* Logo - same as Projects.jsx */}
      <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-center">
            <img src="logo.png" alt="Logo" className="object-contain h-[60px] sm:h-[90px] w-auto mb-[21px]" />
            <div className="text-[35px] sm:text-6xl flex flex-row">
              <div>
                <span className="text-palette-red font-['Chelsea_Market']">H</span>
                <span className="font-['Chelsea_Market']">ouse</span>
              </div>
              <div>
                <span className="text-palette-red font-['Chelsea_Market']">A</span>
                <span className="font-['Chelsea_Market']">udit</span>
              </div>
            </div>
          </div>
          <div className="sm:text-[23px] text-palette-text font-bold mt-[-22px]">
            Decent Housing For All
          </div>
        </div>

      <div className="flex items-center w-full mt-[40px] sm:mt-[80px]">
          {/* Left Rectangles */}
          <div className="flex flex-col space-y-[4px] sm:space-y-[5px] flex-grow sm:mr-0 mr-[-10px] sm:pr-1">
            <div className="h-[6px] sm:h-[10px] bg-red-800 outline outline-[1px] outline-offset-[-2px] outline-red-800"></div>
            <div className="h-[6px] sm:h-[10px] bg-black outline outline-[1px] outline-offset-[-2px] outline-black"></div>
          </div>
          {/* Header */}
          <div className="text-[18px] sm:text-3xl font-bold whitespace-nowrap text-center px-6 shrink-0">
            STATISTICS OVERVIEW
          </div>
          {/* Right Rectangles */}
          <div className="flex flex-col space-y-[4px] sm:space-y-[5px] flex-grow sm:ml-0 ml-[-10px] sm:pl-1">
            <div className="h-[6px] sm:h-[10px] bg-red-800 outline outline-[1px] outline-offset-[-2px] outline-red-800"></div>
            <div className="h-[6px] sm:h-[10px] bg-black outline outline-[1px] outline-offset-[-2px] outline-black"></div>
          </div>
        </div>
    
    <div className="flex justify-center w-full mt-[20px] sm:mt-[60px]">
  <div className="max-w-[93vw] sm:w-[1400px] rounded-2xl bg-red-800 px-5 sm:px-12 pt-2 sm:pt-8 sm:pb-2 border border-zinc-300">

      <div className="flex flex-row space-x-6 py-4 justify-center">
        <Stats
          title="Total on Waiting List"
          stat={totalUsers.toString()}
        />
        <Stats
          title="Average Waiting Time"
          stat={`${averageWaitingTime ? averageWaitingTime.toFixed(1) : "N/A"} years`}
        />
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-xl border border-zinc-400 overflow-hidden shadow-sm">
          {tabList.map(tab => (
            <button
                key={tab.key}
                className={`px-6 py-3 text-base sm:text-lg font-semibold transition-colors duration-150 ${
                    activeTab === tab.key
                    ? "bg-zinc-100 text-red-600"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
                onClick={() => setActiveTab(tab.key)}
                >
                {tab.label}
                </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "suburb" && (
        <div className="flex justify-center mb-6 sm:mb-12">
          <div className="w-full w-[1000px] bg-white rounded-xl border border-zinc-400 px-6 py-8 shadow-sm">
            <SectionHeader
              title="Suburb Distribution"
              subtitle="Number of people in waiting list by suburb"
            />
            <div className="grid grid-cols-1">
              {Object.keys(regions).length > 0 ? (
                Object.keys(regions).map((region) => (
                  <ProgressBar
                    key={region}
                    title={region}
                    people={`${regions[region].people} people`}
                    percent={`${regions[region].percent.toFixed(2)}%`}
                  />
                ))
              ) : (
                <div className="text-zinc-400">No regions available</div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "demographics" && (
        <div className="flex flex-col md:flex-row gap-8 mb-6 sm:mb-12">
          {/* Gender */}
          <div className="bg-white rounded-xl border border-zinc-400 px-6 pt-8 pb-[100px] sm:pt-8 sm:pb-8 flex-1 flex flex-col shadow-sm ">
            <SectionHeader
              title="Gender Distribution"
              subtitle="Breakdown of waiting list by gender"
            />
            <div className="flex flex-col md:flex-row items-center gap-[90px] w-full justify-center mt-[80px]">
              <div className="flex flex-col items-center">
                <ProgressCircle
                  percent={
                    totalUsers > 0
                      ? Number(((maleCount / totalUsers) * 100).toFixed(2))
                      : 0
                  }
                  color="black"
                />
                <div className="text-zinc-700 text-lg font-semibold mt-2">Male</div>
                <div className="text-zinc-500 text-base">{maleCount} people</div>
              </div>
              <div className="flex flex-col items-center">
                <ProgressCircle
                  percent={
                    totalUsers > 0
                      ? Number(((femaleCount / totalUsers) * 100).toFixed(2))
                      : 0
                  }
                  color="#ef4444"
                />
                <div className="text-zinc-700 text-lg font-semibold mt-2">Female</div>
                <div className="text-zinc-500 text-base">{femaleCount} people</div>
              </div>
              <div className="flex flex-col items-center">
                <ProgressCircle
                  percent={
                    totalUsers > 0
                      ? Number(((((totalUsers - maleCount - femaleCount) / totalUsers) * 100)).toFixed(2))
                      : 0
                  }
                  color="#ef4444"
                />
                <div className="text-zinc-700 text-lg font-semibold mt-2">Other</div>
                <div className="text-zinc-500 text-base">
                  {totalUsers - maleCount - femaleCount} people
                </div>
              </div>
            </div>
          </div>
          {/* Age */}
          <div className="bg-white rounded-xl border border-zinc-400 px-6 py-8 flex-1 shadow-sm">
            <SectionHeader
              title="Age Distribution"
              subtitle="Breakdown of waiting list by age"
            />
            <div>
              {Object.keys(ageGroups).map((ageGroup) => (
                <ProgressBar
                  key={ageGroup}
                  title={`${ageGroup} years`}
                  people={`${ageGroups[ageGroup]} people`}
                  percent={
                    totalUsers > 0
                      ? ((ageGroups[ageGroup] / totalUsers) * 100).toFixed(2) + "%"
                      : "0.00%"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "waiting" && (
        <div className="flex justify-center mb-6 sm:mb-12">
          <div className="w-full w-[1000px] bg-white rounded-xl border border-zinc-400 px-6 py-8 shadow-sm">
            <SectionHeader
              title="Waiting Time Distribution"
              subtitle="Number of people by waiting time duration"
            />
            <div className="grid grid-cols-1">
              {Object.keys(waitingTimes).map((waitingTimeRange) => (
                <ProgressBar
                  key={waitingTimeRange}
                  title={`${waitingTimeRange} years`}
                  people={`${waitingTimes[waitingTimeRange]} people`}
                  percent={
                    totalUsers > 0
                      ? ((waitingTimes[waitingTimeRange] / totalUsers) * 100).toFixed(2) + "%"
                      : "0.00%"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
      </div>

      <div className="text-black text-[8px] sm:text-base font-semibold items-center sm:mb-6 sm:mt-[30px] px-[60px] sm:px-[300px] flex justify-left mt-[20px]">
              Please note: these statistics only reflect audits that have been submitted to Housing Assembly and entered on this website.
              Not everyone who has applied for housing has provided their audit information, so these figures represent only the data available to Housing Assembly and may not capture all housing applicants.
            </div>

      {/* Back to Homepage Button */}
      <div className="flex justify-center mt-[30px] sm:mt-[50px] sm:mb-[20px]">
        <a
          href="/"
          className="flex items-center space-x-3 bg-palette-red text-white font-bold text-2xl px-4 sm:px-6 py-0 sm:py-3 rounded-[15px] hover:bg-red-900 transition duration-200"
        >
          <div className="flex items-center space-x-1 sm:space-x-3 translate-y-[-2px] text-[13px] sm:text-[25px]">
            <img src="arrow-right.svg" alt="Arrow" className="rotate-[180deg] w-4 h-4 sm:w-6 sm:h-6 mt-[6px]" />
            <div className="mt-[3px] sm:mt-[0px]">
              <span>Back to Homepage</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}