import React, { useState, useEffect } from 'react';
import { HealthSolutionChat } from './HealthSolutionChat';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LumiereHeroProps {
  onShopNow: () => void;
  onOpenDetail: (productId: string) => void;
}

interface HeroSlide {
  id: string;
  image: string;
  theme: {
    bgGradient: string;
    headingColor: string;
    subtextColor: string;
    buttonBg: string;
    glowColor: string;
  };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: '/hero_images/Screenshot_2026-11-24_101433-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #FDF7F2 0%, #F9ECE0 50%, #F4DDC8 100%)',
      headingColor: '#701A33',
      subtextColor: '#684539',
      buttonBg: '#701A33',
      glowColor: 'rgba(235, 180, 155, 0.45)',
    },
  },
  {
    id: 'slide-2',
    image: '/hero_images/Screenshot_2026-11-24_101520-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #F2F8F4 0%, #E6F3EA 50%, #D4EADC 100%)',
      headingColor: '#1F472B',
      subtextColor: '#3A5C46',
      buttonBg: '#1F472B',
      glowColor: 'rgba(132, 204, 155, 0.45)',
    },
  },
  {
    id: 'slide-3',
    image: '/hero_images/Screenshot_2026-11-24_101552-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #FDF7F8 0%, #FCEEF1 50%, #F8E2E8 100%)',
      headingColor: '#701A33',
      subtextColor: '#6B4553',
      buttonBg: '#701A33',
      glowColor: 'rgba(232, 190, 197, 0.5)',
    },
  },
  {
    id: 'slide-4',
    image: '/hero_images/Screenshot_2026-11-24_101632-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #FAF8F5 0%, #F2EEE7 50%, #E5DFD5 100%)',
      headingColor: '#520B1E',
      subtextColor: '#57463F',
      buttonBg: '#520B1E',
      glowColor: 'rgba(212, 163, 89, 0.35)',
    },
  },
];

export const LumiereHero: React.FC<LumiereHeroProps> = ({ onShopNow, onOpenDetail }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-changing timer every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = HERO_SLIDES[currentSlideIndex];
  const { theme } = currentSlide;

  return (
    <section
      id="hero"
      className="relative w-full -mt-20 pt-24 sm:pt-28 pb-14 sm:pb-16 transition-all duration-700 ease-in-out overflow-hidden"
      style={{
        background: theme.bgGradient,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
          {/* Left Column: "Find Your Solution" (7 cols) */}
          <div className="lg:col-span-7 space-y-6 z-10 flex flex-col justify-center">
            {/* Store Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-[#E8BEC5] shadow-2xs w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A359]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#701A33]">
                Grace Beauty Store • 100% Original Products
              </span>
            </div>

            {/* Main Hero Heading */}
            <div className="space-y-2">
              <h1
                className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.08] tracking-tight transition-colors duration-700 ease-in-out"
                style={{ color: theme.headingColor }}
              >
                Find Your Solution
              </h1>
              <p
                className="text-sm sm:text-base max-w-xl leading-relaxed transition-colors duration-700 ease-in-out"
                style={{ color: theme.subtextColor }}
              >
                Enter any skin concern, symptom, or condition to match 100% original, science-backed K-Beauty and dermatological formulations tailored for you.
              </p>
            </div>

            {/* Prominent Search Bar Component with Dynamic Theme Accent */}
            <HealthSolutionChat
              onOpenDetail={onOpenDetail}
              accentColor={theme.buttonBg}
            />

            {/* Catalog Action Link */}
            <div className="pt-2">
              <button
                onClick={onShopNow}
                style={{ backgroundColor: theme.buttonBg }}
                className="px-6 py-3 rounded-full text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-500 shadow-md hover:shadow-lg hover:opacity-90 flex items-center space-x-2 group"
              >
                <span>EXPLORE ALL ORIGINAL PRODUCTS</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: ONLY THE PRODUCT IMAGE */}
          <div className="lg:col-span-5 relative w-full h-full flex items-center justify-center min-h-[380px] lg:min-h-[480px]">
            {/* Subtle Ambient Radial Glow Aura Matching Product Theme */}
            <div
              className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
              style={{ background: theme.glowColor }}
            />

            {/* Only the product bottle image, floating gracefully and crossfading automatically */}
            <div className="relative z-10 w-full h-80 sm:h-[440px] flex items-center justify-center animate-float-bottle">
              <img
                key={currentSlide.id}
                src={currentSlide.image}
                alt="Featured Product"
                className="max-h-full max-w-[90%] sm:max-w-[85%] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.18)] transition-all duration-700 ease-in-out transform hover:scale-105 cursor-pointer"
                onClick={onShopNow}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
