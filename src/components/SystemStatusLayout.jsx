

"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import SegmentedProgressBar from './SegmentedProgressBar';
import StatBox from './StatBox';
import TechCircle from './TechCircle';
import CentralCore from './CentralCore';

import Tilt from 'react-parallax-tilt';
import MovingLineChart from './MovingLineChart';
import BackButton from './BackButton';
import RadialGauge from './RadialGauge';


const FuturisticPanel = () => (
  <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -1100, right: 200, top: -700, bottom: 100 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.1}  className="absolute bottom-44 right-52">
  <div className="relative w-64  bg-gradient-to-br from-black via-gray-900 to-black p-4 rounded-lg shadow-inner border-2 border-cyan-500 cursor-grab active:cursor-grabbing">
    <div className="absolute inset-0 w-full h-full border border-cyan-500 opacity-30 rounded-lg"></div>
    <div className="text-cyan-400 text-lg">System Status</div>
    <motion.div
      className="mt-2 h-2 bg-cyan-600 rounded"
      initial={{ width: "0%" }}
      animate={{ width: "70%" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}

    />
    <div className="mt-4 text-cyan-200 text-sm">75% Calibrated</div>

        
     
  </div>
  </Tilt>
  </motion.div>
);


const DataPanel = () => {

  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -800, right: 900, top: -800, bottom: 100 }}
      whileHover={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 0.6 }}
      exit={{ opacity: 0, scale: 0.4 }}
      className='cursor-grab active:cursor-grabbing absolute -bottom-6 right-1/3'
    >

      <div className='grid grid-cols-3'>

<div className="relative flex items-center justify-center h-64 rounded-lg pt-16 fade-animation duration-400 translate-x-5">
 

  {/* Rounded container with faded bars */}
  <div className="w-24 h-32 bg-gray-800 rounded-2xl border-8 border-cyan-400  p-3 self-end translate-x-5 z-10">
    <div className="space-y-1">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="w-full h-2 bg-cyan-500  " 
        style={{ opacity: (i + 1) * 0.08 }}/>
      ))}
    </div>
  </div>

   {/* Left indicator lights */}
   <div className="space-y-2 bg-cyan-400 self-start h-full px-1 pt-2">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="w-3 h-3 bg-red-500 rounded-full border-2 border-cyan-600 shadow-md" />
    ))}
  </div>

  {/* Right taller item with faded bars */}
  <div className="w-10 h-full  border-l-[20px] border-cyan-500 p-1 pt-2 space-y-1 rounded-sm border-y-[10px]">
    {[...Array(10)].map((_, i) => (
      <div key={i} className=" h-3 w-10 bg-cyan-500"
      style={{ opacity: (i + 1) * 0.08 }} />
    ))}
  </div>
</div>


    <div className="relative bg-gray-900 rounded-lg shadow-2xl fade-animation duration-400">
      {/* Outer Frame with Detailed Borders */}
      <div className="absolute top-0 left-0 w-full h-full border-4 border-cyan-400 rounded-lg"></div>
      
      {/* Outer Glow Layer */}
      <div className="absolute w-full h-full flex justify-center items-center z-0">
        <div className="w-72 h-72 rounded-full  opacity-30 animate-pulse"></div>
      </div>

      {/* Central Circular Element */}
      <svg viewBox="0 0 100 100" className="w-full h-full z-10">
        {/* Outer Circle with Ticks */}
        <circle cx="50" cy="50" r="45" stroke="cyan" strokeWidth="1.5" fill="none" />
        {[...Array(4)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="2"
            x2="50"
            y2="8"
            stroke="orange"
            strokeWidth="15"
            transform={`rotate(${(i * 30) + 80} 50 50)`}
          />
        ))}

        {/* Inner Circles and Rings */}
        <circle cx="50" cy="50" r="35" stroke="cyan" strokeWidth="1" fill="none" />
        <path
    d="M 50 50 m -25 0 a 25 25 0 1 1 50 0" 
    stroke="orange" 
    strokeWidth="2" 
    fill="none"
  />

        {/* Crosshairs */}
        <line x1="50" y1="30" x2="50" y2="70" stroke="cyan" strokeWidth="0.5" />
        <line x1="30" y1="50" x2="70" y2="50" stroke="cyan" strokeWidth="0.5" />

        {/* Spinning Circle Around the Center */}
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          stroke="cyan"
          strokeWidth="1"
          fill="none"
          strokeDasharray="10,5"
          className="animate-spin-slow"
        />

        {/* Inner Spinning Ticks */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="20"
            x2="50"
            y2="25"
            stroke="orange"
            strokeWidth="0.5"
            transform={`rotate(${i * 45} 50 50)`}
            className="animate-pulse"
          />
        ))}
      </svg>

     
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0 opacity-20 z-0">
        {[...Array(144)].map((_, i) => (
          <div key={i} className="w-full h-full border border-cyan-500"></div>
        ))}
      </div>

  
      {/* Floating Glow */}
      <div className="absolute w-20 h-20 top-16 left-16 rounded-full bg-cyan-400 opacity-20 blur-xl"></div>
      <div className="absolute w-20 h-20 top-36 left-36 rounded-full bg-cyan-400 opacity-20 blur-xl"></div>
    </div>





    <div className="absolute right-0 top-0 m-5 w-64  bg-gray-900 bg-opacity-30 border border-cyan-400 rounded-lg p-4 space-y-4 shadow-xl">
  {/* Waveform Chart */}
  <div className="relative h-24 bg-gray-800 border border-cyan-400 rounded-md flex items-center justify-center p-2">
    {/* Mock waveform as SVG or bars */}
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <path
        d="M 0,20 Q 10,5 20,20 T 40,20 T 60,20 T 80,20 T 100,20"
        stroke="cyan"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      <path
        d="M 0,20 Q 10,35 20,20 T 40,20 T 60,20 T 80,20 T 100,20"
        stroke="cyan"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
    </svg>
  </div>

  {/* Scrollable Item List Selector */}
  <div className="relative bg-gray-800 border h-64 border-cyan-400 rounded-md p-2 overflow-y-auto scrollbar-thumb-cyan-400 scrollbar-track-gray-700 scrollbar-thin">
    <ul className="space-y-2">
      {['Quantum Pulse',
  'Neon Surge',
  'Photon Oscillator',
  'Cyberwave',
  'Echo Nexus',
  'Gravity Flux',
  'Plasma Burst',
  'Sonic Collider',
  'Neural Harmonics',
  'Temporal Shift',
  'Exo Vibration',
  'Cosmic Echo',
  'Celestial Sweep',
  'Dark Matter Wave',
  'Stellar Pulse',
  'Phase Resonance',
  'Techno Pulse',
  'Lumina Drift',
  'Vortex Frequency',
  'Zero Point Wave',
  'Horizon Echo',
  'Electrofield',
  'Xenon Rumble',
  'Ion Storm'].map((item, i) => (
        <li key={i} className={`text-cyan-400 text-xs hover:text-red-400 cursor-pointer ${i % 2 === 0 ? 'text-opacity-80' : 'text-opacity-60'}`}>
          {item}
        </li>
      ))}
    </ul>
    
  </div>
</div>

    </div>
    </motion.div>
  );
};


const MissionStatusPanel = () => {
  return (
    <div className="mission-status-panel bg-[#002f3691]  backdrop-blur-lg border-cyan border-2 rounded-lg p-2 text-cyan  w-[400px]">
      <div className="flex">
        {/* Left side with information */}
        <div className="w-2/3 p-2">
          <div className="flex items-center mb-1 space-x-2">
            <div className='bg-darker-cyan w-[80%] px-2' style={{ textAlignLast: 'justify' }}>
            <span className="text-xs tracking-wide">MISSION TEMP</span>
            <span className="text-lg font-semibold">1.36</span>
            </div>
            <span className="text-xs bg-darker-cyan w-[20%] px-2 h-6">MW°C</span>
          </div>
          <div className="flex justify-between items-center mb-1 space-x-2">
          <div className='bg-darker-cyan w-[80%] px-2' style={{ textAlignLast: 'justify' }}>
            <span className="text-xs tracking-wide">LOCATION</span>
            <span className="text-lg font-semibold">83</span>
            </div>
            <span className="text-xs bg-darker-cyan w-[20%] px-2 h-6 text-right">REP</span>
          </div>
          <div className="flex justify-between items-center mb-1 space-x-2">
          <div className='bg-darker-cyan w-[80%] px-2' style={{ textAlignLast: 'justify' }}>
            <span className="text-xs tracking-wide">BOOT STATUS</span>
            <span className="text-lg font-semibold">64</span>
            </div>
            <span className="text-xs bg-darker-cyan w-[20%] px-2 h-6 text-right">%</span>
          </div>
          <div className="flex justify-between items-center mb-4 space-x-2">
          <div className='bg-darker-cyan w-[80%] px-2' style={{ textAlignLast: 'justify' }}>
            <span className="text-xs tracking-wide">ALPHA LEVEL</span>
            <span className="text-lg font-semibold">8.23</span>
            </div>
            <span className="text-xs bg-darker-cyan w-[20%] px-2 h-6 text-right">%</span>
          </div>
        </div>
        
        {/* Right side with radar graphic */}
        <div className="w-1/3 flex items-center justify-center">
          <div className="radar-container border border-cyan rounded-md w-28 h-28 flex items-center justify-center">
            <div className="radar-circle border border-cyan rounded-full w-20 h-20 flex items-center justify-center">
              <div className="inner-circle border border-cyan rounded-full w-14 h-14"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom label */}
      <div className="text-center bg-[#00e5e5]  p-1">
        <span className="font-bold text-base text-[#002f36]">MICROGEN CONTROL</span>
      </div>

      <div className='absolute right-0 -bottom-14 w-14 h-12 border-cyan border-2 rounded-b-lg bg-[#002f3691]  backdrop-blur-lg align-center'>
      <div className="inner-circle border border-cyan rounded-full w-6 h-6 mt-2"></div>
      </div>
    </div>
  );
};



const CircularButton = ({value, label}) => (
  <motion.div
    className={`relative flex-col  bg-gradient-to-br from-cyan-700/15 to-cyan-500/15 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-[15px] border-cyan-400 cursor-grab active:cursor-grabbing`}
    style={{ width: `${(value * 2) + 10}px`, height: `${(value * 2) + 10}px` }} 
    whileHover={{ scale: 1.2, boxShadow: "0 0 15px cyan" }}
    transition={{ type: "spring", stiffness: 200 }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    drag
    dragElastic={0.2}
    dragConstraints={{ left: -350, right: 800, top: -100, bottom: 600 }}
  >
    {value}%
    <span className="text-lg font-bold">{label}</span>
    <div className="absolute inset-0 border-2 border-cyan-400 rounded-full opacity-20 blur-sm animate-ping"></div>
  </motion.div>
);


  
const SystemStatusLayout = ({ onSwitchLayout, messageIndex, setMessageIndex }) => {

  const [rotation, setRotation] = useState(127); // Keep track of knob rotation
  const knobRef = useRef();
  const centerRef = useRef({ x: 0, y: 0 });
  const lastAngleRef = useRef(0); // Store the last angle to calculate delta

  // Calculate angle between two points
  const calculateAngle = (x, y) => {
    const dx = x - centerRef.current.x;
    const dy = y - centerRef.current.y;
    return Math.atan2(dy, dx) * (180 / Math.PI); // Convert from radians to degrees
  };

  // Handle drag to rotate knob in circular fashion
  const bind = useDrag(({ event, first, xy: [x, y], memo }) => {
    if (first) {
      // Set the center of the knob (where rotation happens)
      const rect = knobRef.current.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      lastAngleRef.current = calculateAngle(x, y); // Set initial angle
      return lastAngleRef.current; // Memo stores the initial angle
    }

    // Calculate the new angle
    const currentAngle = calculateAngle(x, y);
    let delta = currentAngle - lastAngleRef.current;

    // Correct delta to ensure smooth clockwise/counterclockwise movement
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    let newRotation = rotation + delta;

    // Lock the rotation within 0 and 360 degrees
    if (newRotation < 0) newRotation = 0;       // Lock at 0 degrees (counterclockwise)
    if (newRotation > 360) newRotation = 360;   // Lock at 360 degrees (clockwise)

    setRotation(newRotation);
    lastAngleRef.current = currentAngle; // Update last angle

    return currentAngle; // Return current angle for memoization
  });
  // Calculate progress (we assume the progress is based on rotation)
  const progress = (rotation / 360) * 100;

    return (
      <div className="relative h-screen">

         {/* Additional Glowing Arcs and Rings background */}
         <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0}}
        transition={{ duration: 0.2 }}
        className="absolute w-full h-full z-0 pointer-events-none"
          >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {[...Array(10)].map((_, index) => (
        <circle
          key={index}
          cx="50"
          cy="50"
          r={`${35 + index * 3}`}
          stroke="cyan"
          strokeWidth="0.2"
          fill="none"
          opacity={0.2}
          className="animate-pulse"
        />
      ))}
        </svg>
      </motion.div>

        {/* Central Knob */}
        <motion.div
        initial={{ opacity: 0, scale: 0.9}}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
          >
        <div className="relative flex justify-center items-center h-screen shadow-glow">
  {/* Knob Progress Text */}
  <div className="absolute flex  flex-col justify-center items-center text-white z-20  border-cyan-500 bg-gradient-to-br from-cyan-600/50 via-cyan-800/50 to-cyan-900/50 w-36 h-36 rounded-full">
  
    <span className="text-3xl font-bold">{Math.round(progress)}%</span> {/* Display the progress as a percentage */}
    <span className="text-lg font-bold">power</span>
  </div>


  {/* Knob Background with multiple glow layers */}
  <div className="relative w-80 h-80 rounded-full shadow-2xl border-4 border-cyan-500 ">
    {/* Static outer ring */}
    <svg className="absolute top-0 left-0 w-full h-full z-10" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="47" stroke="cyan" strokeWidth="0.5" fill="none" />
      {/* Dynamic progress ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="cyan"
        strokeWidth="2"
        fill="none"
        strokeDasharray={`${progress} ${100 - progress}`}
        strokeDashoffset="25"
        className="animate-pulse"
      />
    </svg>

    {/* Rotating Knob */}
    <motion.div
      ref={knobRef}
      {...bind()}
      className="absolute w-72 h-72 rounded-full cursor-grab shadow-lg z-30 ml-3 mt-3"
      style={{ rotate: rotation }}
      animate={{ rotate: rotation }}
      transition={{ type: 'stiffness', stiffness: 80, damping: 1, duration: 0.1 }}
      
    >
      {/* Radial Ticks (20 lines around the knob) */}
      <svg className="absolute top-0 left-0 w-full h-full z-20" viewBox="0 0 100 100">
        {[...Array(20)].map((_, index) => (
          <line
            key={index}
            x1="50"
            y1="5"
            x2="50"
            y2="8"
            stroke="cyan"
            strokeWidth="0.5"
            transform={`rotate(${index * 18} 50 50)`}
            className="opacity-60"
          />
        ))}
      </svg>
    </motion.div>


    {/* Glowing Circles in the Background */}
    <div className="absolute w-full h-full flex justify-center items-center z-0">
      <div className="w-72 h-72 rounded-full border border-cyan-400 opacity-20"></div>
    </div>

    {/* Additional Glowing Pulsing Layer */}
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-0">
      <div className="w-80 h-80 border-4 border-cyan-500 rounded-full animate-pulse" />
    </div>

    {/* New Layered Effect: Outer Segment Circles */}
    <div className="absolute top-0 left-0 w-full h-full z-5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(6)].map((_, index) => (
          <circle
            key={index}
            cx="50"
            cy="50"
            r={`${40 + index * 2}`}
            stroke="cyan"
            strokeWidth="0.2"
            fill="none"
            opacity={0.2}
            className="animate-pulse"
          />
        ))}
      </svg>
    </div>

    {/* New Moving Lines and Arcs */}
    <div className="absolute top-0 left-0 w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full z-10">
        <path
          d="M 50,10 A 40,40 0 0,1 50,90"
          stroke="cyan"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="5,5"
          className="opacity-50 animate-move"
        />
        <path
          d="M 50,90 A 40,40 0 0,0 50,10"
          stroke="cyan"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="5,5"
          className="opacity-50 animate-move"
        />
      </svg>
    </div>

    {/* Layered Arc Rings */}
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="43" stroke="cyan" strokeWidth="0.8" fill="none" opacity="0.6" />
        <circle cx="50" cy="50" r="39" stroke="cyan" strokeWidth="0.4" fill="none" opacity="0.4" />
      </svg>
    </div>

    {/* Central Glow */}
    <div className="absolute w-28 h-28 rounded-full bg-cyan-400 opacity-20 blur-xl"></div>

    {/* Outer Glow Lines */}
    <div className="absolute w-full h-full flex justify-center items-center">
      <div className="w-72 h-72 rounded-full border-2 border-cyan-200 opacity-30 animate-spin-slow" />
    </div>
  </div>
</div>

        </motion.div>

        
    <motion.div initial={{ translateX: 450, opacity: 0, scale: 0.5 }}
      animate={{ translateX: 0, opacity: 1, scale: 0.85 }}
      exit={{ translateX:  450, opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1}}
      className="absolute flex justify-left px-10 -top-28 right-72">
         <div className="flex flex-col space-y-20 w-96  scale-75 py-32">
          <CentralCore page="stats" messageIndex={messageIndex} setMessageIndex={setMessageIndex}/>
          </div>  
       
        </motion.div>
       

  
  
        {/* Radial Gauges */}
        
      <motion.div
        initial={{ opacity: 0, translateX: -200 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -200 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="absolute top-20 left-10 flex space-x-8"
      >
    
          <RadialGauge value={Math.round(44 + ((Math.round(progress) * 0.3)))} label="CPU" />
          <RadialGauge value={Math.round(67 + ((Math.round(progress) * 0.2)))} label="RAM" />
          <RadialGauge value={Math.round(56 - ((Math.round(progress) * 0.4)))} label="SWAP" />

        </motion.div>
  
    
        <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -800, right: 800, top: 10, bottom: 950 }}
      whileHover={{ scale: 0.9 }}
      initial={{ scale: 0.8,  translateY: -100 }}
      animate={{ opacity: 1, scale: 0.8, translateY: 10 }}
      exit={{ opacity: 0}}
      transition={{ delay: 0.7}}
      className='cursor-grab active:cursor-grabbing absolute -top-48 right-2/3'
    >

        <MissionStatusPanel />
      </motion.div>

         {/* Horizontal Progress Bars */}
         <motion.div
        initial={{ opacity: 0, translateX: -200 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -200 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="absolute bottom-96 left-10 space-y-4 grid grid-rows-3"
      >
        <div>
        <SegmentedProgressBar value={75} label="Engine Calibration" />  
        </div>
        <div>
        <SegmentedProgressBar value={91} label="Core Power Output" /> 
        </div>
        <div>
        <SegmentedProgressBar value={59} label="Thermal Regulation" />  
        </div>
      
      </motion.div>

      {/* Side Panel for System Info */}

      <motion.div
        initial={{ opacity: 0, translateY: 200 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 200 }}
        transition={{ duration: 0.3 }}
        className="absolute right-9 top-20 w-64 h-[calc(100vh-102px)] p-4 bg-opacity-50  shadow-xl border-l-2 border-cyan-700/80 pt-44 pointer-events-none"
      >
      <TechCircle colorPrime={'border-cyan-400/85'} colorSecond={'border-cyan-700/85'}/>
      <div className="pt-10 grid grid-rows-4 scale-90 -ml-4">
        <div>
        <SegmentedProgressBar value={81}  />  
        </div>
        <div>
        <SegmentedProgressBar value={64} /> 
        </div>
        <div>
        <SegmentedProgressBar value={32}  />  
        </div>
        <div>
        <SegmentedProgressBar value={87}  />  
        </div>
      </div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, translateX: 200 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: 200 }}
        transition={{ duration: 0.3 }}
        className="absolute right-40 top-9 w-52 h-52 pt-16 bg-gray-800 bg-opacity-50  shadow-xl rounded-full text-center backdrop-blur-lg"
      >
        <h3 className="text-lg font-semibold text-cyan-400">System Info</h3>
        <p className="text-sm text-gray-300">Temperature: 42°C</p>  {/* Example values */}
        <p className="text-sm text-gray-300">Uptime: 3 hours 21 minutes</p>
      </motion.div>


      <motion.div
        initial={{ translateY: 300 }}
        animate={{ translateY: 0 }}
        exit={{ translateY: 300 }}
        transition={{ duration: 0.3}}
        className="absolute bottom-8 right-[23%] cursor-grab active:cursor-grabbing"
        drag
      dragElastic={0.2}
      dragConstraints={{ left: -1100, right: 200, top: -700, bottom: 100 }}
      whileHover={{ scale: 1.1}}
      >
        <Tilt  tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.01}>
          <div className=""
        
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}>
            <MovingLineChart />
       </div>
       </Tilt>
      </motion.div>

      {/* Circular Buttons */}
    
        <div className="absolute top-72 left-96">
          <CircularButton label="amp" value={Math.round(35 + ((Math.round(progress) * 0.5)))}/>
        </div>

        <div className="absolute top-40 left-[37%]">
          <CircularButton label="range" value={(Math.round(66 - ((Math.round(progress) * 0.5)))) + 15}/>
        </div>


          <FuturisticPanel />
  

        



      {/* Network Status */}
  
      <motion.div
        initial={{ opacity: 0, translateX: -200 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -200 }}
        transition={{ duration: 0.3 }}
        drag
        dragElastic={0.2}
        dragConstraints={{ left: -100, right: 1300, top: -700, bottom: 100 }}
        >
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.1} className="absolute bottom-20 left-10 w-64 pb-4 bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-xl rounded-lg cursor-grab active:cursor-grabbing">
        <div className='p-4 '>
        <h3 className="text-lg font-semibold text-cyan-400">Network Status</h3>
        <p className="text-sm text-gray-300">Download: 450 Mbps</p>  {/* Example values */}
        <p className="text-sm text-gray-300 pb-4">Upload: 120 Mbps</p>
        </div>
        <TechCircle colorPrime={'border-cyan-400/85'} colorSecond={'border-cyan-700/85'}  label="92"/>
        </Tilt>
      </motion.div>


      
          <DataPanel />
        

      

        <div  className="w-40  absolute bottom-14 right-10 pl-10"
      >
        <BackButton slide="right" clickTo={() => onSwitchLayout('dashboard')} />
      </div>
      </div>
    );
  };
  

export default SystemStatusLayout