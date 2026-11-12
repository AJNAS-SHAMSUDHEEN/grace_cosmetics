import React from 'react';
import { COLLECTIONS } from '../../data/collections';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedCollectionsProps {
  onSelectCollection: (categoryName: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ onSelectCollection }) => {
  return (
    <section id="collections" className="py-24 relative bg-luxury-dark border-t border-luxury-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.25em] text-luxury-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Architectures</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-luxury-ivory tracking-tight">
              Featured Collections
            </h2>
            <p className="text-sm font-sans text-white/60 max-w-lg">
              Each discipline is calibrated with molecular botanical actives, certified cold-chain potency, and sovereign sensory textures.
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-xs font-mono uppercase tracking-widest text-luxury-champagne block">
              7 Clinical Categories
            </span>
            <span className="text-[11px] text-white/40 font-mono">100% Free of Synthetic Fillers</span>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COLLECTIONS.map((col, index) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col.name)}
              className={`group relative rounded-3xl overflow-hidden glass-card cursor-pointer border border-luxury-gold/15 hover:border-luxury-gold/50 transition-all duration-500 flex flex-col justify-between ${
                index === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Product / Texture Photography (Strictly NO HUMANS) */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black/40">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/40 to-transparent" />

                {/* Badge for Item Count */}
                <div className="absolute top-4 right-4 bg-luxury-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-luxury-gold/30 text-[10px] font-mono uppercase tracking-wider text-luxury-gold">
                  {col.itemCount} Formulations
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 relative z-10 -mt-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-gold block mb-1">
                    {col.tagline}
                  </span>
                  <h3 className="font-serif text-2xl text-luxury-ivory group-hover:text-luxury-champagne transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-white/60 mt-2 line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-luxury-ivory/80 group-hover:text-luxury-gold transition-colors">
                    Explore Formulation
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-dark text-luxury-ivory flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
