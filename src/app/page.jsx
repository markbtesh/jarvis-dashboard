"use client"

// pages/index.js
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import SuitsLayout from '../components/SuitsLayout';
import MissionsLayout from '@/components/MissionsLayout';
import SystemStatusLayout from '@/components/SystemStatusLayout';
import ArcReactorLayout from '@/components/ArcReactorLayout';
import { useGLTF } from '@react-three/drei';

export default function Home() {
  const [layout, setLayout] = useState('dashboard'); // Manage the layout state here
  const [greeted, setGreeted] = useState(false);
  const boop = './boop.mp3';
  const pageRef = useRef(null);

  const [messageIndex, setMessageIndex] = useState({
    dashboard: 0,
    suits: 0,
    missions: 0,
    stats: 0,
    arc: 0,
  });

  const playSound = (src) => {
    const sound = new Audio(src);
    sound.play();
  };

  const switchLayout = (layoutName) => {
    setLayout(layoutName); // Function to switch 
    playSound(boop);
  };

  return (
    <div ref={pageRef} className=''>
   
 

       <div className="absolute bg-black pulse-inset w-full">
      <AnimatePresence mode='wait'>
        {layout === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            
            transition={{ duration: 0.5 }}
          >
            <DashboardLayout onSwitchLayout={switchLayout} greeted={greeted} setGreeted={setGreeted} messageIndex={messageIndex} setMessageIndex={setMessageIndex}/> {/* Pass the function to DashboardLayout */}
          </motion.div>
        )}
        {layout === 'suits' && (
          <motion.div
            key="suits"
            
          >
            <SuitsLayout onSwitchLayout={switchLayout} messageIndex={messageIndex} setMessageIndex={setMessageIndex}/> {/* Optional: Add to SuitsLayout if needed */}
          </motion.div>
        )}
         {layout === 'missions' && (
          <motion.div
            key="missions"
            
          >
            <MissionsLayout onSwitchLayout={switchLayout} messageIndex={messageIndex} setMessageIndex={setMessageIndex} /> 
          </motion.div>
        )}
          {layout === 'system' && (
          <motion.div
            key="system"
            
          >
            <SystemStatusLayout onSwitchLayout={switchLayout}  messageIndex={messageIndex} setMessageIndex={setMessageIndex}/> 
          </motion.div>
        )}

          {layout === 'arc' && (
          <motion.div
            key="arc"
            
          >
            <ArcReactorLayout onSwitchLayout={switchLayout}  messageIndex={messageIndex} setMessageIndex={setMessageIndex}/> 
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}


  
useGLTF.preload('https://d1rz0mlg9ltl84.cloudfront.net/ironman1/scene.gltf');
useGLTF.preload('https://d1rz0mlg9ltl84.cloudfront.net/ironman_big.glb');
useGLTF.preload('https://d1rz0mlg9ltl84.cloudfront.net/ironman_silver.glb');
useGLTF.preload('https://d1rz0mlg9ltl84.cloudfront.net/ironman4.glb');
