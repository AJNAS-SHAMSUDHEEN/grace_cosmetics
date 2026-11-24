import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { Star, Heart, ShoppingBag, Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface LumiereProductsProps {
  onOpenDetail: (productId: string) => void;
  selectedCategoryFromParent?: string;
  selectedConcernFromParent?: string | null;
  limit?: number;
}

export const LumiereProducts: React.FC<LumiereProductsProps> = ({
  onOpenDetail,
  selectedCategoryFromParent,
  selectedConcernFromParent,
  limit,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    if (selectedCategoryFromParent) {
      setActiveCategory(selectedCategoryFromParent);
    }
  }, [selectedCategoryFromParent]);

  const categories = [
    'All',
    'Skincare',
    'Serums',
    'Moisturizers',
    'Cleansers',
    'Sunscreen',
    'Beauty Essentials',
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Concern filter
    if (selectedConcernFromParent) {
      const concern = selectedConcernFromParent.toLowerCase();
      result = result.filter(
        (p) =>
          p.skinType.some((st) => st.toLowerCase().includes(concern)) ||
          p.keyBenefits.some((kb) => kb.toLowerCase().includes(concern)) ||
          p.description.toLowerCase().includes(concern)
      );
    }

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subTitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.ingredientsList.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, searchQuery, selectedConcernFromParent]);

  // If limit is specified (e.g. on homepage), slice to limit
  const displayedProducts = useMemo(() => {
    if (limit && limit > 0) {
      return filteredProducts.slice(0, limit);
    }
    return filteredProducts;
  }, [filteredProducts, limit]);

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-[#701A33] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A359]" />
            <span>{limit ? 'Featured Selection' : 'Full Catalog'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E0A12] tracking-tight">
            {limit ? 'Featured Original Formulations' : 'Original Products'}
          </h2>
          {selectedConcernFromParent ? (
            <p className="text-xs text-[#701A33] font-medium mt-1">
              Showing tailored solutions for: <strong>{selectedConcernFromParent}</strong>
            </p>
          ) : (
            <p className="text-xs text-[#7A646E] mt-1">
              {limit
                ? 'A curated edit of our most loved K-Beauty and clinical essentials.'
                : 'Browse our complete catalog of certified authentic formulations.'}
            </p>
          )}
        </div>

        <Link
          to="/catalog"
          className="text-xs font-semibold text-[#701A33] hover:text-[#520B1E] flex items-center space-x-1 uppercase tracking-wider transition-colors self-start sm:self-auto"
        >
          <span>View All in Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-6">
        {categories.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                active
                  ? 'bg-[#701A33] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#55424B] border border-[#EED9DF] hover:border-[#D48D9E]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EED9DF] p-8">
          <p className="text-sm text-[#7A646E]">No products found matching your current filter.</p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2 rounded-full bg-[#701A33] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((p) => {
            const inWishlist = isInWishlist(p.id);
            return (
              <div
                key={p.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-[#EED9DF] overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#D48D9E] transition-all duration-300"
              >
                {/* Top image box */}
                <div
                  className="relative aspect-square w-full overflow-hidden bg-[#FDF7F8] p-4 flex items-center justify-center cursor-pointer"
                  onClick={() => onOpenDetail(p.id)}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain transform duration-500 group-hover:scale-105"
                  />

                  {/* Badge */}
                  {p.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-[#701A33] border border-[#E8BEC5] shadow-xs">
                      {p.tag}
                    </span>
                  )}

                  {/* Wishlist button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors ${
                      inWishlist
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-white/90 text-gray-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B2C47]">
                      {p.category}
                    </span>
                    <h3
                      onClick={() => onOpenDetail(p.id)}
                      className="font-serif text-sm sm:text-base font-semibold text-[#1E0A12] group-hover:text-[#701A33] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#7A646E] line-clamp-2">
                      {p.subTitle}
                    </p>
                  </div>

                  {/* Price & Add to cart */}
                  <div className="pt-2 border-t border-[#F7E6EB] flex items-center justify-between">
                    <div>
                      <span className="text-sm sm:text-base font-bold text-[#1E0A12]">
                        ${p.price}
                      </span>
                      {p.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-1.5">
                          ${p.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(p, 1)}
                      className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-medium flex items-center space-x-1.5 transition-colors shadow-xs"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Button to explore all products if limited on main page */}
      {limit && filteredProducts.length > limit && (
        <div className="mt-10 text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-lg group"
          >
            <span>Explore All {PRODUCTS.length} Formulations</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </section>
  );
};
