"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { DRACOLoader } from 'three-stdlib'; 
import { models } from '@/constants';
import Loader from '../Loader';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import ProgressBar from '../ProgressBar';
import Typewriter from '../useTypingEffect';
import TechCircle from '../TechCircle';

const SuitModel = ({ modelPath, scale, position, onClick, opacity = 1 }) => {
  const modelRef = useRef();
  const { scene } = useGLTF(modelPath, true, (loader) => {
    // Configure the DRACOLoader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); // Set the path to the Draco decoder
    loader.setDRACOLoader(dracoLoader);
  });

 // Apply the initial position and other properties
 if (scene) {
  scene.position.set(...position);
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.opacity = opacity;
      child.material.transparent = opacity < 1;
    }
  });
}

  const onHoverStart = () => (document.body.style.cursor = 'pointer');

  // Function to revert cursor to default
  const onHoverEnd = () => (document.body.style.cursor = 'default');
  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={scale}
      position={position}
      onPointerOver={onHoverStart}
      onPointerOut={onHoverEnd}
      onClick={onClick}
  />
  );
};


const SuitPicker = ( ) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [positions, setPositions] = useState(models.map(() => [0.9, -3.5, 0]));
  const animationRef = useRef(null);
  const [isSkipping, setIsSkipping] = useState(false);
  
  const [loadComponent, setLoadComponent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoadComponent(true), (0.5) * 1100); // Adjust buffer as needed
    return () => clearTimeout(timeout);
  }, []);
  

  const getTargetPosition = (index) => {
    const offset = (index - activeIndex) * -5;
    const zOffset = Math.abs(index - activeIndex);
    return [0.9, -3.5, offset + zOffset];
  };

  const animatePosition = (startPosition, endPosition, index) => {
    const duration = 300; // Animation duration in ms
    const steps = 10; // Number of animation steps
    const stepInterval = duration / steps;
    const delta = [
      (endPosition[0] - startPosition[0]) / steps,
      (endPosition[1] - startPosition[1]) / steps,
      (endPosition[2] - startPosition[2]) / steps,
    ];

    let currentStep = 0;

    const animate = () => {
      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[index] = [
          prevPositions[index][0] + delta[0],
          prevPositions[index][1] + delta[1],
          prevPositions[index][2] + delta[2],
        ];
        return newPositions;
      });

      currentStep += 1;
      if (currentStep < steps) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationRef.current);
        setIsSkipping(false)
      }
    };

    animate();
  };

  const nextSuit = () => {
    if(isSkipping) return;

    setIsSkipping(true);
    const newIndex = (activeIndex + 1) % models.length;
    setActiveIndex(newIndex);
    playSound(boop);
  };

  const prevSuit = () => {
    if(isSkipping) return;

    setIsSkipping(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
    playSound(boop);
  };

  useEffect(() => {
    models.forEach((_, index) => {
      const startPosition = positions[index];
      const endPosition = getTargetPosition(index);
      animatePosition(startPosition, endPosition, index);
    });
  }, [activeIndex]);


  const bind = useDrag(
    ({ swipe: [swipeX] }) => {
      if (swipeX === -1) nextSuit(); // Swipe left
      if (swipeX === 1) prevSuit();  // Swipe right
    },
    { axis: 'x' }
  );

  
  useEffect(() => {
    // Assume layout transition takes 0.5 seconds (500ms)
    setTimeout(() => {
      // Trigger a resize or update
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }, []);

  const boop = './boop.mp3';

  const playSound = (src) => {
    const sound = new Audio(src);
    sound.play();
  };


  return (
    <div className='absolute'  {...bind()}>
      <motion.div initial={{ translateX: 0,translateY: 0,  opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{translateX: 200, translateY: 50, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      >
        
      <Canvas camera={{ position: [7, 0, 20], fov: 6 }} style={{ width: '100vw', height: '100vh' }}>
        <ambientLight intensity={0.2} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 2, 5]} intensity={0.8} color="cyan" />
        <directionalLight position={[0, -5, -5]} intensity={0.5} color="#00ffff" />
        <hemisphereLight skyColor={"#ffffff"} groundColor={"#444444"} intensity={0.6} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      
        {models.map((model, index) => (
            <Suspense fallback={<Loader/>}>
            
          <SuitModel
            key={index}
            modelPath={model.path}
            scale={model.scale}
            position={positions[index]}
            opacity={index === activeIndex ? 1 : 0.2} 
            onClick={nextSuit} 
          />
      
             </Suspense>
        ))}
     
        <Preload all />
      </Canvas></motion.div>
      
       
        {/* Glassmorphism Container for Stats */}
        
        <motion.div
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={{ opacity: 1, scaleX: 1 }}
        exit={{ opacity: 0, scaleX: 0.5 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="absolute top-[15%] left-[31%]"
        
      >
        <Tilt tiltAngleYInitial={-10} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.01}>
          <div className=" w-64  bg-opacity-80 bg-white backdrop-blur-lg rounded-xl border border-solid border-white border-opacity-30 shadow-lg p-6"
        
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}>
        <h3 className="text-lg font-bold text-white mb-4">Stats</h3>
        
        <ProgressBar label="Armor" staticValue={models[activeIndex].stats.Armor} />
        <ProgressBar label="Power" staticValue={models[activeIndex].stats.Power} />
        <ProgressBar label="Accuracy" staticValue={models[activeIndex].stats.Accuracy} />
        <ProgressBar label="Speed" staticValue={models[activeIndex].stats.Speed} />
        <ProgressBar label="Durability" staticValue={models[activeIndex].stats.Durability} />
       </div>
       </Tilt>
      </motion.div>



      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="absolute bottom-[-10px]  right-[-10px]"
        
      >
          <div className="w-[60vw] h-[20vh] bg-opacity-80 bg-gray-900 backdrop-blur-lg rounded-tl-full border border-solid border-white border-opacity-30 shadow-lg p-10 pl-16"
        
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}>
        <Typewriter styles="text-4xl font-bold text-white mb-4 number-font pl-20 min-h-[40px]" text={models[activeIndex].name} delay={50}/>

        <div className='flex '>
          <div className='w-3/4 '>
        <ProgressBar label="Core Power Output" initialValue={80} />
        
        </div>

        <div className='ml-10 -mt-16'>
        <TechCircle colorPrime={'border-cyan-400/85'} colorSecond={'border-cyan-700/85'} label=""/>
        </div>
        </div>
       </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        
      >
      <div className="controls absolute bottom-72 text-white grid grid-cols-3 gap-4 w-full text-2xl items-center">
        <div></div>
        <div>
      <button className='bg-gray-800 border border-cyan-400 text-cyan-500 w-20 h-10 rounded-lg shadow-glow border-r-0 border-l-0  hover:bg-gray-900' onClick={prevSuit} disabled={isSkipping}>◄</button>
      <button className='bg-gray-800 border border-cyan-400 text-cyan-500 w-20 h-10 rounded-lg shadow-glow border-r-0 border-l-0 hover:bg-gray-900' onClick={nextSuit} disabled={isSkipping}>►</button>
      </div>
      <div></div>
      </div>
      </motion.div>
    </div>
  );
};


export default SuitPicker;
