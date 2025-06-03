  import React, { useEffect, useState } from 'react';
  import axios from 'axios';

  export default function ProjectShowcasePage() {
    const [activeProjects, setActiveProjects] = useState([]);
    const [futureProjects, setFutureProjects] = useState([]);

    useEffect(() => {
      const imageList = [
        'Projectspictures/FirstHouse.png',
        'Projectspictures/SecHouse.png',
        'Projectspictures/ThirdHouse.png',
      ];
      axios.get('/api/projects')
        .then(res => {
          const data = res.data;

          const actives = data
            .filter(p => p.status === 'Ongoing' || p.status === 'Completed')
            .sort((a, b) => b.year - a.year)

          const futures = data
            .filter(p => p.status === 'Upcoming')
            .sort((a, b) => b.year - a.year)

          const activeWithImages = actives.map((p, i) => ({
            ...p,
            image: imageList[i % imageList.length],
            grayscale: false,
            color: `${i % 2 === 0 ? 'bg-red-800' : 'bg-black'} text-white`,
          }));

          const futureWithImages = futures.map((p, i) => ({
            ...p,
            image: imageList[i % imageList.length],
            grayscale: true,
            color: `${i % 2 === 0 ? 'bg-zinc-500' : 'bg-black'} text-white`,
          }));

            setActiveProjects(activeWithImages);
            setFutureProjects(futureWithImages);

        })
        .catch(err => console.error('Failed to load projects:', err));
    }, []);

    const renderProjects = (list) =>
      list.map((project, index) => {
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
                className={`h-[350px] object-contain ${project.grayscale ? 'filter grayscale' : ''} ${index % 2 === 0 ? 'mb-24' : 'mb-0'}`}
              />
            </div>
            <div
              className={`w-3/4 p-8 h-[420px] ${project.color} ${
                isEven ? 'rotate-[7deg] ml-auto -mr-12' : 'rotate-[7deg] mr-auto -ml-12 mb-[180px]'
              } rounded-[5px] shadow-xl`}
            >
              <div
                className={`${
                  isEven ? '-rotate-[7deg] text-left mt-[35px] ml-[50px]' : '-rotate-[7deg] text-left mt-[50px] ml-[600px]'
                } space-y-2 text-xl leading-loose pl-8 pr-4 max-w-xl`}
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
    
    const totalProjects = activeProjects.length + futureProjects.length;
    const shouldOffsetButton = totalProjects % 2 !== 0
    const totalActiveProjects = activeProjects.length
    const shouldOffsetFuture = totalActiveProjects % 2 !== 0

    return (
      <div className="flex flex-col w-full py-12 overflow-x-hidden">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-center">
            <img src="logo.png" alt="Logo" className="object-contain h-[90px] w-auto mb-[21px]" />
            <div className="text-6xl flex flex-row">
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
          <div className="text-[23px] text-palette-text font-bold mt-[-22px]">
            Decent Housing For All
          </div>
        </div>

        {/* ACTIVE PROJECTS */}
        <div className="flex items-center w-full mt-[120px]">
          {/* Left Rectangles */}
          <div className="flex flex-col space-y-3 flex-grow pr-4">
            <div className="h-2 bg-red-800 outline outline-[4px] outline-offset-[-2px] outline-red-800"></div>
            <div className="h-2 bg-black outline outline-[4px] outline-offset-[-2px] outline-black"></div>
          </div>
          {/* Header */}
          <div className="text-3xl font-bold whitespace-nowrap text-center px-6 shrink-0">
            ACTIVE PROJECTS
          </div>
          {/* Right Rectangles */}
          <div className="flex flex-col space-y-3 flex-grow pl-4">
            <div className="h-2 bg-red-800 outline outline-[4px] outline-offset-[-2px] outline-red-800"></div>
            <div className="h-2 bg-black outline outline-[4px] outline-offset-[-2px] outline-black"></div>
          </div>
        </div>

        <div className="flex flex-col w-full mt-[120px]">
          {activeProjects.length > 0
            ? renderProjects(activeProjects)
            : <div className="text-center text-2xl font-bold text-zinc-500 mt-[30px]">No active projects available.</div>}
        </div>

        {/* FUTURE PROJECTS */}
        <div className={`flex items-center w-full ${shouldOffsetFuture ? 'mt-[150px]' : 'mt-[0px]'}`}>
          {/* Left Rectangles */}
          <div className="flex flex-col space-y-3 flex-grow pr-4">
            <div className="h-2 bg-zinc-500 outline outline-[4px] outline-offset-[-2px] outline-zinc-500"></div>
            <div className="h-2 bg-black outline outline-[4px] outline-offset-[-2px] outline-black"></div>
          </div>
          {/* Header */}
          <div className="text-3xl font-bold whitespace-nowrap text-center px-6 shrink-0">
            FUTURE PROJECTS
          </div>
          {/* Right Rectangles */}
          <div className="flex flex-col space-y-3 flex-grow pl-4">
            <div className="h-2 bg-zinc-500 outline outline-[4px] outline-offset-[-2px] outline-zinc-500"></div>
            <div className="h-2 bg-black outline outline-[4px] outline-offset-[-2px] outline-black"></div>
          </div>
        </div>

        <div className="flex flex-col w-full mt-[120px]">
          {futureProjects.length > 0
            ? renderProjects(futureProjects)
            : <div className="text-center text-2xl font-bold text-zinc-500 mt-[30px]">No future projects available.</div>}
        </div>

        {/* Back to Home Button */}
        <div className={`flex justify-center ${shouldOffsetButton ? 'mt-[80px]' : 'mt-[0px]'}`}>
          <a
            href="/"
            className="flex items-center space-x-3 bg-palette-red text-white font-bold text-2xl px-8 py-4 rounded-[15px] hover:bg-red-900 transition duration-200 "
          >
            <div className="flex items-center space-x-3 translate-y-[-2px]">
              <img src="arrow-right.svg" alt="Arrow" className="rotate-[180deg] w-6 h-6 mt-[6px]" />
              <span>Back to Homepage</span>
            </div>
          </a>
        </div>
      </div>
    );
  }
