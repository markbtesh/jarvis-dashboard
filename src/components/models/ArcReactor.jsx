"use client";
import React, { useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {  OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from '../Loader';

const ReactorModel = () => {
  const modelRef = useRef();
  const { scene } = useGLTF('https://d1rz0mlg9ltl84.cloudfront.net/reactor.glb'); // Load the GLTF model using useGLTF

  // Floating animation effect
  useFrame(() => {
    if (modelRef.current) {
      const elapsedTime = performance.now() * 0.001; // Use performance.now() for a smoother animation
      modelRef.current.position.y = 10 + Math.sin(elapsedTime) * 3; // Adjust amplitude and frequency as needed
      modelRef.current.rotation.z += 0.003; // Continuous rotation
    }
  });

  // Set the initial position and rotation of the model
  scene.position.set(-40, 10, 0);
  scene.rotation.y = 90;
  scene.rotation.x = 20;
  scene.rotation.z = THREE.MathUtils.degToRad(5);

  return <primitive ref={modelRef} object={scene} />;
};

const ReactorScene = () => {
  return (
    <Canvas camera={{ position: [0, 20, 500], fov: 35 }} style={{ width: '100vw', height: '100vh' }} className='cursor-grab active:cursor-grabbing'>
      {/* Lighting setup */}
      <ambientLight intensity={5} />
      <directionalLight position={[0, 2, 5]} intensity={5} color="white" />

      {/* Model */}
      <Suspense fallback={<Loader />}>
        <ReactorModel />
      </Suspense>

      {/* Controls */}
      <OrbitControls
        enableDamping
        enableZoom={false}
        enablePan={false}
        autoRotate
        rotateSpeed={10}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 2}
        maxAzimuthAngle={Math.PI / 10}
        minAzimuthAngle={-Math.PI / 8}
      />
      <Preload all />
    </Canvas>
  );
};

export default ReactorScene;