import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { Star, Heart, ShoppingBag, Search, X, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface LumiereProductsProps {
  onOpenDetail: (productId: string) => void;
  selectedCategoryFromParent?: string;
  selectedConcernFromParent?: string | null;
}

export const LumiereProducts: React.FC<LumiereProductsProps> = ({
  onOpenDetail,
  selectedCategoryFromParent,
  selectedConcernFromParent,
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
    if (activeCategory === 'Triskin') {
      result = result.filter((p) => p.name.toLowerCase().includes('triskin'));
    } else if (activeCategory !== 'All') {
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

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A] tracking-tight">
            Products
          </h2>
          {selectedConcernFromParent && (
            <p className="text-xs text-lumiere-purple font-medium mt-1">
              Showing tailored solutions for: <strong>{selectedConcernFromParent}</strong>
            </p>
          )}
        </div>

        <button
          onClick={() => {
            setActiveCategory('All');
            setSearchQuery('');
          }}
          className="text-xs font-semibold text-[#5B4296] hover:underline uppercase tracking-wider"
        >
          View all
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products (e.g. Triskin, Glow)..."
            className="w-full bg-white border border-[#E8DEF5] rounded-full pl-10 pr-9 py-2 text-xs font-sans text-[#1A1A1A] placeholder:text-[#8E8E93] focus:outline-none focus:border-lumiere-purple shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-lumiere-purple text-white shadow-xs'
                  : 'bg-white text-[#554D69] hover:bg-[#F3EEFA] border border-[#E8DEF5]'
              }`}
            >
              {cat === 'Triskin' ? '✨ Triskin' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isFavorited = isInWishlist(product.id);

          return (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EDE7F6] hover:border-[#D8CEF0] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full bg-[#FAF9F7] p-3 flex items-center justify-center overflow-hidden">
                {product.tag && (
                  <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-white text-[9px] font-bold uppercase tracking-wider text-lumiere-purple border border-[#E5DDF5] shadow-xs">
                    {product.tag}
                  </span>
                )}

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all ${
                    isFavorited
                      ? 'bg-rose-50 text-rose-500 shadow-sm'
                      : 'bg-white/80 text-gray-400 hover:text-rose-500 hover:bg-white shadow-2xs'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => onOpenDetail(product.id)}
                  className="w-full h-full object-cover rounded-2xl cursor-pointer transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8E8E93] mb-1">
                    <span className="uppercase tracking-wider font-semibold text-lumiere-purple">
                      {product.category}
                    </span>
                    <span>{product.volume}</span>
                  </div>

                  <h3
                    onClick={() => onOpenDetail(product.id)}
                    className="font-serif text-base font-semibold text-[#1A1A1A] hover:text-lumiere-purple transition-colors cursor-pointer line-clamp-1 leading-snug"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#666666] line-clamp-1 mt-0.5">
                    {product.shortDescription}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mt-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-2 border-t border-[#F0EBF7] flex items-center justify-between">
                  <div className="flex items-baseline space-x-1.5">
                    <span className="font-serif text-lg font-bold text-[#1A1A1A]">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="px-3.5 py-1.5 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-xs font-medium uppercase tracking-wider flex items-center space-x-1 transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 mt-6">
          <p className="font-serif text-lg text-gray-800">No matching products found.</p>
          <p className="text-xs text-gray-500 mt-1">Try clearing your search or filter.</p>
        </div>
      )}
    </section>
  );
};
