import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Points, 
  PointMaterial, 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial,
  Float,
  Environment,
  Lightformer,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

function ParticleField({ count = 5000, color = '#00ff88' }: ParticleFieldProps) {
  const mesh = useRef<THREE.Points>(null);
  const [sphere] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    
    return [positions];
  }, [count]);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x -= delta / 10;
      mesh.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={mesh} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.3}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

interface FloatingOrbProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}

function FloatingOrb({ position, color, speed = 1 }: FloatingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.8}
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ff006e" intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00ff88" intensity={0.5} />
      
      <Environment preset="city" />
      
      <ParticleField count={3000} color="#00ff88" />
      
      <FloatingOrb position={[-4, 0, 0]} color="#ff006e" speed={0.8} />
      <FloatingOrb position={[4, 2, -2]} color="#8338ec" speed={1.2} />
      <FloatingOrb position={[0, -2, 3]} color="#00ff88" speed={1.5} />
      
      <ContactShadows
        opacity={0.4}
        scale={10}
        blur={1}
        far={10}
        resolution={256}
        color="#000000"
      />
      
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

interface ThreeSceneProps {
  className?: string;
  height?: string;
}

export default function ThreeScene({ className = '', height = '100vh' }: ThreeSceneProps) {
  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}