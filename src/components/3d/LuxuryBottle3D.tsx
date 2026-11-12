import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LuxuryBottle3DProps {
  finish?: 'gold' | 'rosegold' | 'obsidian' | 'platinum';
  interactive?: boolean;
  scale?: number;
  rotationSpeed?: number;
  floatingAmp?: number;
}

export const LuxuryBottle3D: React.FC<LuxuryBottle3DProps> = ({
  finish = 'gold',
  scale = 1,
  rotationSpeed = 0.5,
  floatingAmp = 0.08,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Palette based on finish
  const finishColors = useMemo(() => {
    switch (finish) {
      case 'rosegold':
        return {
          cap: '#B76E79',
          liquid: '#E8A598',
          accent: '#FAD2E1',
          roughness: 0.18,
          metalness: 0.92,
        };
      case 'obsidian':
        return {
          cap: '#2A2522',
          liquid: '#1E1B18',
          accent: '#C5A059',
          roughness: 0.25,
          metalness: 0.85,
        };
      case 'platinum':
        return {
          cap: '#DCDCDC',
          liquid: '#B0E0E6',
          accent: '#FFFFFF',
          roughness: 0.12,
          metalness: 0.98,
        };
      case 'gold':
      default:
        return {
          cap: '#D4AF37',
          liquid: '#D49B35',
          accent: '#FFF2B2',
          roughness: 0.15,
          metalness: 0.95,
        };
    }
  }, [finish]);

  // Floating ambient micro-particles
  const particleCount = 45;
  const [particlePositions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 2.2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return [pos];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating breathing motion
      groupRef.current.position.y = Math.sin(t * 1.2) * floatingAmp;
      // Ambient rotation
      groupRef.current.rotation.y += delta * (0.35 * rotationSpeed);

      // Subtle mouse tilt reaction
      const targetRotX = state.pointer.y * 0.18;
      const targetRotZ = -state.pointer.x * 0.18;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);
    }

    if (liquidRef.current) {
      // Micro-swirl in serum core
      liquidRef.current.rotation.y = t * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.2, 0]}>
      {/* 1. OUTER HEAVY GLASS BOTTLE */}
      {/* Main glass cylinder body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.92, 0.92, 2.7, 48]} />
        <meshPhysicalMaterial
          color="#FAF8F5"
          transparent
          opacity={0.38}
          roughness={0.06}
          metalness={0.05}
          transmission={0.92}
          thickness={1.4}
          ior={1.52}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
        />
      </mesh>

      {/* Rounded Glass Shoulder */}
      <mesh position={[0, 1.48, 0]}>
        <cylinderGeometry args={[0.52, 0.92, 0.32, 48]} />
        <meshPhysicalMaterial
          color="#FAF8F5"
          transparent
          opacity={0.42}
          roughness={0.08}
          transmission={0.88}
          thickness={1.5}
          ior={1.52}
          clearcoat={1.0}
        />
      </mesh>

      {/* Heavy Solid Glass Base (Luxury cosmetic weight) */}
      <mesh position={[0, -1.48, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.32, 48]} />
        <meshPhysicalMaterial
          color="#FAF8F5"
          transparent
          opacity={0.65}
          roughness={0.05}
          transmission={0.85}
          thickness={2.5}
          ior={1.54}
          clearcoat={1.0}
        />
      </mesh>

      {/* 2. INNER LIQUID CELLULAR CORE */}
      <mesh ref={liquidRef} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 2.35, 36]} />
        <meshPhysicalMaterial
          color={finishColors.liquid}
          emissive={finishColors.liquid}
          emissiveIntensity={0.25}
          transparent
          opacity={0.85}
          roughness={0.12}
          metalness={0.15}
          transmission={0.55}
          ior={1.42}
          clearcoat={0.9}
        />
      </mesh>

      {/* Glass Pipette Tube inside liquid */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 2.5, 24]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transparent
          opacity={0.5}
          roughness={0.05}
          transmission={0.95}
          ior={1.5}
        />
      </mesh>

      {/* 3. METALLIC COLLAR / CAP (Dropper Ring) */}
      <mesh position={[0, 1.78, 0]} castShadow>
        <cylinderGeometry args={[0.54, 0.54, 0.34, 48]} />
        <meshStandardMaterial
          color={finishColors.cap}
          metalness={finishColors.metalness}
          roughness={finishColors.roughness}
        />
      </mesh>

      {/* Ribbed detail ring on collar */}
      <mesh position={[0, 1.98, 0]}>
        <torusGeometry args={[0.54, 0.025, 16, 48]} />
        <meshStandardMaterial
          color={finishColors.accent}
          metalness={finishColors.metalness}
          roughness={0.1}
        />
      </mesh>

      {/* 4. SILICONE DROPPER BULB (Top) */}
      <mesh position={[0, 2.32, 0]} castShadow>
        <sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
        <meshStandardMaterial
          color={finish === 'obsidian' ? '#1A1816' : '#FAF6F0'}
          roughness={0.65}
          metalness={0.08}
        />
      </mesh>

      {/* 5. MINIMAL LUXURY EMBOSSED LABEL (Curved plane on bottle surface) */}
      <mesh position={[0, -0.05, 0.925]}>
        <planeGeometry args={[1.1, 1.6]} />
        <meshStandardMaterial
          color="#161312"
          transparent
          opacity={0.88}
          roughness={0.4}
        />
      </mesh>

      {/* Label Golden Border line */}
      <mesh position={[0, -0.05, 0.93]}>
        <planeGeometry args={[1.02, 1.52]} />
        <meshBasicMaterial
          color={finishColors.cap}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Floating Ambient Golden Dust Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color={finishColors.cap}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Micro Serum Droplets floating nearby */}
      <mesh position={[1.4, 0.6, 0.4]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshPhysicalMaterial
          color={finishColors.liquid}
          emissive={finishColors.liquid}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
          transmission={0.8}
          roughness={0.05}
          ior={1.4}
        />
      </mesh>

      <mesh position={[-1.3, -0.8, 0.6]}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshPhysicalMaterial
          color={finishColors.liquid}
          emissive={finishColors.liquid}
          emissiveIntensity={0.2}
          transparent
          opacity={0.75}
          transmission={0.8}
          roughness={0.05}
          ior={1.4}
        />
      </mesh>

      <mesh position={[1.1, -1.2, -0.5]}>
        <sphereGeometry args={[0.06, 20, 20]} />
        <meshPhysicalMaterial
          color={finishColors.cap}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

