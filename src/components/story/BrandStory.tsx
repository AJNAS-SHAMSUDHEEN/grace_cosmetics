import React from 'react';
import { Sparkles, Shield, Compass, Leaf, ArrowRight } from 'lucide-react';

interface BrandStoryProps {
  onExploreCollection: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onExploreCollection }) => {
  return (
    <section id="story" className="py-24 relative bg-luxury-espresso/40 border-t border-luxury-gold/15 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-luxury-gold/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Editorial Split Row 1: The Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Left (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.25em] text-luxury-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Manifesto</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-luxury-ivory tracking-tight leading-tight">
              Where Precision Biotechnology <br />
              <span className="italic font-normal text-luxury-champagne">
                Meets Sensory Sanctuary.
              </span>
            </h2>
            <div className="space-y-4 text-sm font-sans text-white/70 leading-relaxed">
              <p>
                Founded upon the conviction that human dermal tissue responds not to aggressive surface abrasives, but to harmonic bio-identical messaging. AURAELIA emerged from our cleanroom laboratories high in the Swiss Valais.
              </p>
              <p>
                By combining micro-crystallized peptides with cold-pressed alpine extremophytes, we developed the signature Triskin Triple-Vector Cellular Delivery System—enabling active compounds to pass intact through lipid membranes.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreCollection}
                className="px-6 py-3 rounded-full bg-luxury-gold/15 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-dark border border-luxury-gold/40 text-xs font-mono uppercase tracking-widest font-semibold transition-all inline-flex items-center space-x-2"
              >
                <span>Experience The Trilogy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Abstract Visual Right (5 cols, strictly NO HUMANS) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[420px] rounded-3xl overflow-hidden border border-luxury-gold/30 shadow-2xl glass-card">
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
                alt="Haute Cosmetic Glass Vessel on Obsidian Stone"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-luxury-dark/85 backdrop-blur-md border border-white/10 text-xs font-mono">
                <span className="text-[10px] text-luxury-gold uppercase tracking-widest block">
                  Archive No. 001
                </span>
                <p className="text-luxury-ivory font-serif text-sm mt-0.5">
                  Refractive heavy crystal vessel with surgical stainless steel dropper mechanism.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Philosophical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          <div className="p-8 rounded-3xl glass-card border border-luxury-gold/15 space-y-4 hover:border-luxury-gold/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-luxury-ivory">Cryogenic Extraction</h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              All botanical actives are cold-processed at sub-zero temperatures within four hours of harvest to preserve 99.8% of delicate polyphenol structures.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-luxury-gold/15 space-y-4 hover:border-luxury-gold/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-luxury-ivory">Clinical Rigor</h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              Every formula undergoes double-blind placebo dermatological trials with optical profilometry and high-resolution ultrasonic skin density analysis.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-luxury-gold/15 space-y-4 hover:border-luxury-gold/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-luxury-ivory">Circular Vessels</h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              Crafted exclusively from heavy, UV-blocking Italian apothecary glass, engineered to be refilled indefinitely through our concierge replenishment service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

