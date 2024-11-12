"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import MapSvg from '../assets/world.svg';
import Tilt from 'react-parallax-tilt';
import CentralCore from './CentralCore';
import BackButton from './BackButton';
import Segment  from './Segments'
import ProgressBar from './ProgressBar';
import SegmentedProgressBar from './SegmentedProgressBar';
import RadialGauge from './RadialGauge';
import { initialMissions } from '@/constants';

const Radar = () => {
  const radarSweep = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: [0, 360],
      transition: {
        repeat: Infinity,
        duration: 6,
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <div className="relative flex items-center justify-center h-[200px] w-[200px] bg-transparent">
      {/* Grid */}
      <div className="absolute inset-0 rounded-full border border-cyan-500 opacity-30 grid grid-cols-4 grid-rows-4">
        {[...Array(16)].map((_, index) => (
          <div key={index} className="border border-cyan-500 border-opacity-20"></div>
        ))}
      </div>

      {/* Circular Rings */}
      {[90, 70, 50, 30].map((size, index) => (
        <div
          key={index}
          className={`absolute rounded-full border border-cyan-500 border-opacity-${20 + index * 20}`}
          style={{
            height: `${size}%`,
            width: `${size}%`,
          }}
        ></div>
      ))}

      {/* Dots */}
      {[{ x: "30%", y: "20%" }, { x: "60%", y: "50%" }, { x: "40%", y: "80%" }].map((dot, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 bg-cyan-500 rounded-full"
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.5, 0.8] }}
          transition={{
            repeat: Infinity,
            duration: 2 + index,
            ease: "easeInOut",
          }}
          style={{
            top: dot.y,
            left: dot.x,
          }}
        />
      ))}

      {/* Rotating Sweep */}
      <motion.div
        ref={radarSweep}
        className="absolute h-[110%] w-[110%] rounded-full bg-gradient-to-r from-cyan-500 via-cyan-500 to-transparent opacity-10"
        animate={controls}
      ></motion.div>

      {/* Center Dot */}
      <div className="absolute w-4 h-4 bg-cyan-500 rounded-full animate-pulse"></div>
    </div>
  );
};

const ArrowPanel = () => {
  return (
    <div className="relative flex items-center justify-center h-36 w-80 p-4 border-2 border-cyan-400 rounded-lg bg-gray-900/50 overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 gap-1 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        ))}
      </div>

      {/* Arrows */}
      <div className="relative flex space-x-1 z-10 animate-glow">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 border-l-[15px] border-t-[15px] border-cyan-400 transform rotate-[135deg] opacity-75 arrow-glow -translate-x-3"
            style={{
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};



const MissionLayout = ({ onSwitchLayout, messageIndex, setMessageIndex }) => {
  const [missions, setMissions] = useState(initialMissions);

  const handleHoverChange = (id, isFocused) => {
    setMissions((prevMissions) => 
      prevMissions.map((mission) => 
       mission.id === id ? { ...mission, focus: isFocused } : mission 
   )
  );
};

return ( 
  <div>


    <motion.div
    initial={{ scaleY: 0.01, opacity: 0.5, scale: 0.95, translateX: -210, translateY:-75 }} // Initial state when appearing
    animate={{ scaleY: 1, opacity: 1, scale: 0.95 , translateX: -110, translateY:-75}} // Animate to full scale and opacity
    exit={{ scaleY: 0.00, opacity: 0.5, translateX: -210, translateY:-75 }} // Exit animation on unmount
    transition={{ duration: 0.3, delay: 0.1 }} // Animation settings
    >
    <Tilt tiltMaxAngleX={-1} tiltMaxAngleY={-1} >
      <div className="flex h-screen p-20 scale-95">
        <div className='w-3/4 relative overflow-hidden p-10'>
        <MapSvg className="w-[300%] h-full object-contain -translate-x-[55rem]" />

        <div className='absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0 opacity-20'>
          {[...Array(144)].map((_, i) => (
            <div key={i} className='w-full h-full border border-cyan-500 rounded-xl fade-pulse'> </div>
          ))}
        </div>

        {missions.map((mission) => (
          <motion.div
          key={mission.id}
          style={{
            position: 'absolute',
            top: `${mission.coords.y}%`,
            left: `${mission.coords.x}%`,
            transform: 'translate(-50%, -50%)',
          }}
          className={`rounded-full transition-all duration-300 ease-in-out ${
            mission.focus 
             ? 'w-6 h-6 bg-red-400 border-4 border-red-500 -ml-1 -mt-1 glow-animation-red'
             : 'w-4 h-4 bg-cyan-200'
          }`}
          animate={{
            scale: mission.focus ? 1.5 : 1,
            boxShadow: mission.focus
            ? '0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.6), 0 0 30px rgba(255, 0, 0, 0.4)'
            : '0 0 5px rgba(255, 0, 0, 0.5)',
          }}
          whileHover={{
            filter: 'brightness(1.5) blur(1px)',
          }}
          transition={{ duration: 0.5, repeat: Infinity}}
          />
        ))}
        </div>

        <div className='w-1/4 p-4 bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-xl rounded-r-lg border-l-4 border-cyan-500'>
          <h2 className='text-2xl font-bold text-cyan-400 mb-4'>Missions</h2>

          {missions.map((mission) => (
            <motion.div
              key={mission.id}
              className='p-4 bg-gray-700 bg-opacity-75 rounded-lg mb-4 shadow-md hover:shadow-xl transition-shadow border border-cyan-600 hover:cursor-pointer'
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => handleHoverChange(mission.id, true)}
              onHoverEnd={() => handleHoverChange(mission.id, false)}
              >
                <h3 className='text-lg font-semibold text-white'>{mission.title}</h3>
                <p className='text-sm text-gray-300'>{mission.description}</p>
              </motion.div>
          ))}
          </div>
      </div>
    </Tilt>
    </motion.div>

    
    

     {/* Bottom components */}  
        <motion.div initial={{  translateX: -700, opacity: 0 }}
      animate={{ translateX: -12, opacity: 1 }}
      exit={{ translateX: -700, opacity: 0 }}
      transition={{ duration: 0.6 }}
      
     className="gap-4 p-2 absolute w-full bottom-2 flex justify-end -ml-64 space-x-6">

    <div   className='w-[22%] self-end text-center place-items-center '>
     <SegmentedProgressBar value={91} /> 
     <SegmentedProgressBar value={61} /> 
          
     <div className="space-y-4 pb-2 pt-2 mt-4 content-center bg-gradient-to-tr  from-gray-800/50 to-gray-700/50  backdrop-blur-lg   border-2 border-cyan-500 border-l-0 border-r-0 rounded-2xl w-full max-h-10 px-6">
     <h2 className='text-white'>Stability Level</h2>
      </div>
      </div>
          <ArrowPanel />


    <div className="space-y-4 space-x-5 pt-2 flex justify-between bg-gradient-to-br from-black via-gray-900 to-black  rounded-lg  border-0 shadow-lg shadow-cyan-500/50  border-cyan-500  w-[22%]  px-6">
 
        <RadialGauge value='55' label='level'/>
        <ProgressBar label="Energy Flow" staticValue={70} />
      </div>

    </motion.div>
   
      {/* Side components */}   

      <motion.div
        initial={{ opacity: 0, translateY: 200 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 200 }}
        transition={{ duration: 0.3 }}
        className="absolute right-0 top-0 w-60 h-full p-4 bg-opacity-50 space-y-14  shadow-xl  content-end "
      >

          <div>
          <h2 className='text-white text-center mb-4'>Core Uplink</h2>
          <div className='flex justify-center'>
         {/* Rotating Circular Component */}
         <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gray-800 border-2 border-cyan-500">
          <motion.div
            className="absolute w-12 h-12 border-t-2 border-cyan-400 rounded-full animate-spin bg-gray-900"
            style={{ animationDuration: '10s' }}
          />
          <motion.div
            className="absolute w-8 h-8 border-b-2 border-cyan-300 rounded-full animate-spin-reverse"
            style={{ animationDuration: '12s' }}
          />
           <div className="w-8 h-8 bg-cyan-900 border border-cyan-500 rounded-full flex items-center justify-center">
          <motion.div
            className="w-6 h-6 rounded-full bg-cyan-600 animate-pulse"
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>

       
        </div>
         {/* Mini Radar Animation */}
         <div className="relative flex justify-center items-center w-12 h-12 border border-cyan-600 rounded-full ">
          <motion.div
            className="absolute w-12 h-12 border-t border-cyan-500 rounded-full animate-spin-slow"
            style={{ animationDuration: '6s' }}
          />
           <div className="w-8 h-8 bg-cyan-900 border border-cyan-500 rounded-full flex items-center justify-center">
          <motion.div
            className="w-4 h-4 rounded-full bg-cyan-600 animate-pulse"
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
        </div>
          </div>
          </div>
       
    
        <div className="flex space-x-8 justify-center">
        <span className="transform -rotate-90 text-2xl text-gray-400 font-semibold h-5 w-3 self-end mb-7">Power</span>
            <div className="bg-gray-800 border border-cyan-400 w-10 h-40 rounded-lg shadow-glow border-t-0 border-b-0 scale-125">

             <Segment value={100} length={10}/>

             <div className="w-6 h-6 bg-[#3A6B5A] border border-[#4FB078] rounded-full flex items-center justify-center mt-2 ml-[0.4rem]">
           <motion.div
           className="w-2 h-2 rounded-full bg-[#4FB078] animate-pulse"
           initial={{ scale: 1 }}
           animate={{ scale: 1.2 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            />
            </div>
        </div>


        <div className="bg-gray-800 border border-cyan-400 w-10 h-40 rounded-lg shadow-glow border-r-0 border-l-0 pl-[1px] scale-125">
        <Segment value={60} length={10}/>

        <div className="w-6 h-6 bg-[#a06d25] border border-[#bc7f28] rounded-full flex items-center justify-center mt-2 ml-[0.4rem]">
         <motion.div
            className="w-2 h-2 rounded-full bg-[#bc7f28] animate-pulse"
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
         />
        </div>
        </div>
        <span className="transform rotate-90 text-2xl text-gray-400 font-semibold h-5 w-3 mt-12">Flow</span>
        </div>

          <div className=''>
        <Radar />
        </div>
        </motion.div>

    
    <div  className="w-40 absolute bottom-14 pl-10"
      >
        <BackButton slide="left" clickTo={() => onSwitchLayout('dashboard')} />
      </div>



      <div className="absolute flex -top-40 -right-5">
    <motion.div initial={{ opacity: 0, scale: 0.4 }}
      animate={{ translateX: 0, opacity: 1, scale: 0.5 }}
      exit={{  opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 0.6}}>
         <div className="flex flex-col space-y-20 w-80 py-32">
          <CentralCore page='missions' messageIndex={messageIndex} setMessageIndex={setMessageIndex}/>
          </div>  
       
        </motion.div>
       
        </div>
  </div>
)
}

export default MissionLayout;