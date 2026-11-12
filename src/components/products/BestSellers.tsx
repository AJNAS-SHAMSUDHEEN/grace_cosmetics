import React, { useRef } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface BestSellersProps {
  onOpenDetail: (productId: string) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onOpenDetail }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const bestSellers = PRODUCTS.filter(
    (p) => p.tag === 'Best Seller' || p.tag === 'Award Winner'
  );

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative bg-luxury-dark border-t border-luxury-gold/15 overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[350px] bg-luxury-gold/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.25em] text-luxury-gold">
              <Award className="w-3.5 h-3.5" />
              <span>International Acclaim</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-luxury-ivory tracking-tight">
              Curated Best Sellers
            </h2>
            <p className="text-sm font-sans text-white/60 max-w-lg">
              The benchmark formulations embraced by dermatologists, aestheticians, and discerning private collectors globally.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-luxury-gold text-white/70 hover:text-white transition-all"
              aria-label="Previous best sellers"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-luxury-gold text-white/70 hover:text-white transition-all"
              aria-label="Next best sellers"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Slider */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-6 scroll-smooth no-scrollbar"
        >
          {bestSellers.map((product) => (
            <div key={product.id} className="w-[300px] sm:w-[340px] shrink-0">
              <ProductCard product={product} onOpenDetail={onOpenDetail} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

