import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Star, Heart, ShoppingBag, Search, X, Filter, SlidersHorizontal, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Read params from URL
  const initialCategory = searchParams.get('category') || 'All';
  const initialConcern = searchParams.get('concern') || null;
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeConcern, setActiveConcern] = useState<string | null>(initialConcern);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [priceMax, setPriceMax] = useState<number>(200);

  // Sync state when URL params change
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    const con = searchParams.get('concern') || null;
    const q = searchParams.get('search') || '';
    setActiveCategory(cat);
    setActiveConcern(con);
    if (q) setSearchQuery(q);
  }, [searchParams]);

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

  const skinConcerns = [
    'All Concerns',
    'Acne',
    'Pigmentation',
    'Dull skin',
    'Tan',
    'Dryness',
    'Wrinkles',
  ];

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleConcernClick = (con: string) => {
    const val = con === 'All Concerns' ? null : con;
    setActiveConcern(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val) {
      newParams.delete('concern');
    } else {
      newParams.set('concern', val);
    }
    setSearchParams(newParams);
  };

  const resetAllFilters = () => {
    setActiveCategory('All');
    setActiveConcern(null);
    setSearchQuery('');
    setPriceMax(200);
    setSortBy('featured');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Concern filter
    if (activeConcern) {
      const concernLower = activeConcern.toLowerCase();
      result = result.filter(
        (p) =>
          p.skinType.some((st) => st.toLowerCase().includes(concernLower)) ||
          p.keyBenefits.some((kb) => kb.toLowerCase().includes(concernLower)) ||
          p.description.toLowerCase().includes(concernLower)
      );
    }

    // Category filter
    if (activeCategory === 'Triskin') {
      result = result.filter((p) => p.name.toLowerCase().includes('triskin'));
    } else if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Price filter
    result = result.filter((p) => p.price <= priceMax);

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subTitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredientsList.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Sorting
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
        // Keep order or prioritize tags
        result.sort((a, b) => (b.tag ? 1 : 0) - (a.tag ? 1 : 0));
        break;
    }

    return result;
  }, [activeCategory, activeConcern, searchQuery, priceMax, sortBy]);

  const hasActiveFilters = activeCategory !== 'All' || activeConcern !== null || searchQuery !== '' || priceMax < 200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Header */}
      <div className="mb-8">
        <nav className="text-xs text-[#8A859E] mb-2 flex items-center space-x-2">
          <Link to="/" className="hover:text-lumiere-purple transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Catalog</span>
          {activeCategory !== 'All' && (
            <>
              <span>/</span>
              <span className="text-lumiere-purple font-semibold">{activeCategory}</span>
            </>
          )}
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] tracking-tight">
              Curated Formulations
            </h1>
            <p className="text-sm text-[#666666] mt-1 max-w-xl">
              Science-backed dermatological skincare, active cellular serums, and everyday radiance essentials.
            </p>
          </div>
          <div className="text-xs text-[#8A859E]">
            Showing <span className="font-semibold text-[#1A1A1A]">{filteredProducts.length}</span> formulations
          </div>
        </div>
      </div>

      {/* Main Search & Quick Controls Bar */}
      <div className="bg-white rounded-2xl border border-[#EFEBF7] p-4 sm:p-5 shadow-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#8A859E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search formulations, active ingredients (e.g. Niacinamide, Retinol, Triskin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] placeholder:text-[#9B95AC] focus:outline-none focus:border-lumiere-purple transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-full bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] focus:outline-none focus:border-lumiere-purple cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Price Max Slider */}
          <div className="md:col-span-3 flex items-center space-x-3 text-xs text-[#666666]">
            <span>Max:</span>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="flex-1 accent-lumiere-purple cursor-pointer"
            />
            <span className="font-semibold text-[#1A1A1A] w-12 text-right">${priceMax}</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 pt-4 border-t border-[#F2EDFA] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A859E] mr-1 hidden sm:inline">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-lumiere-purple text-white shadow-xs'
                    : 'bg-[#FAF9F7] hover:bg-[#EFEBF7] text-[#4A4A4A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-lumiere-purple hover:underline font-semibold flex items-center space-x-1"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Skin Concern Chips */}
        <div className="mt-3 pt-3 border-t border-[#F2EDFA] flex items-center space-x-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A859E] mr-1 hidden sm:inline">
            Concern:
          </span>
          {skinConcerns.map((con) => {
            const isSelected = (!activeConcern && con === 'All Concerns') || (activeConcern === con);
            return (
              <button
                key={con}
                onClick={() => handleConcernClick(con)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                  isSelected
                    ? 'bg-[#EAE2F8] text-[#4A3578] border-[#D8CEF0] font-semibold'
                    : 'bg-white hover:bg-[#FAF9F7] text-[#666666] border-[#E8DEF5]'
                }`}
              >
                {con}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex items-center flex-wrap gap-2 mb-6 text-xs">
          <span className="text-[#8A859E]">Active Filters:</span>
          {activeCategory !== 'All' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EAE2F8] text-[#4A3578] text-xs">
              Category: {activeCategory}
              <button onClick={() => handleCategoryClick('All')} className="ml-1.5 hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {activeConcern && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EAE2F8] text-[#4A3578] text-xs">
              Concern: {activeConcern}
              <button onClick={() => handleConcernClick('All Concerns')} className="ml-1.5 hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EAE2F8] text-[#4A3578] text-xs">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="ml-1.5 hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {priceMax < 200 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EAE2F8] text-[#4A3578] text-xs">
              Max: ${priceMax}
              <button onClick={() => setPriceMax(200)} className="ml-1.5 hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const isFav = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#EFEBF7] p-4 flex flex-col justify-between hover:shadow-lg hover:border-lumiere-purple/30 transition-all duration-300"
              >
                {/* Top Media Area */}
                <div>
                  <div className="relative aspect-square rounded-xl bg-[#FAF9F7] overflow-hidden mb-3.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Tag badge */}
                    {product.tag && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-semibold tracking-wider uppercase text-lumiere-purple border border-[#E8DEF5]">
                        {product.tag}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isFav
                          ? 'bg-rose-50 text-rose-500 shadow-xs'
                          : 'bg-white/80 text-gray-500 hover:text-rose-500 hover:bg-white'
                      }`}
                      title={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Rating & Category */}
                  <div className="flex items-center justify-between text-[11px] text-[#8A859E] mb-1.5">
                    <span className="uppercase tracking-wider font-medium">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                      <span className="font-semibold text-[#1A1A1A]">{product.rating}</span>
                      <span>({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <Link
                    to={`/product/${product.id}`}
                    className="block group-hover:text-lumiere-purple transition-colors"
                  >
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#7A748E] line-clamp-2 mt-1 leading-relaxed">
                    {product.subTitle || product.shortDescription}
                  </p>
                </div>

                {/* Bottom Price & Actions */}
                <div className="pt-4 mt-3 border-t border-[#F2EDFA] flex items-center justify-between">
                  <div>
                    <span className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1.5">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <Link
                      to={`/product/${product.id}`}
                      className="px-2.5 py-1.5 rounded-full bg-[#FAF9F7] hover:bg-[#EFEBF7] text-[#4A3578] text-[11px] font-semibold transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-8 h-8 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white flex items-center justify-center transition-all shadow-xs"
                      title="Add to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-3xl border border-[#EFEBF7] max-w-xl mx-auto px-6">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F7] text-lumiere-purple flex items-center justify-center mx-auto mb-4 border border-[#E8DEF5]">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-2">
            No matching formulations found
          </h3>
          <p className="text-xs text-[#666666] leading-relaxed mb-6">
            We couldn't find any products matching your specific combination of filters. Try clearing your filters to view our full clinical collection.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-6 py-2.5 rounded-full bg-lumiere-purple text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4A3578] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
