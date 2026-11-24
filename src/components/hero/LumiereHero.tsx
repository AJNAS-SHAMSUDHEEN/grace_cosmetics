import React, { useState, useEffect } from 'react';
import { HealthSolutionChat } from './HealthSolutionChat';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface LumiereHeroProps {
  onShopNow: () => void;
  onOpenDetail: (productId: string) => void;
}

interface HeroSlide {
  id: string;
  name: string;
  tagline: string;
  tag: string;
  image: string;
  theme: {
    bgGradient: string;
    borderColor: string;
    headingColor: string;
    subtextColor: string;
    accentColor: string;
    buttonBg: string;
    glowColor: string;
    pillBg: string;
    pillBorder: string;
    pillText: string;
    indicatorActive: string;
  };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    name: 'Cellular Radiance Serum & Cream',
    tagline: 'Lipid restoration & liquid radiance formulation',
    tag: '24K PEPTIDE RADIANCE',
    image: '/hero_images/Screenshot_2026-11-24_101433-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #FDF7F2 0%, #F8ECE4 50%, #EBD4C6 100%)',
      borderColor: '#E8D0C0',
      headingColor: '#784333',
      subtextColor: '#684F45',
      accentColor: '#784333',
      buttonBg: '#784333',
      glowColor: 'rgba(235, 178, 149, 0.45)',
      pillBg: 'rgba(255, 255, 255, 0.9)',
      pillBorder: '#E8D0C0',
      pillText: '#784333',
      indicatorActive: '#784333',
    },
  },
  {
    id: 'slide-2',
    name: 'Bio-Cellular Barrier Restorative',
    tagline: 'Pure botanical lavender peptides & deep epidermal repair',
    tag: 'LUMIÈRE SIGNATURE',
    image: '/hero_images/Screenshot_2026-11-24_101520-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #F5F0FB 0%, #EDE6F8 50%, #E2D5F3 100%)',
      borderColor: '#E8DEF5',
      headingColor: '#5B4296',
      subtextColor: '#554D69',
      accentColor: '#5B4296',
      buttonBg: '#5B4296',
      glowColor: 'rgba(196, 172, 237, 0.45)',
      pillBg: 'rgba(255, 255, 255, 0.9)',
      pillBorder: '#E2D6F3',
      pillText: '#5B4296',
      indicatorActive: '#5B4296',
    },
  },
  {
    id: 'slide-3',
    name: 'Aquatic Multi-Hyaluron Hydrator',
    tagline: 'Deep ocean botanical electrolytes & 72-hour cellular barrier quenching',
    tag: '72HR HYDRA ESSENCE',
    image: '/hero_images/Screenshot_2026-11-24_101552-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #EDF6FA 0%, #E0EFF7 50%, #CCE3F1 100%)',
      borderColor: '#BEDCEC',
      headingColor: '#225475',
      subtextColor: '#385C74',
      accentColor: '#225475',
      buttonBg: '#225475',
      glowColor: 'rgba(142, 199, 232, 0.45)',
      pillBg: 'rgba(255, 255, 255, 0.9)',
      pillBorder: '#BFDCEC',
      pillText: '#225475',
      indicatorActive: '#225475',
    },
  },
  {
    id: 'slide-4',
    name: 'Botanical Mineral Calming Shield',
    tagline: 'Micro-algae soothing concentrate & erythema reduction',
    tag: 'CLINICAL HYPOALLERGENIC',
    image: '/hero_images/Screenshot_2026-11-24_101632-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #F3F6F1 0%, #E7EDE3 50%, #D6DFD0 100%)',
      borderColor: '#CAD4C3',
      headingColor: '#3E4D36',
      subtextColor: '#4F5A49',
      accentColor: '#3E4D36',
      buttonBg: '#3E4D36',
      glowColor: 'rgba(169, 191, 155, 0.45)',
      pillBg: 'rgba(255, 255, 255, 0.9)',
      pillBorder: '#CAD4C3',
      pillText: '#3E4D36',
      indicatorActive: '#3E4D36',
    },
  },
];

export const LumiereHero: React.FC<LumiereHeroProps> = ({ onShopNow, onOpenDetail }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-changing timer every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[currentSlideIndex];
  const { theme } = currentSlide;

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-14">
      {/* Large Rounded Hero Banner with Dynamic Gradient and Border */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden border shadow-sm transition-all duration-700 ease-in-out"
        style={{
          background: theme.bgGradient,
          borderColor: theme.borderColor,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-14 min-h-[540px]">
          {/* Left Column: Professionally Aligned "Find Your Solution" (7 cols) */}
          <div className="lg:col-span-7 space-y-6 z-10 flex flex-col justify-center">
            {/* Main Hero Heading (Adapts Color to Current Theme) */}
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
                Enter any disease, health condition, symptom, or skin concern to match science-backed clinical formulations tailored for you.
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
                <span>EXPLORE ALL FORMULATIONS</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Auto-changing Product Image with Dynamic Theme & Reflection (5 cols) */}
          <div className="lg:col-span-5 relative w-full h-full flex flex-col items-center justify-center min-h-[380px] lg:min-h-[500px]">
            {/* Ambient Radial Glow Aura */}
            <div
              className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
              style={{ background: theme.glowColor }}
            />

            {/* Glass Pedestal Base */}
            <div className="absolute bottom-10 w-48 sm:w-60 h-7 bg-white/40 backdrop-blur-md rounded-[100%] border border-white/60 shadow-md pointer-events-none" />

            {/* Floating Product Badge */}
            <div
              className="absolute top-2 right-2 sm:right-6 z-20 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-2xs border transition-all duration-700 flex items-center space-x-1.5 animate-fade-in"
              style={{
                backgroundColor: theme.pillBg,
                borderColor: theme.pillBorder,
                color: theme.pillText,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {currentSlide.tag}
              </span>
            </div>

            {/* Product Image Container with Floating Keyframe & Crossfade */}
            <div className="relative z-10 w-full h-72 sm:h-84 flex items-center justify-center animate-float-bottle">
              <img
                key={currentSlide.id}
                src={currentSlide.image}
                alt={currentSlide.name}
                className="max-h-full max-w-[85%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.18)] transition-all duration-700 ease-in-out transform hover:scale-105 cursor-pointer"
                onClick={onShopNow}
              />
            </div>

            {/* Product Name Display Under Image */}
            <div className="relative z-10 text-center mt-3 animate-fade-in">
              <span
                className="text-xs sm:text-sm font-serif font-bold tracking-tight block transition-colors duration-700"
                style={{ color: theme.headingColor }}
              >
                {currentSlide.name}
              </span>
              <span
                className="text-[11px] block transition-colors duration-700"
                style={{ color: theme.subtextColor }}
              >
                {currentSlide.tagline}
              </span>
            </div>

            {/* Slide Navigation Controls & Indicators */}
            <div className="relative z-20 flex items-center space-x-3 mt-4">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="w-7 h-7 rounded-full bg-white/70 hover:bg-white text-gray-700 flex items-center justify-center shadow-xs transition-colors"
                title="Previous product"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center space-x-2">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentSlideIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isActive ? 'w-6 shadow-xs' : 'w-2 bg-black/15 hover:bg-black/30'
                      }`}
                      style={{
                        backgroundColor: isActive ? theme.indicatorActive : undefined,
                      }}
                      title={`View ${slide.name}`}
                    />
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-7 h-7 rounded-full bg-white/70 hover:bg-white text-gray-700 flex items-center justify-center shadow-xs transition-colors"
                title="Next product"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
