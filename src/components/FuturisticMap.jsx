"use client"

import MapSvg from '../assets/world.svg';

const FuturisticMap = () => {
    return (
      <div className="relative w-full h-full bg-black p-4 rounded-bl-[50px]">
        {/* Outer Grid */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-2 opacity-30">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="w-full h-full border border-cyan-500"></div>
          ))}
        </div>

        <div className="w-full h-full relative  flex items-center justify-center">
        <MapSvg className="w-full h-auto max-h-full max-w-full object-contain" />
      </div>
 

  
        {/* SVG Map with Radar Circles */}
        <svg
          className="w-full h-full absolute top-0 -ml-3"
          viewBox="0 0 800 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Radar Circles */}
          <circle cx="400" cy="250" r="50" stroke="cyan" strokeWidth="2" fill="none" />
          <circle cx="400" cy="250" r="100" stroke="cyan" strokeWidth="2" fill="none" />
          <circle cx="400" cy="250" r="150" stroke="cyan" strokeWidth="2" fill="none" />
          <circle cx="400" cy="250" r="200" stroke="cyan" strokeWidth="2" fill="none" />
  
          {/* Map Dots - You can add more dots to represent areas */}
          <circle cx="300" cy="200" r="3" fill="cyan" />
          <circle cx="500" cy="300" r="3" fill="cyan" />
          <circle cx="350" cy="280" r="3" fill="cyan" />
          <circle cx="450" cy="220" r="3" fill="cyan" />
          {/* Add more circles to represent other parts of the map */}
        </svg>
  
        {/* Radar Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full border-2 border-cyan-500 animate-ping  opacity-30"></div>
        </div>
      </div>
    );
  };

  export default FuturisticMap;