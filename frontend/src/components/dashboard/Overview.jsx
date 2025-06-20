import { useState, useEffect, useRef } from "react";
import { fetchStats } from "../../statsServices";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Stats = ({ title, stat }) => (
  <div className="flex flex-col items-center justify-center px-6 py-5 bg-white rounded-xl  border border-zinc-400 w-full min-w-[180px]">
    <div className="text-zinc-600 text-lg font-semibold mb-1">{title}</div>
    <div className="text-zinc-800 text-4xl font-extrabold">{stat}</div>
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

const Overview = () => {
  const reportRef = useRef();

  const handleExportPDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("overview_report.pdf");
  };

  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    maleCount: 0,
    femaleCount: 0,
    ageGroups: { "0-30": 0, "31-45": 0, "46-60": 0, "60+": 0 },
    waitingTimes: { "0-5": 0, "5-10": 0, "10+": 0 },
    regions: {},
    averageWaitingTime: 0,
  });

  const getStatsData = async () => {
    try {
      const data = await fetchStats();
      setStatsData(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const [activeTab, setActiveTab] = useState("suburb");

  const tabList = [
    { key: "suburb", label: "Suburb Distribution" },
    { key: "demographics", label: "Age and Gender Distribution" },
    { key: "waiting", label: "Waiting Time Distribution" },
  ];

  useEffect(() => {
    getStatsData();
  }, []);

  const {
    totalUsers = 0,
    maleCount = 0,
    femaleCount = 0,
    ageGroups = { "0-30": 0, "31-45": 0, "46-60": 0, "60+": 0 },
    waitingTimes = { "0-5": 0, "5-10": 0, "10+": 0 },
    regions = {},
    averageWaitingTime = 0,
  } = statsData;

  return (
    <div className="px-7 py-7 flex flex-col w-full min-h-screen bg-palette-dashboard">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
      <div>
        <div className="text-4xl text-zinc-700 font-bold py-2">Overview</div>
        <div className="text-zinc-700/80 text-xl font-bold py-2">
          Welcome to HouseAudit — the auditing system of Housing Assembly. Here’s an overview of all audit data.
        </div>
      </div>
      <button
        onClick={handleExportPDF}
        className="bg-red-800 text-white font-bold py-2 px-4 rounded-lg mt-2 md:mt-0 hover:bg-red-900 transition"
      >
        Export as PDF
      </button>
    </div>

    <div ref={reportRef}></div>

      <div ref={reportRef}>

        <div className="flex flex-row space-x-6 py-4">
          <Stats title="Total on Waiting List" stat={totalUsers.toString()} />
          <Stats
            title="Average Waiting Time"
            stat={`${averageWaitingTime ? averageWaitingTime.toFixed(1) : "N/A"} years`}
          />
        </div>

        <div className="text-center text-4xl text-zinc-700 font-bold mt-12 mb-6">
          Demographics
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-xl border border-zinc-400 overflow-hidden">
            {tabList.map((tab) => (
              <button
                key={tab.key}
                className={`px-6 py-3 text-lg font-semibold transition-colors duration-150 ${
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

        {activeTab === "suburb" && (
          <div className="flex justify-center mb-12">
            <div className="w-[1000px] bg-white rounded-xl border border-zinc-400 px-6 py-8">
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
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="bg-white rounded-xl border border-zinc-400 px-6 py-8 flex-1 flex flex-col">
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
                        ? Number(
                            (((totalUsers - maleCount - femaleCount) / totalUsers) * 100).toFixed(2)
                          )
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
            <div className="bg-white rounded-xl border border-zinc-400 px-6 py-8 flex-1">
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
          <div className="flex justify-center mb-8">
            <div className="w-full w-[1000px] bg-white rounded-xl border border-zinc-400 px-6 py-8">
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
  );
};

export default Overview;
