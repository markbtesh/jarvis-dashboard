"use client";

import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const StatBox = ({ title, component, clickTo,  delay, slide, style }) => {



    return (
      <motion.div initial={{ translateX: slide === "right" ? 450 : slide === "left" ? -450 : 0 }}
      animate={{ translateX: 0 }}
      exit={{ translateX: slide === "right" ? 450 : slide === "left" ? -450 : 0}}
      transition={{ duration: 0.5, delay: delay }}>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
      <div 
      className="bg-gray-900 bg-opacity-80 border p-1 border-blue-500 rounded-bl-[100%] shadow-glow-blue hover:cursor-pointer"
      onClick={clickTo}
      style={style}>
        <h3 className="text-glow-cyan font-bold pl-5 pt-2">{title}</h3>
        <div className="h-32 bg-gray-800  mt-2 border-cyan-400 border rounded-bl-[45px]" >
          {component}
        </div>
      </div>
      </Tilt>
      </motion.div>

    );
  };
  
  export default StatBox;
  