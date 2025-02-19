import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from "framer-motion";

function ModelRetrieve({ mouse, setIsLoaded }) {
  const { scene } = useGLTF('/models/gaming_desktop_pc/scene.gltf', true);

  const modelRef = useRef();

  // Mark model as loaded once it's ready
  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  // Set initial position
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(-10, -6, -2);
    }
  }, []);

  // Animate the model based on mouse movement
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.x = THREE.MathUtils.lerp(modelRef.current.position.x, mouse.x * 3, 0.05);
      modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, -mouse.y * 3, 0.05);
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.5} />;
}

const Model = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!canvasRef.current) return;
      const { left, top, width, height } = canvasRef.current.getBoundingClientRect();
      const x = ((event.clientX - left) / width) * 2 - 1;
      const y = -((event.clientY - top) / height) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Canvas ref={canvasRef} className='' camera={{ position: [25, 5, 0], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 10, 5]} intensity={1.5} />

      {/* Loading Animation */}
      {!isLoaded && (
        <Html>
          <div className=" flex items-center space-x-1">
            <span className='text-base md:text-lg lg:text-xl'>Loading</span>
            <motion.span
              className="dot-animation text-lg md:text-2xl lg:text-4xl pb-0 max-md:pb-1 max-lg:pb-2"
              animate={{ opacity: [0.3, 1, 0.3], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            >.</motion.span>
            <motion.span
              className="dot-animation text-lg md:text-2xl lg:text-4xl pb-0 max-md:pb-1 max-lg:pb-2"
              animate={{ opacity: [0.3, 1, 0.3], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2, ease: "easeInOut" }}
            >.</motion.span>
            <motion.span
              className="dot-animation text-lg md:text-2xl lg:text-4xl pb-0 max-md:pb-1 max-lg:pb-2"
              animate={{ opacity: [0.3, 1, 0.3], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4, ease: "easeInOut" }}
            >.</motion.span>
          </div>
        </Html>
      )}

      <Suspense fallback={null}>
        <ModelRetrieve mouse={mouse} setIsLoaded={setIsLoaded} />
        <OrbitControls target={[0, 5, 0]} enablePan={false} />
      </Suspense>
    </Canvas>
  );
};

export default Model;
