import React from 'react';
import { LumiereHero3D } from '../3d/LumiereHero3D';
import { HealthSolutionChat } from './HealthSolutionChat';
import { ShieldCheck, FlaskConical, Heart, Truck, ArrowRight } from 'lucide-react';

interface LumiereHeroProps {
  onShopNow: () => void;
  onOpenDetail: (productId: string) => void;
}

export const LumiereHero: React.FC<LumiereHeroProps> = ({ onShopNow, onOpenDetail }) => {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      {/* Large Rounded Hero Banner */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#F5F0FB] via-[#EDE6F8] to-[#E2D5F3] border border-[#E8DEF5] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
          {/* Left Column: Typography, Modern Chat-Style Interface "Find Your Solution" (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 z-10">
            {/* Script Eyebrow */}
            <p className="font-script text-3xl sm:text-4xl text-[#7E69AB] -mb-3 italic">
              Discover your
            </p>

            {/* Bold All-Caps Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[52px] font-bold text-[#5B4296] leading-[1.08] tracking-tight">
              GLOW WITH <br />
              HEALTHY SKIN
            </h1>

            {/* Sub-headline Pill / Bullet Text */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-[#6C559C] uppercase">
              <span>PREMIUM SKINCARE</span>
              <span>•</span>
              <span>SCIENCE BACKED</span>
              <span>•</span>
              <span>EVERYDAY RADIANCE</span>
            </div>

            {/* REDESIGNED AREA: Modern Chat-Style Interface with "Find Your Solution" Search */}
            <HealthSolutionChat onOpenDetail={onOpenDetail} />

            {/* 4 Benefit Badges in Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="flex items-center space-x-2 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#6C559C] shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3578] leading-tight">
                  Safe & Effective
                </span>
              </div>

              <div className="flex items-center space-x-2 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-2xs">
                <FlaskConical className="w-4 h-4 text-[#6C559C] shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3578] leading-tight">
                  Science Backed
                </span>
              </div>

              <div className="flex items-center space-x-2 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-2xs">
                <Heart className="w-4 h-4 text-[#6C559C] shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3578] leading-tight">
                  All Skin Types
                </span>
              </div>

              <div className="flex items-center space-x-2 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-2xs">
                <Truck className="w-4 h-4 text-[#6C559C] shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3578] leading-tight">
                  Fast Delivery
                </span>
              </div>
            </div>

            {/* Quick Explore Button */}
            <div className="pt-1">
              <button
                onClick={onShopNow}
                className="px-7 py-3 rounded-full bg-[#131124] hover:bg-[#2B2347] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 group"
              >
                <span>EXPLORE ALL FORMULATIONS</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Aesthetic Pastel Bottles Presentation on White Tray (5 cols) */}
          <div className="lg:col-span-5 relative w-full h-full flex items-center justify-center min-h-[380px] lg:min-h-[500px]">
            <LumiereHero3D />
          </div>
        </div>
      </div>
    </section>
  );
};
