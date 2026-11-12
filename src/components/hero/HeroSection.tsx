import React, { useState } from 'react';
import { HeroExperience3D } from '../3d/HeroExperience3D';
import { ArrowRight, Sparkles, Play, Shield, Droplets } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onDiscoverWorldClick: () => void;
  onQuickViewBottle: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onDiscoverWorldClick,
  onQuickViewBottle,
}) => {
  const [heroFinish, setHeroFinish] = useState<'gold' | 'rosegold' | 'obsidian' | 'platinum'>('gold');

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-luxury-dark via-luxury-espresso/80 to-luxury-dark">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-luxury-gold/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-luxury-bronze/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern with subtle opacity */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(197, 160, 89, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT COLUMN: Editorial Typography & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left pt-6 lg:pt-0">
          {/* Tagline Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-luxury-espresso/90 border border-luxury-gold/30 shadow-lg shadow-luxury-gold/10">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-luxury-champagne">
              Haute Cellular Formulation No. 38
            </span>
          </div>

          {/* Oversized Editorial Headline */}
          <div className="space-y-2">
            <h1 className="font-serif text-5xl sm:text-7xl xl:text-8xl font-light tracking-tight text-luxury-ivory leading-[0.95]">
              BEAUTY, <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-luxury-champagne via-luxury-gold to-luxury-lightGold">
                REIMAGINED.
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-luxury-ivory/75 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed pt-2">
              Discover the science of skincare. Experience the art of beauty.
              Bio-identical peptide matrices suspended in micro-crystallized liquid gold.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-lightGold text-luxury-dark font-mono text-xs uppercase tracking-[0.2em] font-bold shadow-xl shadow-luxury-gold/25 hover:brightness-110 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onDiscoverWorldClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-luxury-ivory border border-luxury-gold/30 hover:border-luxury-gold font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 backdrop-blur-md"
            >
              <Play className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold/20" />
              <span>Discover Our World</span>
            </button>
          </div>

          {/* Key Clinical & Formulation Proof Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-luxury-gold block font-semibold">+48%</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                Dermal Collagen Synthesis
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-luxury-gold block font-semibold">99.4%</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                Pharmaceutical Purity
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-luxury-gold block font-semibold">14 Days</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                Cellular Renewal Cycle
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Giant 3D Interactive Floating Serum Vessel (5 cols) */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          {/* 3D Canvas Box */}
          <div className="relative w-full h-[460px] sm:h-[560px] flex items-center justify-center">
            <HeroExperience3D finish={heroFinish} />

            {/* Interactive Floating Badge: Click to inspect */}
            <div className="absolute top-4 right-4 bg-luxury-dark/85 backdrop-blur-md border border-luxury-gold/30 px-3 py-1.5 rounded-full flex items-center space-x-2 text-[10px] font-mono text-luxury-champagne shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Interactive 3D • Drag to Rotate</span>
            </div>

            {/* Spec Label Card Floating Bottom Left */}
            <div className="absolute bottom-6 left-2 sm:left-4 bg-luxury-dark/90 backdrop-blur-xl border border-luxury-gold/25 p-3.5 rounded-2xl shadow-2xl max-w-[210px] text-left">
              <span className="text-[9px] font-mono uppercase tracking-widest text-luxury-gold block">
                Featured Prototype
              </span>
              <h4 className="font-serif text-sm text-luxury-ivory font-medium leading-tight mt-0.5">
                Triskin Cellular Elixir
              </h4>
              <p className="text-[10px] text-white/50 font-mono mt-1">
                Refractive Glass & 24K Gold Suspension
              </p>
              <button
                onClick={onQuickViewBottle}
                className="mt-2 text-[10px] font-mono uppercase tracking-wider text-luxury-gold hover:text-luxury-lightGold flex items-center space-x-1"
              >
                <span>Inspect Active Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Interactive Material / Vessel Customizer Pill below 3D bottle */}
          <div className="flex items-center space-x-2 bg-luxury-dark/80 backdrop-blur-xl px-4 py-2 rounded-full border border-luxury-gold/20 shadow-xl mt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 mr-1">
              Select Finish:
            </span>
            {(
              [
                { id: 'gold', name: 'Gold', color: '#D4AF37' },
                { id: 'rosegold', name: 'Rose', color: '#B76E79' },
                { id: 'obsidian', name: 'Onyx', color: '#2A2522' },
                { id: 'platinum', name: 'Platinum', color: '#DCDCDC' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => setHeroFinish(item.id)}
                title={item.name}
                className={`w-6 h-6 rounded-full border transition-all flex items-center justify-center ${
                  heroFinish === item.id
                    ? 'border-luxury-gold scale-110 shadow-md shadow-luxury-gold/40'
                    : 'border-white/20 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: item.color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 text-white/40 cursor-pointer hover:text-luxury-gold transition-colors" onClick={onExploreClick}>
        <span className="text-[9px] font-mono uppercase tracking-[0.25em]">Scroll to Experience</span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-luxury-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

