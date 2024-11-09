"use client";

import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/outline';

const BackButton = ({ clickTo, delay, slide, style }) => {
  return (
    <motion.div
      initial={{ translateX: slide === "right" ? 450 : slide === "left" ? -450 : 0 }}
      animate={{ translateX: 0 }}
      exit={{ translateX: slide === "right" ? 450 : slide === "left" ? -450 : 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.05}>
        <div
          className="relative flex items-center justify-center bg-black p-3 rounded-full hover:cursor-pointer hover:bg-cyan-800/40 transition-all duration-300 ease-out border border-gray-900 bg-opacity-80 backdrop-blur-lg"
          onClick={clickTo}
          style={style}
        >
          {/* Glowing Frame Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-transparent to-transparent blur-md rounded-full"></div>

          {/* Icon and Text */}
          <div className="relative flex items-center justify-center space-x-2 px-2 py-2 bg-black bg-opacity-60 rounded-full">
         

            {/* Back Text */}
            {slide === "left" ?
            <span className="text-cyan-400 text-xl font-bold uppercase">◄Back</span> 
            : slide === "right" ?
            <span className="text-cyan-400 text-xl font-bold uppercase">Back►</span>
            : null}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default BackButton;
