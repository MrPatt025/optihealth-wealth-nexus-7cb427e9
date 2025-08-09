import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GeometricShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}

function GeometricShape({ position, color, speed = 1 }: GeometricShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.6}
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.9}
      />
    </Sphere>
  );
}

function ParticleWave() {
  const mesh = useRef<THREE.Points>(null);
  const count = 2000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Create a gradient of colors
      const color = new THREE.Color();
      color.setHSL((i / count) * 0.3 + 0.5, 0.8, 0.6);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const y = positions[i * 3 + 1];
        positions[i * 3 + 1] = y + Math.sin(state.clock.elapsedTime + i * 0.01) * 0.01;
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={mesh} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.2}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function BackgroundScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} color="#ff006e" intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#00ff88" intensity={0.3} />
      <pointLight position={[0, 0, -10]} color="#8338ec" intensity={0.3} />
      
      <ParticleWave />
      
      <GeometricShape position={[-8, 2, -5]} color="#ff006e" speed={0.8} />
      <GeometricShape position={[8, -2, -3]} color="#00ff88" speed={1.2} />
      <GeometricShape position={[0, 4, -7]} color="#8338ec" speed={1.5} />
      <GeometricShape position={[-5, -3, -4]} color="#3a86ff" speed={0.9} />
      <GeometricShape position={[6, 3, -6]} color="#06ffa5" speed={1.1} />
    </>
  );
}

interface ThreeBackgroundProps {
  className?: string;
  opacity?: number;
}

export default function ThreeBackground({ className = '', opacity = 0.7 }: ThreeBackgroundProps) {
  return (
    <div 
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
      >
        <BackgroundScene />
      </Canvas>
    </div>
  );
}

interface InteractiveBackgroundProps {
  className?: string;
  intensity?: number;
}

export function InteractiveBackground({ className = '', intensity = 1 }: InteractiveBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.1 * intensity} />
        <directionalLight position={[10, 10, 5]} intensity={0.5 * intensity} />
        <pointLight position={[-10, -10, -10]} color="#ff006e" intensity={0.3 * intensity} />
        <pointLight position={[10, 10, 10]} color="#00ff88" intensity={0.3 * intensity} />
        
        <ParticleWave />
      </Canvas>
    </div>
  );
}