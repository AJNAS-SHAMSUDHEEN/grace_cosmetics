import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const PastelCosmeticBottles = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle interactive tilt towards pointer
      const targetRotY = state.pointer.x * 0.15;
      const targetRotX = -state.pointer.y * 0.1;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* 1. White Sculptural Minimalist Display Tray */}
      <mesh position={[0.2, -1.25, 0]} receiveShadow>
        <boxGeometry args={[4.4, 0.22, 2.2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Tray subtle lip rim */}
      <mesh position={[0.2, -1.12, 1.05]}>
        <boxGeometry args={[4.4, 0.08, 0.1]} />
        <meshStandardMaterial color="#FAF9F7" roughness={0.3} />
      </mesh>
      <mesh position={[0.2, -1.12, -1.05]}>
        <boxGeometry args={[4.4, 0.08, 0.1]} />
        <meshStandardMaterial color="#FAF9F7" roughness={0.3} />
      </mesh>
      <mesh position={[-1.95, -1.12, 0]}>
        <boxGeometry args={[0.1, 0.08, 2.2]} />
        <meshStandardMaterial color="#FAF9F7" roughness={0.3} />
      </mesh>
      <mesh position={[2.35, -1.12, 0]}>
        <boxGeometry args={[0.1, 0.08, 2.2]} />
        <meshStandardMaterial color="#FAF9F7" roughness={0.3} />
      </mesh>

      {/* 2. Bottle 1 (Left - Pastel White/Soft Lilac Pump Bottle) */}
      <group position={[-0.4, -0.05, 0]}>
        {/* Main Bottle Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 2.1, 36]} />
          <meshStandardMaterial color="#F3EEFA" roughness={0.25} metalness={0.1} />
        </mesh>
        {/* Rounded Cap / Pump Head */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[0.38, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
          <meshStandardMaterial color="#E8DFF5" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Minimalist Pump nozzle collar */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.39, 0.39, 0.12, 36]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>
      </group>

      {/* 3. Bottle 2 (Center - Soft Lavender Dropper/Toner Bottle) */}
      <group position={[0.55, 0.1, -0.1]}>
        {/* Bottle Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 2.3, 36]} />
          <meshStandardMaterial color="#D8CEF0" roughness={0.28} metalness={0.08} />
        </mesh>
        {/* Rounded Cap */}
        <mesh position={[0, 1.35, 0]} castShadow>
          <sphereGeometry args={[0.38, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
          <meshStandardMaterial color="#C8BCDE" roughness={0.25} />
        </mesh>
      </group>

      {/* 4. Bottle 3 (Right - Deeper Lilac Tall Bottle) */}
      <group position={[1.5, 0.25, 0.1]}>
        {/* Bottle Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.44, 0.44, 2.6, 36]} />
          <meshStandardMaterial color="#BFAFE3" roughness={0.3} metalness={0.08} />
        </mesh>
        {/* Cylindrical Flat Cap */}
        <mesh position={[0, 1.45, 0]} castShadow>
          <cylinderGeometry args={[0.44, 0.44, 0.5, 36]} />
          <meshStandardMaterial color="#AFA0D4" roughness={0.25} />
        </mesh>
      </group>

      {/* 5. Clear Fluted Glass / Water Beaker (Foreground Left) */}
      <group position={[-1.2, -0.5, 0.4]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.34, 1.2, 32, 1, true]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transparent
            opacity={0.4}
            roughness={0.08}
            transmission={0.92}
            ior={1.48}
            thickness={0.8}
          />
        </mesh>
        {/* Water inside beaker */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.33, 0.32, 0.75, 32]} />
          <meshPhysicalMaterial
            color="#EAE4F7"
            transparent
            opacity={0.65}
            transmission={0.85}
            ior={1.33}
            roughness={0.05}
          />
        </mesh>
      </group>
    </group>
  );
};

export const LumiereHero3D: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0.4, 5.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        {/* Warm key light */}
        <directionalLight position={[4, 6, 4]} intensity={2.0} color="#FFFFFF" castShadow />
        {/* Soft lilac fill light */}
        <directionalLight position={[-4, 2, 2]} intensity={1.2} color="#E8DFF5" />
        {/* Rim light */}
        <pointLight position={[0, 4, -3]} intensity={1.5} color="#D8CEF0" />

        <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.15}>
          <PastelCosmeticBottles />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.6}
        />
      </Canvas>
    </div>
  );
};

