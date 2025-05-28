import React from 'react';

const projectData = [
  {
    name: 'The Lucas Project',
    area: 'Eastbridge',
    year: 2002,
    municipality: 'Western Cape',
    status: 'Ongoing',
    color: 'bg-black text-white',
    image: 'Projectspictures/FirstHouse.png',
  },
  {
    name: 'Sunrise Village',
    area: 'Lakeside',
    year: 2005,
    municipality: 'Western Cape',
    status: 'Ongoing',
    color: 'bg-red-700 text-white',
    image: 'Projectspictures/SecHouse.png',
  },
  {
    name: 'Hanover Homes',
    area: 'Hanover Park',
    year: 2010,
    municipality: 'Western Cape',
    status: 'Completed',
    color: 'bg-black text-white',
    image: 'Projectspictures/ThirdHouse.png',
  },
];

const futureProjects = [
  {
    name: 'Hope Hills',
    area: 'Mitchells Plain',
    year: 2015,
    municipality: 'Western Cape',
    status: 'Upcoming',
    color: 'bg-zinc-400 text-white',
    image: 'Projectspictures/TFirstHouse.png',
  },
  {
    name: 'New Dawn Estate',
    area: 'Khayelitsha',
    year: 2018,
    municipality: 'Western Cape',
    status: 'Upcoming',
    color: 'bg-zinc-500 text-white',
    image: 'Projectspictures/TSecHouse.png',
  },
];

export default function ProjectShowcasePage() {
  return (
    <div className="flex flex-col w-full py-12 space-y-20">
      {/* Logo */}
      <div className="flex flex-col items-center space-y-2">
        <img src="Projectspictures/Logo.png" alt="Logo" className="h-45 w-auto" />
      </div>

      {/* ACTIVE PROJECTS */}
      <div className="text-center text-6xl font-bold mt-20">ACTIVE PROJECTS</div>
      <div className="flex flex-col space-y-32 w-full">
        {projectData.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`w-full flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center justify-between`}
            >
              {/* House */}
              <div className="w-1/2 flex justify-center">
                <img
                  src={project.image}
                  alt={`House ${index + 1}`}
                  className="h-50 object-contain"
                />
              </div>

              {/* Tilted Card */}
              <div
                className={`w-3/4 p-8 ${project.color} ${
                  isEven
                    ? 'rotate-[2.5deg] ml-auto -mr-12'
                    : '-rotate-[2.5deg] mr-auto -ml-12'
                } rounded-2xl shadow-2xl`}
              >
                <div
                  className={`${
                    isEven ? '-rotate-[2.5deg]' : 'rotate-[2.5deg]'
                  } space-y-2 text-center text-4xl leading-relaxed pl-8 pr-4`}
                >
                  <p><strong>Project Name:</strong> {project.name}</p>
                  <p><strong>Area:</strong> {project.area}</p>
                  <p><strong>Cutoff Year:</strong> {project.year}</p>
                  <p><strong>Municipality:</strong> {project.municipality}</p>
                  <p><strong>Status:</strong> {project.status}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FUTURE PROJECTS */}
      <div className="text-center text-6xl font-bold mt-6">FUTURE PROJECTS</div>
      <div className="flex flex-col space-y-32 w-full">
        {futureProjects.map((project, index) => (
          <div
            key={index}
            className={`w-full flex ${index % 2 === 1 ? 'flex-row' : 'flex-row-reverse'} items-center justify-between`}
          >
            {/* House */}
            <div className="w-1/2 flex justify-center">
              <img
                src={project.image}
                alt={`Future House ${index + 1}`}
                className="h-50 object-contain"
              />
            </div>

            {/* Flat Card */}
            <div className={`w-3/4 p-8 ${project.color}`}>
              <div className="space-y-2 text-4xl rounded-2xl leading-relaxed text-center">
                <p><strong>Project Name:</strong> {project.name}</p>
                <p><strong>Area:</strong> {project.area}</p>
                <p><strong>Cutoff Year:</strong> {project.year}</p>
                <p><strong>Municipality:</strong> {project.municipality}</p>
                <p><strong>Status:</strong> {project.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back to Home Button */}
      <div className="flex justify-center mt-40 mb-[140px]">
        <a
          href="/"
          className="flex items-center space-x-3 bg-red-800 text-white font-bold text-2xl px-8 py-4 rounded-full hover:bg-red-700 transition duration-200"
        >
          <span className="text-3xl">←</span>
          <span>Back to Homepage</span>
        </a>
      </div>
    </div>
  );
}
