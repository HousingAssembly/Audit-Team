import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProjectShowcasePage() {
  const [activeProjects, setActiveProjects] = useState([]);
  const [futureProjects, setFutureProjects] = useState([]);

  const imageMap = {
    0: 'Projectspictures/FirstHouse.png',
    1: 'Projectspictures/SecHouse.png',
    2: 'Projectspictures/ThirdHouse.png',
    3: 'Projectspictures/TFirstHouse.png',  // This is for future housing
    4: 'Projectspictures/TSecHouse.png',  //This is for future housing as well
  };

useEffect(() => {
  axios.get('/api/projects')
    .then(res => {
      const data = res.data;

      const actives = data
        .filter(p => p.status === 'Ongoing' || p.status === 'Completed')
        .sort((a, b) => b.year - a.year)
        .slice(0, 3)
        .map((p, idx) => ({
          ...p,
          image: imageMap[idx] || 'Projectspictures/DefaultHouse.png',
          color: 'bg-red-700 text-white',
        }));

      const futures = data
        .filter(p => p.status === 'Upcoming')
        .sort((a, b) => b.year - a.year)
        .slice(0, 2)
        .map((p, idx) => ({
          ...p,
          image: imageMap[idx + 3] || 'Projectspictures/DefaultHouse.png', 
          color: 'bg-zinc-500 text-white',
        }));

      setActiveProjects(actives);
      setFutureProjects(futures);
    })
    .catch(err => console.error('Failed to load projects:', err));
}, []);

const renderProjects = (list, startIndex = 0) =>
  list.map((project, idx) => {
    const index = startIndex + idx;
    const isEven = index % 2 === 0;
    return (
      <div
        key={index}
        className={`w-full flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center justify-between`}
      >
        <div className="w-1/2 flex justify-center">
          <img
            src={project.image}
            alt={`House ${index + 1}`}
            className="h-50 object-contain"
          />
        </div>
        <div
          className={`w-3/4 p-8 ${project.color} ${
            isEven ? 'rotate-[2.5deg] ml-auto -mr-12' : '-rotate-[2.5deg] mr-auto -ml-12'
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
  });


  return (
    <div className="flex flex-col w-full py-12 space-y-20 overflow-x-hidden">
      {/* Logo */}
      <div className="flex flex-col items-center space-y-2">
        <img src="Projectspictures/Logo.png" alt="Logo" className="h-45 w-auto" />
      </div>

  {/* ACTIVE PROJECTS */}
  <div className="text-center text-6xl font-bold mt-20">ACTIVE PROJECTS</div>
  <div className="flex flex-col space-y-32 w-full">
    {activeProjects.length > 0
      ? renderProjects(activeProjects, 0)
      : <div className="text-center text-3xl text-zinc-500">NO ACTIVE PROJECTS AVAILABLE</div>}
  </div>

  {/* FUTURE PROJECTS */}
  <div className="text-center text-6xl font-bold mt-6">FUTURE PROJECTS</div>
  <div className="flex flex-col space-y-32 w-full">
    {futureProjects.length > 0
      ? renderProjects(futureProjects, activeProjects.length) // 从下一个 index 开始
      : <div className="text-center text-3xl text-zinc-500">NO FUTURE PROJECTS AVAILABLE</div>}
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
