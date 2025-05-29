const Stats = ({title, stat, growth}) => { 
  return (
    <div className="flex flex-col px-8 py-6 bg-white rounded-lg w-full">
      <div className="text-zinc-700 font-bold">{title}</div>
      <div className="text-zinc-700 text-5xl font-bold mt-4">{stat}</div>
      <div className="text-zinc-700/75 font-bold text-md p-3">{growth}</div>
    </div>
  )
}

const ProgressBar = ({title, people, percent}) => { 
  return ( 
    <div>
      <div className="text-zinc-700 text-xl font-bold py-2">{title}</div>
      <div className="flex justify-between font-bold py-2">
        <div className="text-center text-zinc-700/75 text-xl">{people}</div>
        <div className="text-center text-zinc-700 text-xl">{percent}</div>
      </div>
      <div className="w-full bg-zinc-300/80 rounded-full h-3.5 mt-4 mb-12">
        <div className="bg-red-500 h-3.5 rounded-full" style={{ width: `${percent}` }}></div>
      </div>
    </div>
  )
}

const ProgressCircle = ({ percent, color }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="absolute top-0 left-0 transform rotate-90" width="128" height="128" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} stroke="#e5e7eb" strokeWidth="12" fill="none"/>
      </svg>
      <svg className="absolute top-0 left-0 transform rotate-90" width="128" height="128" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke= {color}
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

export default function Statistics() {
  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Statistics</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Analyze housing data and track key metrics.
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row space-x-6 py-4">
          <Stats 
            title="Total on Waiting List"
            stat="500,000"
            growth="+5% from last year"
          />
          <Stats 
            title="Average Waiting Time"
            stat="10 years"
            growth="-0.5 years from last year"
          />
          <Stats 
            title="Successful Allocations this year"
            stat="5,000"
            growth="+10% from last year"
          />
        </div>
      </div>
      <div className="text-center text-3xl text-zinc-700 font-bold mt-12 mb-6">Regions</div> 
      <div className="px-6 py-8 flex flex-col bg-white rounded-lg mx-8">
        <div className="text-5xl text-zinc-700 font-bold py-2">Regional Distributions</div>
        <div className="text-zinc-700/80 text-2xl font-bold py-2 mb-12">
          Number of people in waiting list by region
        </div>
        <ProgressBar
          title="Western Cape"
          people="100,000 people"
          percent="20%"
        />
        <ProgressBar
          title="Eastern Cape"
          people="50,000 people"
          percent="50%"
        />
        <ProgressBar
          title="Free State"
          people="50,000 people"
          percent="70%"
        />
      </div>
      <div className="text-center text-3xl text-zinc-700 font-bold mt-12 mb-6">Demographics</div> 
      <div className="flex flex-row w-full">
        <div className="px-6 py-8 flex flex-col bg-white rounded-lg mx-3 w-1/2">
          <div className="text-5xl text-zinc-700 font-bold py-2">Gender Distribution</div>
          <div className="text-zinc-700/80 text-2xl font-bold py-2 mb-12">
            Breakdown of waiting list by gender
          </div>
          <div className="flex flex-col justify-center items-center">
              <ProgressCircle 
                percent="5"
                color="black"
              />
              <div className="text-zinc-700 text-2xl py-4 font-bold">Male</div>
              <div className="text-zinc-700/75 text-xl font-bold mb-8">50,000 people</div>
              <ProgressCircle 
                percent="25"
                color="#ef4444"
              />
              <div className="text-zinc-700 text-2xl py-2 font-bold">Female</div>
              <div className="text-zinc-700/75 text-xl font-bold">150,000 people</div>
          </div>
        </div>
        <div className="px-6 py-8 flex flex-col bg-white rounded-lg mx-3 w-1/2">
          <div className="text-5xl text-zinc-700 font-bold py-2">Age Distribution</div>
          <div className="text-zinc-700/80 text-2xl font-bold py-2 mb-12">
            Breakdown of waiting list by age
          </div>
          <ProgressBar
            title="18-30 years"
            people="90,000 people"
            percent="20%"
          />
          <ProgressBar
            title="31-45 years"
            people="50,000 people"
            percent="50%"
          />
          <ProgressBar
            title="45-60 years"
            people="150,000 people"
            percent="70%"
          />
        </div>
      </div>
      <div className="text-center text-3xl text-zinc-700 font-bold mt-12 mb-6">Waiting Time</div>
      <div className="px-6 py-8 flex flex-col bg-white rounded-lg mx-8">
        <div className="text-5xl text-zinc-700 font-bold py-2">Waiting Time Distribution</div>
        <div className="text-zinc-700/80 text-2xl font-bold py-2 mb-12">
          Number of people by waiting time duration
        </div>
        <ProgressBar
          title="Less than 5 years"
          people="90,000 people"
          percent="20%"
        />
        <ProgressBar
          title="5-10 years"
          people="50,000 people"
          percent="50%"
        />
        <ProgressBar
          title="10-15 years"
          people="150,000 people"
          percent="70%"
        />
      </div>
    </div>
  );
}