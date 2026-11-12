import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TargetedSolutionsProps {
  onShopCollection: (categoryOrFilter: string) => void;
}

export const TargetedSolutions: React.FC<TargetedSolutionsProps> = ({ onShopCollection }) => {
  return (
    <section id="solutions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header with Title and "VIEW ALL SOLUTIONS" Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A] tracking-tight">
            Targeted Solutions
          </h2>
          <p className="text-sm text-[#666666] font-sans">
            Discover expert formulas, engineered to address your unique skin concerns.
          </p>
        </div>

        <div>
          <button
            onClick={() => onShopCollection('All')}
            className="px-6 py-2.5 rounded-full bg-[#131124] hover:bg-[#2B2347] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <span>VIEW ALL SOLUTIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3 Large Rectangular Banner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Influencers' Favourites */}
        <div className="group relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-between p-7 text-white shadow-sm hover:shadow-md transition-all">
          {/* Background image & gradient */}
          <img
            src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80"
            alt="Influencers Favourites"
            className="absolute inset-0 w-full h-full object-cover transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

          {/* Top content */}
          <div className="relative z-10 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D8CEF0]">
              Trending
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-snug">
              INFLUENCERS' <br />
              FAVOURITES
            </h3>
            <p className="text-xs text-white/80 max-w-[220px]">
              Trending picks loved by beauty creators.
            </p>
          </div>

          {/* Bottom Action Button */}
          <div className="relative z-10 pt-6">
            <button
              onClick={() => onShopCollection('Best Seller')}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF9F7] text-[#131124] font-sans text-xs uppercase tracking-widest font-semibold shadow-md flex items-center space-x-1.5 transition-transform group-hover:translate-x-1"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Trusted Care, Healthy Skin */}
        <div className="group relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-between p-7 text-white shadow-sm hover:shadow-md transition-all">
          <img
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
            alt="Trusted Care Healthy Skin"
            className="absolute inset-0 w-full h-full object-cover transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3B2568]/90 via-[#4A3578]/60 to-[#5B4296]/30" />

          <div className="relative z-10 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5DDF5]">
              Dermatologist Approved
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-snug">
              TRUSTED CARE, <br />
              HEALTHY SKIN.
            </h3>
            <p className="text-xs text-white/85 max-w-[220px]">
              Clinically tested, dermatologist-approved essentials.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <button
              onClick={() => onShopCollection('Skincare')}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF9F7] text-[#131124] font-sans text-xs uppercase tracking-widest font-semibold shadow-md flex items-center space-x-1.5 transition-transform group-hover:translate-x-1"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Korean Glow Collection */}
        <div className="group relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-between p-7 text-white shadow-sm hover:shadow-md transition-all">
          <img
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
            alt="Korean Glow Collection"
            className="absolute inset-0 w-full h-full object-cover transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26154A]/95 via-[#4A2885]/70 to-[#6C4AB6]/40" />

          <div className="relative z-10 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D8CEF0]">
              Seoul Formulations
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-snug">
              KOREAN GLOW <br />
              COLLECTION
            </h3>
            <p className="text-xs text-white/85 max-w-[220px]">
              Glass-skin rituals from Seoul's best labs.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <button
              onClick={() => onShopCollection('Serums')}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF9F7] text-[#131124] font-sans text-xs uppercase tracking-widest font-semibold shadow-md flex items-center space-x-1.5 transition-transform group-hover:translate-x-1"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

