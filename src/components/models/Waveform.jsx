"use client"

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Waveform = () => {
    const groupRef = useRef();
    const bars = [];

    const barCount = 50;
    for (let i = 0; i < barCount; i++) {
        bars.push({
            x: (i / barCount) * 10 - 5,
            colorOffset: i / barCount,
        });
    }

    useEffect(() => {
        // Assume layout transition takes 0.5 seconds (500ms)
        setTimeout(() => {
          // Trigger a resize or update
          window.dispatchEvent(new Event('resize'));
        }, 500);
      }, []);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        bars.forEach((bar, index) => {
            const mesh = groupRef.current.children[index];
            const scale = Math.sin(time + bar.x * 3) * 0.5 + 0.5;
            mesh.scale.y = scale;

            const lightness = 10 + bar.colorOffset * 80;
            const cyanColor = new THREE.Color(`hsl(180, 100%, ${lightness}%)`);
            mesh.material.color.set(cyanColor);
        });
    });

    return (
        <group ref={groupRef}>
            {bars.map((bar, index) => (
                <mesh key={index} position={[bar.x, 0, 0]}>
                    <boxGeometry args={[0.1, 1, 0.1]} />
                    <meshStandardMaterial />
                </mesh>
            ))}
        </group>
    );
};

export default function WaveformComponent({ style, fov }) {
    return (
        <div >
     
        <Canvas 
        camera={{ position: [0, 2, 10], fov: fov }}
        style={style}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} intensity={1} />
            <Waveform />
        </Canvas>
        
        </div>
    )
}