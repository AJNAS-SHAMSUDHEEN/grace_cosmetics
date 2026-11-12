import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { LuxuryBottle3D } from '../3d/LuxuryBottle3D';
import { Sparkles, Dna, Droplets, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

interface Chapter {
  id: number;
  phase: string;
  title: string;
  subTitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  finish: 'gold' | 'rosegold' | 'obsidian' | 'platinum';
  accentIcon: any;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    phase: 'CHAPTER 01',
    title: 'Cryogenic Molecular Extraction',
    subTitle: 'Sub-Zero Botanical Harvesting',
    description: 'At -40°C in cleanroom bio-chambers, alpine rose extremophytes release native stem cells without thermal degradation.',
    metric: '99.8%',
    metricLabel: 'Polyphenol Integrity Retained',
    finish: 'gold',
    accentIcon: Droplets,
  },
  {
    id: 2,
    phase: 'CHAPTER 02',
    title: 'The Triskin Triple-Vector Matrix',
    subTitle: 'Biomimetic Cellular Signaling',
    description: 'Three micro-crystallized signal peptides navigate through intercellular lipid bilayers, awakening dormant fibroblast respiration.',
    metric: '+48%',
    metricLabel: 'Pro-Collagen Helix Synthesis',
    finish: 'rosegold',
    accentIcon: Dna,
  },
  {
    id: 3,
    phase: 'CHAPTER 03',
    title: '24K Colloidal Photonic Suspension',
    subTitle: 'Micro-Spheric Cellular Vectors',
    description: 'Suspended in pure colloidal gold micro-spheres that scatter ambient light while acting as targeted cellular delivery conduits.',
    metric: '2.4x',
    metricLabel: 'Enhanced Bio-Assimilation Rate',
    finish: 'obsidian',
    accentIcon: Sparkles,
  },
  {
    id: 4,
    phase: 'CHAPTER 04',
    title: 'Cellular Resurrection & Density',
    subTitle: '14-Day Architectural Reset',
    description: 'The stratum corneum is fortified, moisture capacity is increased by 210%, and dermal contours are visibly sculpted.',
    metric: '14 Days',
    metricLabel: 'Clinical Cellular Transformation',
    finish: 'platinum',
    accentIcon: ShieldCheck,
  },
];

interface CinematicScrollJourneyProps {
  onExploreProducts: () => void;
}

export const CinematicScrollJourney: React.FC<CinematicScrollJourneyProps> = ({ onExploreProducts }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const activeChapter = CHAPTERS[activeChapterIndex];
  const IconComponent = activeChapter.accentIcon;

  return (
    <section className="py-24 relative bg-gradient-to-b from-luxury-dark via-luxury-espresso to-luxury-dark border-t border-luxury-gold/15 overflow-hidden">
      {/* Dynamic Ambient Background Glow based on chapter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-luxury-gold/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.25em] text-luxury-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cinematic 3D Scroll Journey</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-luxury-ivory tracking-tight">
            The Metamorphosis of Beauty
          </h2>
          <p className="text-sm font-sans text-white/60">
            Journey through the four clinical phases of cellular skincare engineering. Interact with the living formulation in realtime.
          </p>
        </div>

        {/* Chapter Steps Navigator */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-12 overflow-x-auto pb-2 no-scrollbar">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapterIndex(idx)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-500 flex items-center space-x-2 ${
                activeChapterIndex === idx
                  ? 'bg-luxury-gold text-luxury-dark font-bold shadow-xl shadow-luxury-gold/25 scale-105'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <span>0{ch.id}</span>
              <span className="hidden md:inline">/ {ch.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card rounded-3xl p-6 sm:p-12 border border-luxury-gold/25 shadow-2xl">
          {/* LEFT: 3D Render Canvas with Dynamic Finish based on Chapter (7 cols) */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] w-full flex items-center justify-center">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 42 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.9} />
              <directionalLight position={[4, 5, 4]} intensity={2.5} color="#FFF8EB" />
              <directionalLight position={[-4, -2, -3]} intensity={1.5} color="#D4AF37" />
              <pointLight position={[0, 4, -4]} intensity={2.6} color="#FFEBB8" />

              <Float speed={2.4} rotationIntensity={0.3} floatIntensity={0.5}>
                <LuxuryBottle3D
                  finish={activeChapter.finish}
                  scale={1.1}
                  rotationSpeed={0.9}
                />
              </Float>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 1.7}
                minPolarAngle={Math.PI / 2.6}
              />
            </Canvas>

            {/* Stage Indicator Floating Pill */}
            <div className="absolute top-4 left-4 bg-luxury-dark/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-luxury-gold/30 text-xs font-mono text-luxury-gold flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-luxury-gold animate-ping" />
              <span>{activeChapter.phase} Active State</span>
            </div>
          </div>

          {/* RIGHT: Chapter Narrative & Clinical Metric (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-luxury-gold uppercase tracking-[0.2em]">
                <IconComponent className="w-4 h-4" />
                <span>{activeChapter.phase}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-luxury-ivory font-light leading-snug">
                {activeChapter.title}
              </h3>
              <p className="text-xs font-mono text-luxury-champagne tracking-wider">
                {activeChapter.subTitle}
              </p>
            </div>

            <p className="text-sm font-sans text-white/70 leading-relaxed">
              {activeChapter.description}
            </p>

            {/* Huge Scientific Proof Metric Callout */}
            <div className="p-6 rounded-2xl bg-luxury-espresso/80 border border-luxury-gold/20 flex items-center justify-between">
              <div>
                <span className="font-serif text-4xl sm:text-5xl text-luxury-gold font-light block">
                  {activeChapter.metric}
                </span>
                <span className="text-xs font-mono text-white/60 uppercase tracking-wider block mt-1">
                  {activeChapter.metricLabel}
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                <IconComponent className="w-6 h-6" />
              </div>
            </div>

            {/* Next Chapter or Explore CTA */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() =>
                  setActiveChapterIndex((prev) => (prev + 1) % CHAPTERS.length)
                }
                className="text-xs font-mono uppercase tracking-widest text-luxury-gold hover:text-luxury-lightGold flex items-center space-x-1.5 transition-colors"
              >
                <span>Advance to Next Phase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onExploreProducts}
                className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-luxury-gold hover:text-luxury-dark border border-luxury-gold/30 text-xs font-mono uppercase tracking-wider text-luxury-ivory transition-all"
              >
                View Formulation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

