"use client"

import { useState, useEffect } from 'react';

const ProgressBar = ({ label, initialValue, staticValue }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        const fluctuation = Math.random() * 10 - 5; // Randomly adjust value by -5 to +5
        let newValue = prev + fluctuation;

        if (newValue < ((3/4) * initialValue ))
            newValue = initialValue;

        // Ensure newValue is a number and between 0 and 100
        if (isNaN(newValue) || newValue < 0 || newValue > 100) {
          return Math.max(Math.min(newValue, 100), 0); // Clamp value between 0 and 100
        }

        return newValue;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-glow-cyan">{label}</span>
        <span className="text-glow-cyan number-font">{Math.round(value || staticValue)}%</span>
      </div>
      <div className="h-3 w-full bg-gray-800 border-2 border-cyan-600">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
          style={{ width: `${Math.round(value || staticValue)}%`, transition: 'width 1s ease' }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
