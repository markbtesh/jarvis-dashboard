import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const NucleusComponent = ({ onClick }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.5, 2000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const canvasSize = 400;
    renderer.setSize(canvasSize, canvasSize);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    


    
   // Add OrbitControls
   const controls = new OrbitControls(camera, renderer.domElement);
   controls.enableDamping = true;
   controls.dampingFactor = 0.05;
   controls.enableZoom = false;
   controls.enablePan = false;


   // Resize listener for aspect ratio and canvas resizing
   const handleResize = () => {
    const containerWidth = mountRef.current.clientWidth;
    const containerHeight = mountRef.current.clientHeight;
    renderer.setSize(containerWidth, containerHeight);
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', handleResize);
  handleResize();


      // Set up post-processing composer and bloom pass
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
  
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,  // intensity
        0.4,  // radius
        0.85  // threshold
      );
      composer.addPass(bloomPass);

    const particleCount = 9500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = [];
    const particleOpacity = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 5 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particlePositions.push(x, y, z);

      const distanceFromCenter = r / 5;
      particleOpacity.push(1 - distanceFromCenter);
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('alpha', new THREE.Float32BufferAttribute(particleOpacity, 1));


    // Sphere Geometry and Material
    const geometry = new THREE.SphereGeometry(5, 64, 64);
   

    const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          uniform float time;
          attribute float alpha;
          varying float vAlpha;
          varying vec2 vUv;
  
          void main() {
            vUv = uv;
            vec3 pos = position;
  
            // Ripple effect on position for breathing movement
            pos.x += sin(pos.y * 10.0 + time * 2.0) * 0.1;
            pos.y += cos(pos.x * 10.0 + time * 2.0) * 0.1;
  
            vAlpha = alpha;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 3.0; // Size of each particle
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec2 vUv;
          varying float vAlpha;
  
          void main() {
            // Color ripple transition
           vec3 cyanColor = vec3(0.0, 0.9, 1.0);  // Cyan base color
    float brightness = 0.9 + 0.1 * sin(time + vUv.x * 5.0); // Ensure brightness stays between 0.7 and 1.0
    vec3 color = cyanColor * brightness;  // Apply brightness scaling

    gl_FragColor = vec4(color, vAlpha * 0.8);
          }
        `,
        transparent: true,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      particles.frustumCulled = false; // Ensure particles don't disappear when rotated
      scene.add(particles);

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      
      const onTouch = (event) => {
          pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
          pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
          raycaster.setFromCamera(pointer, camera);
          
          const intersects = raycaster.intersectObject(particles);
          if (intersects.length > 0) {
              // Handle interaction, e.g., changing particle colors
          }
      };
      
      // Attach touch event listener
      mountRef.current.addEventListener('pointermove', onTouch);

    
    geometry.computeBoundingSphere();
    camera.position.z = 15;

    const animate = () => {
      particlesMaterial.uniforms.time.value += 0.02;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '50vw',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible'
      }}
     className='cursor-pointer active:cursor-grabbing'
     onClick={onClick}
    />
  );
};

export default NucleusComponent;
