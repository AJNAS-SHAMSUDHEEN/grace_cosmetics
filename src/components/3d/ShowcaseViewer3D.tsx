import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { LuxuryBottle3D } from './LuxuryBottle3D';
import { RotateCw, Sun, Sparkles, Layers } from 'lucide-react';

interface ShowcaseViewer3DProps {
  finish: 'gold' | 'rosegold' | 'obsidian' | 'platinum';
  onFinishChange: (finish: 'gold' | 'rosegold' | 'obsidian' | 'platinum') => void;
  productName: string;
}

export const ShowcaseViewer3D: React.FC<ShowcaseViewer3DProps> = ({
  finish,
  onFinishChange,
  productName,
}) => {
  const [lightMode, setLightMode] = useState<'studio' | 'dramatic' | 'ethereal'>('studio');
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden glass-card border border-luxury-gold/25 p-4 flex flex-col justify-between">
      {/* Top Controls Overlay */}
      <div className="relative z-10 flex items-center justify-between w-full p-2">
        <div className="flex items-center space-x-2 bg-luxury-dark/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-luxury-gold/20 text-xs text-luxury-champagne">
          <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-spin-slow" />
          <span className="font-mono uppercase tracking-wider text-[11px]">Realtime 3D Engine • Three.js</span>
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Auto Rotation"
            className={`p-2 rounded-full border transition-all ${
              autoRotate
                ? 'bg-luxury-gold/20 border-luxury-gold text-luxury-gold'
                : 'bg-luxury-dark/60 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              const modes: ('studio' | 'dramatic' | 'ethereal')[] = ['studio', 'dramatic', 'ethereal'];
              const next = modes[(modes.indexOf(lightMode) + 1) % modes.length];
              setLightMode(next);
            }}
            title={`Lighting: ${lightMode}`}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-luxury-dark/60 border border-white/10 hover:border-luxury-gold/40 text-xs text-luxury-ivory transition-all"
          >
            <Sun className="w-3.5 h-3.5 text-luxury-gold" />
            <span className="capitalize text-[11px] font-mono">{lightMode}</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.2, 4.8], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            {/* Dynamic Lighting Presets */}
            {lightMode === 'studio' && (
              <>
                <ambientLight intensity={0.9} />
                <directionalLight position={[4, 5, 4]} intensity={2.4} color="#FFF8EB" />
                <directionalLight position={[-4, -1, -3]} intensity={1.2} color="#D4AF37" />
                <pointLight position={[0, 4, -4]} intensity={2.6} color="#FFEBB8" />
              </>
            )}

            {lightMode === 'dramatic' && (
              <>
                <ambientLight intensity={0.3} />
                <spotLight position={[5, 8, 4]} angle={0.3} penumbra={0.9} intensity={4.5} color="#FFE29A" />
                <pointLight position={[-4, 2, -3]} intensity={1.8} color="#C5A059" />
                <pointLight position={[0, -3, 3]} intensity={2.0} color="#8C6D46" />
              </>
            )}

            {lightMode === 'ethereal' && (
              <>
                <ambientLight intensity={0.7} />
                <directionalLight position={[0, 6, 2]} intensity={2.8} color="#FFFFFF" />
                <pointLight position={[-3, 0, 3]} intensity={2.0} color="#E8A598" />
                <pointLight position={[3, -1, -2]} intensity={2.2} color="#B0E0E6" />
              </>
            )}

            <Float speed={autoRotate ? 2.5 : 0} rotationIntensity={0.2} floatIntensity={0.4}>
              <LuxuryBottle3D finish={finish} scale={1.12} rotationSpeed={autoRotate ? 0.8 : 0} />
            </Float>

            <OrbitControls
              enableZoom={true}
              minDistance={3.2}
              maxDistance={6.5}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.6}
              minPolarAngle={Math.PI / 2.8}
              dampingFactor={0.06}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Interactive Materials Bar & Product Title */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-3 p-3 bg-luxury-dark/80 backdrop-blur-xl rounded-2xl border border-luxury-gold/20">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold block">
            Interactive Formulation
          </span>
          <h4 className="font-serif text-base text-luxury-ivory tracking-wide">{productName}</h4>
        </div>

        {/* Finish Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-white/50 mr-1 hidden sm:inline">Vessel Edition:</span>
          {(
            [
              { id: 'gold', name: '24K Solar Gold', color: '#D4AF37' },
              { id: 'rosegold', name: 'Rose Nectar', color: '#B76E79' },
              { id: 'obsidian', name: 'Obsidian Noir', color: '#2A2522' },
              { id: 'platinum', name: 'Pure Platinum', color: '#DCDCDC' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => onFinishChange(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                finish === item.id
                  ? 'bg-luxury-gold/25 border border-luxury-gold text-luxury-ivory shadow-lg shadow-luxury-gold/20'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block border border-white/30"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px]">{item.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

