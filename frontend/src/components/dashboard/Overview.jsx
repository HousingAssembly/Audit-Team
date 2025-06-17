import { useState, useEffect } from "react";
import { fetchStats } from "../../statsServices";

const Stats = ({ title, stat }) => {
  return (
    <div className="flex flex-col px-8 py-6 bg-white rounded-lg w-full">
      <div className="text-zinc-700 text-xl font-bold">{title}</div>
      <div className="text-zinc-700 text-5xl font-bold py-4">{stat}</div>
    </div>
  );
};

const ProgressBar = ({ title, people, percent }) => {
  return (
    <div>
      <div className="text-zinc-700 text-xl font-bold py-2">{title}</div>
      <div className="flex justify-between font-bold py-2">
        <div className="text-center text-zinc-700/75 text-xl">{people}</div>
        <div className="text-center text-zinc-700 text-xl">{percent}</div>
      </div>
      <div className="w-full bg-zinc-300/80 rounded-full h-3.5 mt-4 mb-12">
        <div
          className="bg-red-500 h-3.5 rounded-full"
          style={{ width: `${percent}` }}
        ></div>
      </div>
    </div>
  );
};

const ProgressCircle = ({ percent, color }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg
        className="absolute top-0 left-0 transform rotate-90"
        width="128"
        height="128"
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
      </svg>
      <svg
        className="absolute top-0 left-0 transform rotate-90"
        width="128"
        height="128"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex justify-center items-center text-2xl font-bold text-gray-800">
        <span>{percent}%</span>
      </div>
    </div>
  );
};

const Overview = () => {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    maleCount: 0,
    femaleCount: 0,
    ageGroups: { "0-30": 0, "31-45": 0, "46-60": 0, "60+": 0 },
    waitingTimes: { "0-5": 0, "5-10": 0, "10+": 0 },
    regions: {},
    averageWaitingTime: 0
  });

  const getStatsData = async () => {
    try {
      const data = await fetchStats();
      setStatsData(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    getStatsData();
  }, []);

  const {
    totalUsers = 0,
    maleCount = 0,
    femaleCount = 0,
    ageGroups = { "0-30": 0, "31-45": 0, "46-60": 0, "60+": 0 },
    waitingTimes = { "0-5": 0, "5-10": 0, "10+": 0 },
    regions = {}
  } = statsData;

  return (
    <div className="px-7 py-7 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Overview</div>
      <div className="text-zinc-700/80 text-xl font-bold py-2">
        Welcome to HouseAudit — the auditing system of Housing Assembly. Here’s an
        overview of all audit data.
      </div>

      <div className="flex flex-row space-x-6 py-4">
        <Stats
          title="Total on Waiting List"
          stat={totalUsers.toString()}
        />
        <Stats
          title="Average Waiting Time"
          stat={`${statsData.averageWaitingTime ? statsData.averageWaitingTime.toFixed(2) : "N/A"} years`}
        />
      </div>

      <div className="text-center text-3xl text-zinc-700 font-bold mt-12 mb-6">
        Regions
      </div>
      <div className="px-6 py-8 flex flex-col bg-white rounded-lg mx-8 h-[700px] overflow-y-auto">
        <div className="text-5xl text-zinc-700 font-bold py-2">
          Regional Distributions
        </div>
        <div className="text-zinc-700/80 text-2xl font-bold py-2 mb-12">
          Number of people in waiting list by region
        </div>
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
          <div>No regions available</div>
        )}
      </div>

      <div className="text-center text-3xl text-zinc-700 font-bold mt-12 mb-6">
        Demographics
      </div>
      <div className="flex flex-row w-full">
        {/* ─── Gender Distribution ───────────────────────────────────────────────── */}
        <div className="px-6 py-8 flex flex-col bg-white rounded-lg mx-3 w-1/2">
          <div className="text-5xl text-zinc-700 font-bold py-2">
            Gender Distribution
          </div>
          <div className="text-zinc-700/80 text-2xl font-bold py-2 mb-12">
            Breakdown of waiting list by gender
          </div>
          <div className="flex flex-col justify-center items-center">
            <ProgressCircle
              percent={
                totalUsers > 0
                  ? Number(((maleCount / totalUsers) * 100).toFixed(2))
                  : 0
              }
              color="black"
            />
            <div className="text-zinc-700 text-2xl py-4 font-bold">Male</div>
            <div className="text-zinc-700/75 text-xl font-bold mb-8">
              {maleCount} people
            </div>
            <ProgressCircle
              percent={
                totalUsers > 0
                  ? Number(((femaleCount / totalUsers) * 100).toFixed(2))
                  : 0
              }
              color="#ef4444"
            />
            <div className="text-zinc-700 text-2xl py-2 font-bold">Female</div>
            <div className="text-zinc-700/75 text-xl font-bold">
              {femaleCount} people
            </div>
          </div>
        </div>

        {/* ─── Age Distribution ───────────────────────────────────────────────────── */}
        <div className="px-6 py-8 flex flex-col bg-white rounded-lg mx-3 w-1/2">
          <div className="text-5xl text-zinc-700 font-bold py-2">
            Age Distribution
          </div>
          <div className="text-zinc-700/80 text-2xl font-bold py-2 mb-12">
            Breakdown of waiting list by age
          </div>
          {Object.keys(ageGroups).map((ageGroup) => (
            <ProgressBar
              key={ageGroup}
              title={`${ageGroup} years`}
              people={`${ageGroups[ageGroup]} people`}
              percent={
                totalUsers > 0
                  ? ( (ageGroups[ageGroup] / totalUsers) * 100 ).toFixed(2) + "%"
                  : "0.00%"
              }
            />
          ))}
        </div>
      </div>

      <div className="text-center text-3xl text-zinc-700 font-bold mt-12 mb-6">
        Waiting Time
      </div>
      <div className="px-6 py-8 flex flex-col bg-white rounded-lg mx-8">
        <div className="text-5xl text-zinc-700 font-bold py-2">
          Waiting Time Distribution
        </div>
        <div className="text-zinc-700/80 text-2xl font-bold py-2 mb-12">
          Number of people by waiting time duration
        </div>
        {Object.keys(waitingTimes).map((waitingTimeRange) => (
          <ProgressBar
            key={waitingTimeRange}
            title={waitingTimeRange}
            people={`${waitingTimes[waitingTimeRange]} people`}
            percent={
              totalUsers > 0
                ? ( (waitingTimes[waitingTimeRange] / totalUsers) * 100 ).toFixed(2) + "%"
                : "0.00%"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
