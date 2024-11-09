"use client";
import React, { useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';
import Loader from '../Loader';

const HelmetModel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    camera.position.set(0, 1, 350);
    
    // Only append renderer to the mountRef if it exists
    if (mountRef.current) {
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add ambient and directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 20);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('gray', 60);
    directionalLight.position.set(0, 2, 5);
    scene.add(directionalLight);

    const backDirectionalLight = new THREE.DirectionalLight('cyan', 20);
    backDirectionalLight.position.set(0, 2, -200);
    scene.add(backDirectionalLight);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load(
      'https://d1rz0mlg9ltl84.cloudfront.net/helmet/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.09, 0.09, 0.09);
        model.position.set(0, 0, 20);
        scene.add(model);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
      (error) => console.error('An error occurred while loading the model:', error)
    );

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;

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

  return <div ref={mountRef} style={{ width: '150px', height: '150px', marginTop: '-25px' }} />;
};

export default HelmetModel;
