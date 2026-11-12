import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

interface FeaturedProductsProps {
  onOpenDetail: (productId: string) => void;
  selectedCategoryFromParent?: string;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onOpenDetail,
  selectedCategoryFromParent,
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedCategoryFromParent || 'All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Synchronize when parent passes a collection selection
  React.useEffect(() => {
    if (selectedCategoryFromParent) {
      setActiveTab(selectedCategoryFromParent);
    }
  }, [selectedCategoryFromParent]);

  const categories = [
    'All',
    'Triskin',
    'Serums',
    'Moisturizers',
    'Cleansers',
    'Sunscreen',
    'Face Masks',
    'Beauty Essentials',
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeTab === 'Triskin') {
      result = result.filter((p) => p.name.toLowerCase().includes('triskin'));
    } else if (activeTab !== 'All') {
      result = result.filter((p) => p.category === activeTab);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Featured default order
        break;
    }

    return result;
  }, [activeTab, sortBy]);

  return (
    <section id="products" className="py-24 relative bg-luxury-dark border-t border-luxury-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.25em] text-luxury-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bio-Active Pharmacopeia</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-luxury-ivory tracking-tight">
              Featured Formulations
            </h2>
            <p className="text-sm font-sans text-white/60 max-w-lg">
              Precision skincare powered by pharmaceutical-grade peptides, cold-pressed botanical matrices, and cryogenic actives.
            </p>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center space-x-3 self-start md:self-auto">
            <div className="flex items-center space-x-2 bg-luxury-espresso px-3.5 py-2 rounded-2xl border border-luxury-gold/20 text-xs font-mono text-luxury-champagne">
              <SlidersHorizontal className="w-3.5 h-3.5 text-luxury-gold" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-luxury-ivory focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-luxury-dark text-white">Curated Sovereign</option>
                <option value="price-asc" className="bg-luxury-dark text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-luxury-dark text-white">Price: High to Low</option>
                <option value="rating" className="bg-luxury-dark text-white">Highest Clinical Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-luxury-gold text-luxury-dark font-semibold shadow-lg shadow-luxury-gold/20'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat === 'Triskin' ? '✨ Triskin Line' : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-luxury-ivory">No formulations match this criteria.</p>
            <p className="text-sm text-white/50 mt-2">Adjust your filters to discover our sovereign elixirs.</p>
          </div>
        )}
      </div>
    </section>
  );
};
