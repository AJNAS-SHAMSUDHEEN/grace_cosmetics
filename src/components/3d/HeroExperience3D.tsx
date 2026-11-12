import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { LuxuryBottle3D } from './LuxuryBottle3D';

interface HeroExperience3DProps {
  finish?: 'gold' | 'rosegold' | 'obsidian' | 'platinum';
}

export const HeroExperience3D: React.FC<HeroExperience3DProps> = ({ finish = 'gold' }) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {/* Ambient soft studio lighting */}
          <ambientLight intensity={0.8} />

          {/* Key Light (Warm Champagne Gold) */}
          <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFF5E4" castShadow />

          {/* Fill Light (Soft Bronze) */}
          <directionalLight position={[-4, 2, -2]} intensity={1.2} color="#D4AF37" />

          {/* Rim / Backlight for Glass Refraction & Metallic Rim */}
          <pointLight position={[0, 4, -4]} intensity={2.8} color="#FFE6AA" />

          {/* Under-glow for cellular luminescence */}
          <pointLight position={[0, -3, 2]} intensity={1.4} color="#C5A059" />

          {/* Floating 3D Serum Bottle with physics-inspired levitation */}
          <Float
            speed={2.2}
            rotationIntensity={0.3}
            floatIntensity={0.6}
            floatingRange={[-0.15, 0.15]}
          >
            <LuxuryBottle3D finish={finish} scale={1.05} rotationSpeed={0.7} />
          </Float>

          {/* Interactive touch/drag OrbitControls with gentle boundaries */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.6}
            rotateSpeed={0.5}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* Decorative Radial Glass Glow Behind Bottle */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[460px] h-[340px] md:h-[460px] rounded-full -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.22) 0%, rgba(197, 160, 89, 0.05) 45%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(35px)',
        }}
      />
    </div>
  );
};

