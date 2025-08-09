import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float, useTexture, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  color?: string;
}

function AnimatedCard({ intensity = 1, color = '#00ff88' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      meshRef.current.scale.setScalar(hovered ? 1.05 : 1);
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.2}>
      <RoundedBox
        ref={meshRef}
        args={[4, 2.5, 0.2]}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.1}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color={color}
          transparent
          opacity={0.8}
        />
      </RoundedBox>
    </Float>
  );
}

export function ThreeCard({ children, className, intensity = 1, color = '#00ff88' }: Card3DProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl', className)}>
      <div className="absolute inset-0 h-full w-full">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color={color} intensity={intensity} />
          <AnimatedCard intensity={intensity} color={color} />
        </Canvas>
      </div>
      <div className="relative z-10 p-6 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl">
        {children}
      </div>
    </div>
  );
}

interface FloatingTextProps {
  text: string;
  size?: number;
  color?: string;
  position?: [number, number, number];
}

function FloatingText3D({ text, size = 1, color = '#ffffff', position = [0, 0, 0] }: FloatingTextProps) {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.2}>
      <Text
        ref={textRef}
        position={position}
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {text}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
        />
      </Text>
    </Float>
  );
}

interface ThreeTextProps {
  text: string;
  className?: string;
  size?: number;
  color?: string;
  height?: string;
}

export function ThreeText({ text, className, size = 1, color = '#00ff88', height = '200px' }: ThreeTextProps) {
  return (
    <div className={cn('relative w-full', className)} style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color={color} intensity={0.5} />
        <FloatingText3D text={text} size={size} color={color} />
      </Canvas>
    </div>
  );
}