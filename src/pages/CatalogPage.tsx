import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
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
  Check,
  ArrowRight,
  Filter,
  DollarSign,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

type PriceBracket = 'all' | 'under-20' | '20-30' | '30-50' | 'above-50';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { products } = useShop();

  // Read params from URL
  const initialCategory = searchParams.get('category') || 'All';
  const initialConcern = searchParams.get('concern') || null;
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeConcern, setActiveConcern] = useState<string | null>(initialConcern);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [priceMax, setPriceMax] = useState<number>(100);
  const [priceBracket, setPriceBracket] = useState<PriceBracket>('all');
  const [minRating, setMinRating] = useState<number>(0);

  // Filter drawer & sidebar controls
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

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
    { label: 'All Concerns', value: null },
    { label: 'Acne & Blemishes', value: 'Acne' },
    { label: 'Hyperpigmentation', value: 'Pigmentation' },
    { label: 'Dull Skin & Radiance', value: 'Dull skin' },
    { label: 'Tan & Sun Care', value: 'Tan' },
    { label: 'Dryness & Moisture Barrier', value: 'Dryness' },
    { label: 'Fine Lines & Wrinkles', value: 'Wrinkles' },
  ];

  const priceBrackets = [
    { id: 'all' as PriceBracket, label: 'All Prices', min: 0, max: 200 },
    { id: 'under-20' as PriceBracket, label: 'Under $20', min: 0, max: 20 },
    { id: '20-30' as PriceBracket, label: '$20 to $30', min: 20, max: 30 },
    { id: '30-50' as PriceBracket, label: '$30 to $50', min: 30, max: 50 },
    { id: 'above-50' as PriceBracket, label: '$50 and Above', min: 50, max: 200 },
  ];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    categories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = products.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [products]);

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

  const handleConcernClick = (conValue: string | null) => {
    setActiveConcern(conValue);
    const newParams = new URLSearchParams(searchParams);
    if (!conValue) {
      newParams.delete('concern');
    } else {
      newParams.set('concern', conValue);
    }
    setSearchParams(newParams);
  };

  const handlePriceBracketClick = (bracket: PriceBracket) => {
    setPriceBracket(bracket);
    const found = priceBrackets.find((b) => b.id === bracket);
    if (found && bracket !== 'all') {
      setPriceMax(found.max);
    } else if (bracket === 'all') {
      setPriceMax(100);
    }
  };

  const resetAllFilters = () => {
    setActiveCategory('All');
    setActiveConcern(null);
    setSearchQuery('');
    setPriceMax(100);
    setPriceBracket('all');
    setMinRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  // Active filter counter
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== 'All') count++;
    if (activeConcern !== null) count++;
    if (priceBracket !== 'all' || priceMax < 100) count++;
    if (minRating > 0) count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [activeCategory, activeConcern, priceBracket, priceMax, minRating, searchQuery]);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

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

    // Price filtering
    if (priceBracket !== 'all') {
      const found = priceBrackets.find((b) => b.id === priceBracket);
      if (found) {
        result = result.filter((p) => p.price >= found.min && p.price <= found.max);
      }
    } else if (priceMax < 100) {
      result = result.filter((p) => p.price <= priceMax);
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
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
        result.sort((a, b) => (b.tag === 'Best Seller' ? 1 : 0) - (a.tag === 'Best Seller' ? 1 : 0));
        break;
    }

    return result;
  }, [products, activeCategory, activeConcern, searchQuery, priceBracket, priceMax, minRating, sortBy]);

  // Reusable Filter Sidebar/Drawer Content
  const renderFilterPanel = () => (
    <div className="space-y-6 text-[#1E0A12]">
      {/* Sidebar Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F2E1E6]">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-[#701A33]" />
          <h2 className="font-serif text-lg font-semibold text-[#1E0A12]">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#701A33] text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetAllFilters}
            className="text-xs text-[#701A33] hover:text-[#520B1E] font-medium flex items-center space-x-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. Price Filter (Slider & Flipkart/Amazon Brackets) */}
      <div className="space-y-3 pb-6 border-b border-[#F2E1E6]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A646E]">
            Price Range
          </span>
          <span className="text-xs font-bold text-[#701A33]">
            {priceBracket !== 'all'
              ? priceBrackets.find((b) => b.id === priceBracket)?.label
              : `Up to $${priceMax}`}
          </span>
        </div>

        {/* Max Price Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="15"
            max="100"
            step="5"
            value={priceMax}
            onChange={(e) => {
              setPriceMax(Number(e.target.value));
              setPriceBracket('all');
            }}
            className="w-full accent-[#701A33] cursor-pointer h-1.5 bg-[#EED9DF] rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-[#7A646E]">
            <span>$15</span>
            <span>$50</span>
            <span>$100+</span>
          </div>
        </div>

        {/* Flipkart / Amazon style quick price bracket radio pills */}
        <div className="space-y-1.5 pt-2">
          {priceBrackets.map((bracket) => {
            const isSelected = priceBracket === bracket.id;
            return (
              <button
                key={bracket.id}
                onClick={() => handlePriceBracketClick(bracket.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#FCEEF1] text-[#701A33] font-semibold border border-[#E8BEC5]'
                    : 'text-[#55424B] hover:bg-[#FDF7F8] border border-transparent'
                }`}
              >
                <span>{bracket.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#701A33]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Category Filter (Amazon / Flipkart Checkbox List) */}
      <div className="space-y-3 pb-6 border-b border-[#F2E1E6]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A646E]">
            Category
          </span>
          {activeCategory !== 'All' && (
            <button
              onClick={() => handleCategoryClick('All')}
              className="text-[11px] text-[#701A33] hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#701A33] text-white font-medium shadow-xs'
                    : 'text-[#4A3841] hover:bg-[#FCEEF1]/60'
                }`}
              >
                <span className="truncate">{cat}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'text-[#7A646E] bg-[#F7E6EB]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Skin Concern Filter */}
      <div className="space-y-3 pb-6 border-b border-[#F2E1E6]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A646E]">
            Skin Concern
          </span>
          {activeConcern && (
            <button
              onClick={() => handleConcernClick(null)}
              className="text-[11px] text-[#701A33] hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-1">
          {skinConcerns.map((con) => {
            const isSelected =
              (con.value === null && !activeConcern) || activeConcern === con.value;
            return (
              <button
                key={con.label}
                onClick={() => handleConcernClick(con.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#FCEEF1] text-[#701A33] font-semibold border border-[#E8BEC5]'
                    : 'text-[#55424B] hover:bg-[#FDF7F8]'
                }`}
              >
                <span className="truncate">{con.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#701A33]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Customer Rating Filter */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7A646E]">
          Customer Rating
        </span>
        <div className="space-y-1.5">
          {[
            { stars: 4.8, label: '4.8★ & above' },
            { stars: 4.5, label: '4.5★ & above' },
            { stars: 4.0, label: '4.0★ & above' },
            { stars: 0, label: 'All Ratings' },
          ].map((item) => {
            const isSelected = minRating === item.stars;
            return (
              <button
                key={item.stars}
                onClick={() => setMinRating(item.stars)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#FCEEF1] text-[#701A33] font-semibold border border-[#E8BEC5]'
                    : 'text-[#55424B] hover:bg-[#FDF7F8]'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  {item.stars > 0 ? (
                    <>
                      <div className="flex items-center text-[#D4A359]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(item.stars) ? 'fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs">{item.label}</span>
                    </>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#701A33]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-[#7A646E] mb-3 flex items-center space-x-2">
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E0A12] tracking-tight">
            Curated Formulations
          </h1>
          <p className="text-xs sm:text-sm text-[#7A646E] mt-1 max-w-2xl font-sans">
            Science-backed dermatological skincare, active cellular serums, and everyday radiance essentials.
          </p>
        </div>
        <span className="text-xs text-[#7A646E] font-medium whitespace-nowrap">
          Showing <strong>{filteredProducts.length}</strong> formulations
        </span>
      </div>

      {/* Top Filter & Search Action Bar (Flipkart & Amazon Style) */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-3">
          {/* Side Filter Toggle Button */}
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsMobileDrawerOpen(true);
              } else {
                setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
              }
            }}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs border ${
              activeFiltersCount > 0
                ? 'bg-[#701A33] text-white border-[#701A33]'
                : 'bg-white text-[#1E0A12] border-[#EED9DF] hover:border-[#701A33]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-white text-[#701A33] text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

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
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-[#EED9DF] text-xs text-[#1E0A12] placeholder:text-gray-400 focus:outline-none focus:border-[#701A33] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('search');
                  setSearchParams(newParams);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="relative shrink-0 hidden sm:block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-[#EED9DF] rounded-full pl-4 pr-9 py-2.5 text-xs font-medium text-[#1E0A12] focus:outline-none focus:border-[#701A33] cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Mobile Sort By (under search if on mobile) */}
        <div className="sm:hidden flex items-center justify-between pt-1">
          <span className="text-xs text-[#7A646E]">
            {filteredProducts.length} items found
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-[#EED9DF] rounded-full pl-3 pr-8 py-1.5 text-xs font-medium text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low</option>
              <option value="price-desc">Price: High</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Active Filter Chips (Amazon / Flipkart Style) */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-[#7A646E]">
            <span className="text-[11px] font-semibold text-[#1E0A12]">Active Filters:</span>
            {activeCategory !== 'All' && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FCEEF1] text-[#701A33] font-medium text-[11px] border border-[#E8BEC5]">
                <span>Category: {activeCategory}</span>
                <button
                  onClick={() => handleCategoryClick('All')}
                  className="hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {activeConcern && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FCEEF1] text-[#701A33] font-medium text-[11px] border border-[#E8BEC5]">
                <span>Concern: {activeConcern}</span>
                <button
                  onClick={() => handleConcernClick(null)}
                  className="hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceBracket !== 'all' && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FCEEF1] text-[#701A33] font-medium text-[11px] border border-[#E8BEC5]">
                <span>
                  Price: {priceBrackets.find((b) => b.id === priceBracket)?.label}
                </span>
                <button
                  onClick={() => handlePriceBracketClick('all')}
                  className="hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceBracket === 'all' && priceMax < 100 && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FCEEF1] text-[#701A33] font-medium text-[11px] border border-[#E8BEC5]">
                <span>Under ${priceMax}</span>
                <button
                  onClick={() => setPriceMax(100)}
                  className="hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FCEEF1] text-[#701A33] font-medium text-[11px] border border-[#E8BEC5]">
                <span>{minRating}★ & Above</span>
                <button
                  onClick={() => setMinRating(0)}
                  className="hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FCEEF1] text-[#701A33] font-medium text-[11px] border border-[#E8BEC5]">
                <span>Search: "{searchQuery}"</span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('search');
                    setSearchParams(newParams);
                  }}
                  className="hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="text-[11px] text-[#701A33] hover:underline font-semibold ml-1"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout: Side Filter Panel + Product Grid */}
      <div className="flex gap-8 items-start">
        {/* Desktop Sticky Side Filter Panel */}
        {isDesktopSidebarOpen && (
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24 bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs">
            {renderFilterPanel()}
          </aside>
        )}

        {/* Product Grid Area */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#EED9DF] p-8 space-y-4">
              <p className="text-base font-serif text-[#1E0A12]">
                No formulations matched your specific criteria.
              </p>
              <p className="text-xs text-[#7A646E] max-w-md mx-auto">
                Try adjusting your search terms, changing price range, or resetting filters to browse our full clinical line.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 rounded-full bg-[#701A33] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#520B1E] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 ${
                isDesktopSidebarOpen
                  ? 'sm:grid-cols-2 lg:grid-cols-3'
                  : 'sm:grid-cols-3 lg:grid-cols-4'
              } gap-4 sm:gap-6`}
            >
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

          {/* Under Page Quick Price Filter Section (Flipkart / Amazon Style) */}
          <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-[#FDF7F8] via-[#FAF0F3] to-[#F5E6EB] rounded-3xl border border-[#EED9DF]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1E0A12] flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-[#701A33]" />
                  <span>Shop by Price Range</span>
                </h3>
                <p className="text-xs text-[#7A646E] mt-0.5">
                  Browse authentic skincare tailored to your personal beauty budget.
                </p>
              </div>
              {priceBracket !== 'all' && (
                <button
                  onClick={() => handlePriceBracketClick('all')}
                  className="text-xs font-semibold text-[#701A33] hover:underline"
                >
                  View All Prices
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'under-20' as PriceBracket, label: 'Under $20', desc: 'Everyday budget picks' },
                { id: '20-30' as PriceBracket, label: '$20 – $30', desc: 'Korean best sellers' },
                { id: '30-50' as PriceBracket, label: '$30 – $50', desc: 'Targeted serums & treatments' },
                { id: 'above-50' as PriceBracket, label: '$50+', desc: 'Complete luxury routines' },
              ].map((bracket) => {
                const active = priceBracket === bracket.id;
                return (
                  <button
                    key={bracket.id}
                    onClick={() => {
                      handlePriceBracketClick(bracket.id);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className={`p-4 rounded-2xl text-left transition-all border ${
                      active
                        ? 'bg-[#701A33] text-white border-[#701A33] shadow-md'
                        : 'bg-white text-[#1E0A12] border-[#EED9DF] hover:border-[#D48D9E] hover:shadow-xs'
                    }`}
                  >
                    <span className="block text-sm font-bold">{bracket.label}</span>
                    <span
                      className={`block text-[11px] mt-0.5 ${
                        active ? 'text-rose-100' : 'text-[#7A646E]'
                      }`}
                    >
                      {bracket.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Filter Drawer (Flipkart / Amazon Mobile Experience) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#F2E1E6]">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#701A33]" />
                <span className="font-serif font-semibold text-base text-[#1E0A12]">
                  Filters
                </span>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#701A33] text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {renderFilterPanel()}
            </div>

            {/* Sticky Bottom Drawer Actions */}
            <div className="p-4 border-t border-[#F2E1E6] bg-white flex items-center space-x-3">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2.5 rounded-full border border-[#EED9DF] text-xs font-semibold text-[#55424B] hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-[#701A33] text-white text-xs font-semibold hover:bg-[#520B1E] transition-colors shadow-xs"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
