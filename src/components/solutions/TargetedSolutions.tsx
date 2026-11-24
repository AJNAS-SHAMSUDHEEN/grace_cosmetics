import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface TargetedSolutionsProps {
  onShopCollection: (categoryOrFilter: string) => void;
}

interface SolutionCard {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  desc: string;
  image: string;
  gradientOverlay: string;
  filterParam: string;
}

export const TargetedSolutions: React.FC<TargetedSolutionsProps> = ({ onShopCollection }) => {
  const cards: SolutionCard[] = [
    {
      id: 'influencers',
      badge: 'TRENDING',
      badgeColor: '#E8BEC5',
      title: "INFLUENCERS'\nFAVOURITES",
      desc: 'Trending picks loved by beauty creators and skincare influencers.',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-black/85 via-black/50 to-black/20',
      filterParam: 'Best Seller',
    },
    {
      id: 'trusted-care',
      badge: 'DERMATOLOGIST APPROVED',
      badgeColor: '#FCEEF1',
      title: 'TRUSTED CARE,\nHEALTHY SKIN.',
      desc: 'Clinically tested, dermatologist-approved essentials for compromised skin barriers.',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-[#520B1E]/90 via-[#701A33]/65 to-[#8B2C47]/35',
      filterParam: 'Skincare',
    },
    {
      id: 'korean-glow',
      badge: 'SEOUL FORMULATIONS',
      badgeColor: '#D4EADC',
      title: 'KOREAN GLOW\nCOLLECTION',
      desc: "Multi-layered glass-skin rituals from Seoul's top dermatological laboratories.",
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-[#1F472B]/90 via-[#2E5E3D]/65 to-[#4A7C59]/35',
      filterParam: 'Serums',
    },
  ];

  // Mobile Horizontal Auto-Scroll State
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on mobile devices every 3.8s
  useEffect(() => {
    if (isInteracting) return;

    const timer = setInterval(() => {
      setActiveMobileIndex((prev) => {
        const next = (prev + 1) % cards.length;
        if (scrollRef.current) {
          const cardWidth = scrollRef.current.clientWidth * 0.82 + 16;
          scrollRef.current.scrollTo({
            left: next * cardWidth,
            behavior: 'smooth',
          });
        }
        return next;
      });
    }, 3800);

    return () => clearInterval(timer);
  }, [isInteracting, cards.length]);

  // Update active index on user scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.clientWidth * 0.82 + 16;
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < cards.length) {
      setActiveMobileIndex(index);
    }
  };

  const handleManualScrollTo = (index: number) => {
    setActiveMobileIndex(index);
    setIsInteracting(true);
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.82 + 16;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
    setTimeout(() => setIsInteracting(false), 4000);
  };

  return (
    <section id="solutions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Header with Title and "VIEW ALL SOLUTIONS" Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-[#701A33]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A359]" />
            <span>Targeted Care</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E0A12] tracking-tight">
            Targeted Solutions
          </h2>
          <p className="text-sm text-[#7A646E] font-sans">
            Discover expert formulas, engineered to address your unique skin concerns.
          </p>
        </div>

        <div>
          <button
            onClick={() => onShopCollection('All')}
            className="px-6 py-2.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center space-x-2 shadow-xs"
          >
            <span>VIEW ALL SOLUTIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. MOBILE AUTO-SCROLLING HORIZONTAL CAROUSEL (Visible only on mobile < md) */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setTimeout(() => setIsInteracting(false), 4000)}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          className="flex flex-nowrap overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scroll-smooth scrollbar-none -mx-4 px-4"
        >
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className="group relative rounded-3xl overflow-hidden min-h-[340px] w-[82vw] max-w-[320px] shrink-0 snap-center flex flex-col justify-between p-7 text-white shadow-md border border-[#EED9DF]/50"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${card.gradientOverlay}`} />

              {/* Top content */}
              <div className="relative z-10 space-y-1.5">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: card.badgeColor }}
                >
                  {card.badge}
                </span>
                <h3 className="font-serif text-2xl font-bold tracking-tight leading-snug whitespace-pre-line">
                  {card.title}
                </h3>
                <p className="text-xs text-white/85 max-w-[220px]">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Action Button */}
              <div className="relative z-10 pt-6">
                <button
                  onClick={() => onShopCollection(card.filterParam)}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF9F7] text-[#701A33] font-sans text-xs uppercase tracking-widest font-semibold shadow-md flex items-center space-x-1.5 transition-transform"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slide Indicator Dots */}
        <div className="flex items-center justify-center space-x-2 pt-3">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManualScrollTo(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeMobileIndex === idx
                  ? 'w-6 bg-[#701A33]'
                  : 'w-2 bg-[#E8BEC5] hover:bg-[#D48D9E]'
              }`}
              title={`Card ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. DESKTOP 3-COLUMN GRID (Visible md and up) */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative rounded-3xl overflow-hidden min-h-[350px] flex flex-col justify-between p-7 text-white shadow-sm hover:shadow-lg transition-all border border-[#EED9DF]/50"
          >
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${card.gradientOverlay}`} />

            {/* Top content */}
            <div className="relative z-10 space-y-1.5">
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: card.badgeColor }}
              >
                {card.badge}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-snug whitespace-pre-line">
                {card.title}
              </h3>
              <p className="text-xs text-white/85 max-w-[220px]">
                {card.desc}
              </p>
            </div>

            {/* Bottom Action Button */}
            <div className="relative z-10 pt-6">
              <button
                onClick={() => onShopCollection(card.filterParam)}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF9F7] text-[#701A33] font-sans text-xs uppercase tracking-widest font-semibold shadow-md flex items-center space-x-1.5 transition-transform group-hover:translate-x-1"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
