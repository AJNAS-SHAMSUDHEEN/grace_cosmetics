import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import {
  Star,
  Heart,
  ShoppingBag,
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
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
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

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
        result.sort((a, b) => (b.tag ? 1 : 0) - (a.tag ? 1 : 0));
        break;
    }

    return result;
  }, [activeCategory, activeConcern, searchQuery, priceMax, sortBy]);

  const hasActiveFilters = activeCategory !== 'All' || activeConcern !== null || searchQuery !== '' || priceMax < 200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Refined Breadcrumb & Editorial Header */}
      <div className="border-b border-[#F0EBF7] pb-8 mb-8">
        <nav className="text-xs text-[#8A859E] mb-3 flex items-center space-x-2">
          <Link to="/" className="hover:text-lumiere-purple transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Catalog</span>
          {activeCategory !== 'All' && (
            <>
              <span>/</span>
              <span className="text-lumiere-purple font-semibold">{activeCategory}</span>
            </>
          )}
          {activeConcern && (
            <>
              <span>/</span>
              <span className="text-[#554D69] font-medium">{activeConcern}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Curated Formulations
            </h1>
            <p className="text-sm text-[#666666] mt-2 max-w-2xl leading-relaxed">
              Explore science-backed clinical skincare, active cellular bio-peptides, and dermatological essentials engineered for barrier resilience.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8DEF5] text-xs text-[#554D69] shadow-2xs self-start md:self-auto shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Showing <strong className="text-[#1A1A1A]">{filteredProducts.length}</strong> formulations</span>
          </div>
        </div>
      </div>

      {/* 2. Top Category Pills Bar (Horizontal scroll with elegant active indicator) */}
      <div className="mb-6 flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#131124] text-white shadow-sm'
                  : 'bg-white hover:bg-[#F3EEFA] text-[#4A4A4A] border border-[#E8DEF5] hover:border-[#D5C7EE]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3. Luxury Utility Toolbar: Search + Concern Selector + Price + Sort */}
      <div className="bg-white rounded-2xl border border-[#EFEBF7] p-3 sm:p-4 shadow-xs mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Integrated Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#8A859E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by ingredient, concern, or name (e.g. Niacinamide, Retinol, Acne)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] placeholder:text-[#9B95AC] focus:outline-none focus:border-lumiere-purple focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Skin Concern Selector */}
          <div className="md:col-span-3">
            <select
              value={activeConcern || 'All Concerns'}
              onChange={(e) => handleConcernClick(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] font-medium focus:outline-none focus:border-lumiere-purple cursor-pointer"
            >
              <option value="All Concerns">All Skin Concerns</option>
              {skinConcerns.filter((c) => c !== 'All Concerns').map((con) => (
                <option key={con} value={con}>
                  Target: {con}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] font-medium focus:outline-none focus:border-lumiere-purple cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Price Cap Filter */}
          <div className="md:col-span-2 flex items-center justify-between px-3 py-2 bg-[#FAF9F7] rounded-xl border border-[#E8DEF5] text-xs">
            <span className="text-[#8A859E] font-medium">Max:</span>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-20 sm:w-24 accent-lumiere-purple cursor-pointer mx-2"
            />
            <span className="font-bold text-[#1A1A1A]">${priceMax}</span>
          </div>
        </div>

        {/* Quick Concern Pills (Horizontal bar for quick single-click filtering) */}
        <div className="mt-3 pt-3 border-t border-[#F2EDFA] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            <span className="text-[11px] font-semibold text-[#8A859E] mr-1 hidden sm:inline">
              Quick Filter:
            </span>
            {skinConcerns.map((con) => {
              const isSelected = (!activeConcern && con === 'All Concerns') || (activeConcern === con);
              return (
                <button
                  key={con}
                  onClick={() => handleConcernClick(con)}
                  className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#EAE2F8] text-[#4A3578] font-semibold border border-[#D5C7EE]'
                      : 'bg-white hover:bg-[#FAF9F7] text-[#666666] border border-[#EFEBF7]'
                  }`}
                >
                  {con}
                </button>
              );
            })}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-[#5B4296] hover:text-[#3B2568] font-semibold flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex items-center flex-wrap gap-2 mb-6 text-xs animate-fade-in">
          <span className="text-[#8A859E]">Active Filters:</span>
          {activeCategory !== 'All' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E0D8ED] text-[#4A3578] text-xs font-medium shadow-2xs">
              Category: {activeCategory}
              <button
                onClick={() => handleCategoryClick('All')}
                className="ml-2 hover:text-black p-0.5"
                title="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {activeConcern && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E0D8ED] text-[#4A3578] text-xs font-medium shadow-2xs">
              Concern: {activeConcern}
              <button
                onClick={() => handleConcernClick('All Concerns')}
                className="ml-2 hover:text-black p-0.5"
                title="Remove concern filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E0D8ED] text-[#4A3578] text-xs font-medium shadow-2xs">
              Keyword: "{searchQuery}"
              <button
                onClick={() => setSearchQuery('')}
                className="ml-2 hover:text-black p-0.5"
                title="Clear search keyword"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {priceMax < 200 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E0D8ED] text-[#4A3578] text-xs font-medium shadow-2xs">
              Under: ${priceMax}
              <button
                onClick={() => setPriceMax(200)}
                className="ml-2 hover:text-black p-0.5"
                title="Reset price limit"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* 5. Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const isFav = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-[#EFEBF7] p-4 sm:p-5 flex flex-col justify-between hover:shadow-lg hover:border-lumiere-purple/30 transition-all duration-300"
              >
                {/* Media Section */}
                <div>
                  <div className="relative aspect-[4/5] rounded-2xl bg-[#FAF9F7] overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Tag badge */}
                    {product.tag && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold tracking-wider uppercase text-lumiere-purple border border-[#E8DEF5] shadow-xs">
                        {product.tag}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isFav
                          ? 'bg-rose-50 text-rose-500 shadow-sm'
                          : 'bg-white/90 text-gray-400 hover:text-rose-500 hover:bg-white shadow-2xs'
                      }`}
                      title={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-[11px] text-[#8A859E] mb-1.5">
                    <span className="uppercase tracking-widest font-semibold text-lumiere-purple">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      <span className="font-bold text-[#1A1A1A]">{product.rating}</span>
                      <span className="text-[#8A859E]">({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <Link
                    to={`/product/${product.id}`}
                    className="block group-hover:text-lumiere-purple transition-colors"
                  >
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] line-clamp-1 leading-snug">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#7A748E] line-clamp-2 mt-1 leading-relaxed">
                    {product.subTitle || product.shortDescription}
                  </p>
                </div>

                {/* Price & Action Row */}
                <div className="pt-4 mt-3 border-t border-[#F2EDFA] flex items-center justify-between">
                  <div>
                    <span className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1.5">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="px-3 py-1.5 rounded-full bg-[#FAF9F7] hover:bg-[#EFEBF7] text-[#4A3578] text-xs font-semibold transition-colors"
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
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EFEBF7] max-w-xl mx-auto px-6 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#FAF9F7] text-lumiere-purple flex items-center justify-center mx-auto mb-4 border border-[#E8DEF5]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">
            No matching formulations found
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6">
            We couldn't find any products matching your specific combination of filters. Try clearing your filters to explore our full clinical collection.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-6 py-3 rounded-full bg-lumiere-purple text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4A3578] transition-colors shadow-md"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
