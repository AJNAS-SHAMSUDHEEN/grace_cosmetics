import React from 'react';
import { LumiereHero3D } from '../3d/LumiereHero3D';
import { HealthSolutionChat } from './HealthSolutionChat';
import { ArrowRight } from 'lucide-react';

interface LumiereHeroProps {
  onShopNow: () => void;
  onOpenDetail: (productId: string) => void;
}

export const LumiereHero: React.FC<LumiereHeroProps> = ({ onShopNow, onOpenDetail }) => {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-14">
      {/* Large Rounded Hero Banner */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#F5F0FB] via-[#EDE6F8] to-[#E2D5F3] border border-[#E8DEF5] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-14 min-h-[540px]">
          {/* Left Column: Professionally Aligned "Find Your Solution" (7 cols) */}
          <div className="lg:col-span-7 space-y-6 z-10 flex flex-col justify-center">
            {/* Main Hero Heading */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#5B4296] leading-[1.08] tracking-tight">
                Find Your Solution
              </h1>
              <p className="text-sm sm:text-base text-[#554D69] max-w-xl leading-relaxed">
                Enter any disease, health condition, symptom, or skin concern to match science-backed clinical formulations tailored for you.
              </p>
            </div>

            {/* Prominent Search Bar Component */}
            <HealthSolutionChat onOpenDetail={onOpenDetail} />

            {/* Catalog Action Link */}
            <div className="pt-2">
              <button
                onClick={onShopNow}
                className="px-6 py-3 rounded-full bg-[#131124] hover:bg-[#2B2347] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 group"
              >
                <span>EXPLORE ALL FORMULATIONS</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Pastel Cosmetic Bottles on White Tray (5 cols) */}
          <div className="lg:col-span-5 relative w-full h-full flex items-center justify-center min-h-[360px] lg:min-h-[500px]">
            <LumiereHero3D />
          </div>
        </div>
      </div>
    </section>
  );
};

