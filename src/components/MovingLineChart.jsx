"use client"

import React, { useEffect, useState } from 'react';

const MovingLineChart = () => {
  const [data, setData] = useState([50, 70, 40, 80, 30, 60, 90, 20]);
  
  useEffect(() => {
    const interval = setInterval(() => {

      const newData = data.map(() => Math.floor(Math.random() * 100));
      setData(newData);
    }, 400);

    return () => clearInterval(interval);
  }, [data]);

    return (
      <div className="bg-gradient-to-tr  from-gray-900/75 to-gray-800/75 p-4 backdrop-blur-lg  shadow-lg w-72 h-44 border border-cyan-500 border-l-0 border-r-0 rounded-lg relative flex items-end space-x-2">
        {data.map((height, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-cyan-500/5 via-cyan-800 to-cyan-500 w-6"
            style={{
              height: `${height}%`,
               transition: 'height 1s'  // Each bar height is a percentage
             // animation: 'pulse 2s ease-in-out infinite', // Optional animation for glowing effect
            }}
          ></div>
        ))}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 0 10px cyan, 0 0 30px cyan;
            }
            50% {
              box-shadow: 0 0 20px cyan, 0 0 60px cyan;
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default MovingLineChart;