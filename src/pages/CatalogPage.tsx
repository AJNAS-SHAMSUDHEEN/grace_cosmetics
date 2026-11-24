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
    'Skincare',
    'Serums',
    'Moisturizers',
    'Cleansers',
    'Sunscreen',
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

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Concern
    if (activeConcern) {
      const c = activeConcern.toLowerCase();
      result = result.filter(
        (p) =>
          p.skinType.some((st) => st.toLowerCase().includes(c)) ||
          p.keyBenefits.some((kb) => kb.toLowerCase().includes(c)) ||
          p.description.toLowerCase().includes(c)
      );
    }

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

    // Price Max
    result = result.filter((p) => p.price <= priceMax);

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
        // Best sellers first
        result.sort((a, b) => (b.tag === 'Best Seller' ? 1 : 0) - (a.tag === 'Best Seller' ? 1 : 0));
        break;
    }

    return result;
  }, [activeCategory, activeConcern, searchQuery, priceMax, sortBy]);

  const hasActiveFilters =
    activeCategory !== 'All' ||
    activeConcern !== null ||
    searchQuery.trim() !== '' ||
    priceMax < 200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-[#7A646E] mb-4 flex items-center space-x-2">
        <Link to="/" className="hover:text-[#701A33] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1E0A12] font-medium">Catalog</span>
        {activeCategory !== 'All' && (
          <>
            <span>/</span>
            <span className="text-[#701A33] font-semibold">{activeCategory}</span>
          </>
        )}
      </nav>

      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E0A12] tracking-tight">
            Curated K-Beauty & Skincare Formulations
          </h1>
          <p className="text-sm text-[#7A646E] mt-1 max-w-2xl font-sans">
            100% Original Products. Authentic Korean skincare, active cellular serums, and dermatological essentials from Grace Beauty Store (@gracecosmetics._).
          </p>
        </div>
        <span className="text-xs text-[#7A646E] font-medium whitespace-nowrap">
          Showing <strong>{filteredProducts.length}</strong> formulations
        </span>
      </div>

      {/* Unboxed Luxury Filter Toolbar */}
      <div className="mb-10 space-y-4">
        {/* Row 1: Search + Sort + Price Range */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search formulations, active ingredients (e.g. Glutathione, Azelaic Acid)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                const newParams = new URLSearchParams(searchParams);
                if (e.target.value) {
                  newParams.set('search', e.target.value);
                } else {
                  newParams.delete('search');
                }
                setSearchParams(newParams);
              }}
              className="w-full pl-10 pr-9 py-2 rounded-full bg-white border border-[#EED9DF] text-xs text-[#1E0A12] placeholder:text-gray-400 focus:outline-none focus:border-[#701A33] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('search');
                  setSearchParams(newParams);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto appearance-none bg-white border border-[#EED9DF] rounded-full pl-4 pr-9 py-2 text-xs font-medium text-[#1E0A12] focus:outline-none focus:border-[#701A33] cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Inline Price Slider */}
          <div className="flex items-center space-x-2 bg-white border border-[#EED9DF] rounded-full px-4 py-2 shrink-0">
            <span className="text-xs text-[#7A646E] whitespace-nowrap">Max:</span>
            <input
              type="range"
              min="15"
              max="200"
              step="5"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-24 sm:w-28 accent-[#701A33] cursor-pointer h-1.5"
            />
            <span className="text-xs font-semibold text-[#1E0A12] min-w-[2.5rem]">
              ${priceMax}
            </span>
          </div>
        </div>

        {/* Row 2: Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A646E] mr-1">
            Category:
          </span>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#701A33] text-white font-semibold shadow-xs'
                    : 'bg-white text-[#55424B] border border-[#EED9DF] hover:border-[#D48D9E]'
                }`}
              >
                {cat}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="ml-auto text-xs text-[#701A33] hover:text-[#520B1E] flex items-center space-x-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Row 3: Skin Concern Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A646E] mr-1">
            Concern:
          </span>
          {skinConcerns.map((con) => {
            const active = (con === 'All Concerns' && !activeConcern) || activeConcern === con;
            return (
              <button
                key={con}
                onClick={() => handleConcernClick(con)}
                className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#FCEEF1] text-[#701A33] font-semibold border border-[#E8BEC5]'
                    : 'bg-white text-[#6B5861] border border-[#EED9DF] hover:border-[#D48D9E]'
                }`}
              >
                {con}
              </button>
            );
          })}
        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#7A646E]">
            <span>Active Filters:</span>
            {activeCategory !== 'All' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#FCEEF1] text-[#701A33] font-medium text-[11px]">
                <span>Category: {activeCategory}</span>
                <button onClick={() => handleCategoryClick('All')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {activeConcern && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#FCEEF1] text-[#701A33] font-medium text-[11px]">
                <span>Concern: {activeConcern}</span>
                <button onClick={() => handleConcernClick('All Concerns')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#FCEEF1] text-[#701A33] font-medium text-[11px]">
                <span>Search: "{searchQuery}"</span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('search');
                    setSearchParams(newParams);
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceMax < 200 && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#FCEEF1] text-[#701A33] font-medium text-[11px]">
                <span>Under ${priceMax}</span>
                <button onClick={() => setPriceMax(200)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#EED9DF] p-8 space-y-4">
          <p className="text-base font-serif text-[#1E0A12]">
            No formulations matched your specific criteria.
          </p>
          <p className="text-xs text-[#7A646E] max-w-md mx-auto">
            Try adjusting your search terms, increasing the maximum price, or resetting filters to browse our full clinical line.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-6 py-2.5 rounded-full bg-[#701A33] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#520B1E] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((p) => {
            const inWishlist = isInWishlist(p.id);
            return (
              <div
                key={p.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-[#EED9DF] overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#D48D9E] transition-all duration-300"
              >
                {/* Top Image Box */}
                <div
                  className="relative aspect-square w-full overflow-hidden bg-[#FDF7F8] p-4 flex items-center justify-center cursor-pointer"
                  onClick={() => navigate(`/product/${p.id}`)}
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

                  {/* Wishlist Button */}
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
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#8B2C47]">
                      <span>{p.category}</span>
                      <span className="text-[#D4A359] flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-current inline" />
                        <span>{p.rating}</span>
                      </span>
                    </div>

                    <h3
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="font-serif text-sm sm:text-base font-semibold text-[#1E0A12] group-hover:text-[#701A33] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#7A646E] line-clamp-2 leading-relaxed">
                      {p.subTitle}
                    </p>
                  </div>

                  {/* Price & Add to Bag */}
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
    </div>
  );
};
