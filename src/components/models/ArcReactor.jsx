"use client";
import React, { useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';
import Loader from '../Loader';

const ReactorModel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    camera.position.set(0, 20, 500);
 
    let clock = new THREE.Clock();


    // Only append renderer to the mountRef if it exists
    if (mountRef.current) {
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add ambient and directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('white', 5);
    directionalLight.position.set(0, 2, 5);
    scene.add(directionalLight);

    // Load the GLTF model
    let model;
    const loader = new GLTFLoader();
    loader.load(
      './reactor.glb',
      (gltf) => {
       model = gltf.scene;
       
        model.position.set(-40, 10, 0);
        model.rotation.y = 90;
        model.rotation.x = 20;
        model.rotation.z = THREE.MathUtils.degToRad(5);
        scene.add(model);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
      (error) => console.error('An error occurred while loading the model:', error)
    );

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.rotateSpeed = 2;
    // Constrain rotation angles
    controls.maxPolarAngle = Math.PI / 1.5; // Limits vertical rotation (between 0 and 180 degrees)
    controls.minPolarAngle = Math.PI / 2;
    controls.maxAzimuthAngle = Math.PI / 10; // Limits horizontal rotation (left boundary)
    controls.minAzimuthAngle = -Math.PI / 8; // Limits horizontal rotation (right boundary)

    const resizeRendererToDisplaySize = () => {
      if (mountRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

    // Floating effect
    if (model) {
      const elapsedTime = clock.getElapsedTime();
      model.position.y = 10 + Math.sin(elapsedTime) * 3; // Adjust amplitude and frequency as needed
      model.rotation.z += 0.003; 
    }

    controls.update();
    resizeRendererToDisplaySize();
    renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} className='cursor-grab active:cursor-grabbing' />;
};

export default ReactorModel;
