import React, { useState } from 'react';
import { HealthSolutionChat } from './HealthSolutionChat';
import { InteractiveProductShowcase, ShowcaseSlideTheme, SHOWCASE_ITEMS } from '../showcase/InteractiveProductShowcase';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LumiereHeroProps {
  onShopNow: () => void;
  onOpenDetail: (productId: string) => void;
}

export const LumiereHero: React.FC<LumiereHeroProps> = ({ onShopNow, onOpenDetail }) => {
  const [currentTheme, setCurrentTheme] = useState<ShowcaseSlideTheme>(SHOWCASE_ITEMS[0].theme);

  return (
    <section
      id="hero"
      className="relative w-full -mt-20 pt-24 sm:pt-28 pb-14 sm:pb-16 transition-all duration-700 ease-in-out overflow-hidden"
      style={{
        background: currentTheme.bgGradient,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
          {/* Left Column: "Find Your Solution" (7 cols) */}
          <div className="lg:col-span-7 space-y-6 z-10 flex flex-col justify-center">
            {/* Main Hero Heading */}
            <div className="space-y-2">
              <h1
                className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.08] tracking-tight transition-colors duration-700 ease-in-out"
                style={{ color: currentTheme.headingColor }}
              >
                Find Your Solution
              </h1>
              <p
                className="text-sm sm:text-base max-w-xl leading-relaxed transition-colors duration-700 ease-in-out"
                style={{ color: currentTheme.subtextColor }}
              >
                Enter any skin concern, symptom, or condition to match 100% original, science-backed K-Beauty and dermatological formulations tailored for you.
              </p>
            </div>

            {/* Prominent Search Bar Component with Dynamic Theme Accent */}
            <HealthSolutionChat
              onOpenDetail={onOpenDetail}
              accentColor={currentTheme.buttonBg}
            />

            {/* Catalog Action Link */}
            <div className="pt-2">
              <button
                onClick={onShopNow}
                style={{ backgroundColor: currentTheme.buttonBg }}
                className="px-6 py-3 rounded-full text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-500 shadow-md hover:shadow-lg hover:opacity-90 flex items-center space-x-2 group"
              >
                <span>EXPLORE ALL ORIGINAL PRODUCTS</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: PREMIER INTERACTIVE PRODUCT SHOWCASE (5 cols) */}
          <div className="lg:col-span-5 relative w-full h-full flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
            <InteractiveProductShowcase
              onOpenDetail={onOpenDetail}
              onSlideChange={(item) => setCurrentTheme(item.theme)}
              onShopNow={onShopNow}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
