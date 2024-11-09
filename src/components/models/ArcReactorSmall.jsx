"use client"

import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from '../Loader';

const ArcReactor2D = () => {
    return (
      <div className="absolute flex justify-center items-center w-24 h-24 ml-10">
        {/* Outer Glowing Ring */}
        <div className="absolute w-full h-full animate-pulse rounded-full opacity-30 bg-cyan-400 filter blur-2xl" />
  
        {/* Outer Circles and Rings */}
        <svg
          className="relative z-10 animate-spin-slow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="240"
          height="240"
        >
          {/* Outer Ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#00FFFF"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Inner Glowing Core */}
          <circle
            cx="50"
            cy="50"
            r="12"
            className=""
            fill="#00FFFF"
            opacity="0.5"
          />
          
          {/* Middle Detailed Ring */}
          <g fill="none" stroke="#00FFFF" strokeWidth="2">
            <polygon points="50,5 70,35 30,35" />
            <polygon points="50,95 70,65 30,65" />
            <polygon points="5,50 35,70 35,30" />
            <polygon points="95,50 65,30 65,70" />
          </g>
  
         
        </svg>
  
        {/* Additional Core Glow Effect */}
        <div className="absolute w-24 h-24 rounded-full bg-cyan-400 filter blur-lg opacity-50 z-0" />
      </div>
    );
  };

// Reactor Core component with rotating inner parts
function ReactorCore() {
  const coreRef = useRef();
  const ringRef = useRef();
  const smallRingRef = useRef();

  // Rotate the core over time
  useFrame(() => {
    coreRef.current.rotation.y -= 0.01; // Rotate the core slowly
    ringRef.current.rotation.z -= 0.02; // Rotate the outer ring
    smallRingRef.current.rotation.x -= 0.015; // Rotate the inner ring
  });

  useEffect(() => {
    // Assume layout transition takes 0.5 seconds (500ms)
    setTimeout(() => {
      // Trigger a resize or update
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }, []);

  return (
    <group ref={coreRef}>
      {/* Core */}
      <mesh>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Outer rotating ring */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[3.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
      </mesh>

      {/* Inner smaller rotating ring */}
      <mesh ref={smallRingRef}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

// Glowing Arc Reactor core
function GlowingArcReactor() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
    </mesh>
  );
}

// Arc Reactor 3D Component
export default function ArcReactorSmall() {
  return (
    <div >
      
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ width: '100%', height: '12vh', marginTop: '5px' }}
      
    >
         <Suspense fallback={<CanvasLoader/>}>
      {/* Reactor core */}
      <ReactorCore />

      {/* Glowing core */}
      <GlowingArcReactor />

      {/* Lights */}
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <ambientLight intensity={0.3} />
      <spotLight position={[0, 5, 5]} angle={0.5} penumbra={1} intensity={2} castShadow />

      {/* Orbital Controls for interaction */}
      <OrbitControls enableZoom={false} />
      </Suspense>
      <Preload all />
    </Canvas>
    </div>
  );
}
