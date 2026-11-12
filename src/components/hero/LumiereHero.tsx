import React from 'react';
import { LumiereHero3D } from '../3d/LumiereHero3D';
import { ShieldCheck, FlaskConical, Heart, Truck, ArrowRight } from 'lucide-react';

interface LumiereHeroProps {
  onShopNow: () => void;
}

export const LumiereHero: React.FC<LumiereHeroProps> = ({ onShopNow }) => {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      {/* Large Rounded Hero Banner */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#F5F0FB] via-[#EDE6F8] to-[#E2D5F3] border border-[#E8DEF5] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14 min-h-[580px]">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 z-10">
            {/* Script Eyebrow */}
            <p className="font-script text-3xl sm:text-4xl text-[#7E69AB] -mb-3 italic">
              Discover your
            </p>

            {/* Bold All-Caps Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-bold text-[#5B4296] leading-[1.05] tracking-tight">
              GLOW WITH <br />
              HEALTHY SKIN
            </h1>

            {/* Sub-headline Pill / Bullet Text */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-bold tracking-widest text-[#6C559C] uppercase">
              <span>PREMIUM SKINCARE</span>
              <span>•</span>
              <span>SCIENCE BACKED</span>
              <span>•</span>
              <span>EVERYDAY RADIANCE</span>
            </div>

            {/* Supporting description */}
            <p className="text-sm sm:text-base text-[#554D69] max-w-lg leading-relaxed font-sans">
              Curated for healthy, hydrated and glowing skin. Discover skincare essentials for your everyday routine.
            </p>

            {/* 4 Benefit Badges in Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {/* Badge 1 */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#6C559C] mb-1.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3578] leading-tight">
                  Safe &<br />Effective
                </span>
              </div>

              {/* Badge 2 */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-xs">
                <FlaskConical className="w-5 h-5 text-[#6C559C] mb-1.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3578] leading-tight">
                  Science<br />Backed
                </span>
              </div>

              {/* Badge 3 */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-xs">
                <Heart className="w-5 h-5 text-[#6C559C] mb-1.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3578] leading-tight">
                  For All<br />Skin Types
                </span>
              </div>

              {/* Badge 4 */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-xs">
                <Truck className="w-5 h-5 text-[#6C559C] mb-1.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3578] leading-tight">
                  Fast<br />Delivery
                </span>
              </div>
            </div>

            {/* Pill CTA Button */}
            <div className="pt-2">
              <button
                onClick={onShopNow}
                className="px-8 py-3.5 rounded-full bg-[#131124] hover:bg-[#2B2347] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Aesthetic Pastel Bottles Presentation on White Tray (5 cols) */}
          <div className="lg:col-span-5 relative w-full h-full flex items-center justify-center">
            <LumiereHero3D />
          </div>
        </div>
      </div>
    </section>
  );
};
