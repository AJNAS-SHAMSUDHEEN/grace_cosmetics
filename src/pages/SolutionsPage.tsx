import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HEALTH_CONDITIONS } from '../data/healthConditions';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Flame,
  ArrowRight,
  Star,
  ShoppingBag,
  Heart,
  CheckCircle2,
  Stethoscope,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const SolutionsPage: React.FC = () => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<'all' | 'influencer' | 'dermatologist' | 'koreanglow'>('all');

  const collections = [
    {
      id: 'influencer',
      badge: 'TRENDING',
      title: "INFLUENCERS' FAVOURITES",
      desc: 'High-radiance formulas trending with beauty editors and skincare creators.',
      accent: 'from-amber-500/20 to-purple-600/30',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
      filterTag: 'Best Seller',
    },
    {
      id: 'dermatologist',
      badge: 'CLINICAL CARE',
      title: 'TRUSTED CARE, HEALTHY SKIN',
      desc: 'Clinically tested, dermatologist-approved essentials for severe barrier disruption.',
      accent: 'from-purple-900/60 to-purple-950/90',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      filterTag: 'Award Winner',
    },
    {
      id: 'koreanglow',
      badge: 'SEOUL LABS',
      title: 'KOREAN GLOW COLLECTION',
      desc: 'Multi-layer glass-skin rituals formulated with fermented actives and centella.',
      accent: 'from-indigo-900/60 to-purple-900/80',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
      filterTag: 'New',
    },
  ];

  const concernsList = [
    'All Concerns',
    'Acne',
    'Pigmentation',
    'Dull skin',
    'Tan',
    'Dryness',
    'Wrinkles',
  ];

  // Matched conditions from symptom search
  const matchedConditions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return HEALTH_CONDITIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.explanation.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q)) ||
        c.symptoms.some((s) => s.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Product filtering
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Symptom search matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      // Collect product IDs from matching conditions
      const conditionProductIds = new Set<string>();
      matchedConditions.forEach((c) => c.productIds.forEach((pid: string) => conditionProductIds.add(pid)));

      result = result.filter(
        (p) =>
          conditionProductIds.has(p.id) ||
          p.name.toLowerCase().includes(q) ||
          p.keyBenefits.some((b) => b.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q) ||
          p.skinType.some((st) => st.toLowerCase().includes(q))
      );
    }

    // Concern tag filter
    if (selectedConcern && selectedConcern !== 'All Concerns') {
      const c = selectedConcern.toLowerCase();
      result = result.filter(
        (p) =>
          p.skinType.some((st) => st.toLowerCase().includes(c)) ||
          p.keyBenefits.some((kb) => kb.toLowerCase().includes(c)) ||
          p.description.toLowerCase().includes(c)
      );
    }

    // Collection filter
    if (activeCollection === 'influencer') {
      result = result.filter((p) => p.tag === 'Best Seller' || p.rating >= 4.9);
    } else if (activeCollection === 'dermatologist') {
      result = result.filter((p) => p.tag === 'Award Winner' || p.category === 'Serums' || p.category === 'Moisturizers');
    } else if (activeCollection === 'koreanglow') {
      result = result.filter((p) => p.tag === 'New' || p.name.toLowerCase().includes('glow') || p.name.toLowerCase().includes('essence') || p.name.toLowerCase().includes('toner'));
    }

    return result;
  }, [searchQuery, matchedConditions, selectedConcern, activeCollection]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-xs text-[#8A859E] mb-2 flex items-center space-x-2">
          <Link to="/" className="hover:text-lumiere-purple transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Targeted Solutions</span>
        </nav>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] tracking-tight">
          Targeted Clinical Solutions
        </h1>
        <p className="text-sm text-[#666666] mt-1 max-w-2xl">
          Engineered for specific dermatological concerns. Search your symptoms or explore our clinical protocols.
        </p>
      </div>

      {/* Prominent Condition / Symptom Search Engine */}
      <div className="bg-gradient-to-r from-[#F4EEFC] via-[#ECE5F8] to-[#FAF9F7] rounded-3xl border border-[#DFD3F4] p-6 sm:p-8 mb-10 shadow-sm">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-lumiere-purple text-xs font-semibold mb-3 border border-[#E8DEF5]">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Symptom-to-Formulation Engine</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Find Your Solution
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] mt-1.5">
            Type your condition, medical skin concern, or symptom (e.g., <em>acne, melasma, dryness, rosacea, redness</em>) to match clinical actives.
          </p>
        </div>

        {/* Large Chat / Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-4">
          <Search className="w-5 h-5 text-lumiere-purple absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Type a skin problem or symptom (e.g. acne scars, rough texture, dehydration)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-full bg-white border border-[#D5C7EE] text-sm text-[#1A1A1A] placeholder:text-[#9A94AA] shadow-sm focus:outline-none focus:border-lumiere-purple focus:ring-2 focus:ring-lumiere-purple/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular symptom tags */}
        <div className="max-w-2xl mx-auto flex items-center justify-center flex-wrap gap-1.5 text-xs">
          <span className="text-[#777777] font-medium mr-1">Popular:</span>
          {['Acne', 'Hyperpigmentation', 'Dry Redness', 'Enlarged Pores', 'Fine Lines'].map((sym) => (
            <button
              key={sym}
              onClick={() => setSearchQuery(sym)}
              className="px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-[#4A3578] border border-[#E2D6F5] text-[11px] font-medium transition-all"
            >
              {sym}
            </button>
          ))}
        </div>

        {/* Matched condition banner if detected */}
        {matchedConditions.length > 0 && (
          <div className="max-w-2xl mx-auto mt-6 bg-white rounded-2xl p-4 border border-[#D8CEF0] shadow-xs">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  Matched Clinical Profile: {matchedConditions[0].name}
                </h4>
                <p className="text-xs text-[#666666] mt-0.5">{matchedConditions[0].explanation}</p>
                <div className="mt-2 flex items-center space-x-2 text-[11px] text-[#4A3578]">
                  <span className="font-semibold">Recommended Actives:</span>
                  <span>{matchedConditions[0].recommendedActiveIngredients.join(' • ')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3 Spotlight Banners */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-4">
          Targeted Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => {
            const isSelected = activeCollection === col.id;
            return (
              <div
                key={col.id}
                onClick={() => setActiveCollection(isSelected ? 'all' : (col.id as any))}
                className={`group relative rounded-3xl overflow-hidden min-h-[300px] flex flex-col justify-between p-7 text-white cursor-pointer shadow-sm hover:shadow-lg transition-all border-2 ${
                  isSelected ? 'border-lumiere-purple shadow-md' : 'border-transparent'
                }`}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

                <div className="relative z-10 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D8CEF0]">
                    {col.badge}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-snug">
                    {col.title}
                  </h3>
                  <p className="text-xs text-white/80 max-w-[240px]">
                    {col.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#D8CEF0] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>{isSelected ? 'Showing Collection' : 'Filter Collection'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full bg-lumiere-purple text-white text-[10px] font-bold">
                      ACTIVE
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concern Quick Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8A859E] mr-1">
          Filter by Concern:
        </span>
        {concernsList.map((con) => {
          const isSelected = (!selectedConcern && con === 'All Concerns') || (selectedConcern === con);
          return (
            <button
              key={con}
              onClick={() => setSelectedConcern(con === 'All Concerns' ? null : con)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                isSelected
                  ? 'bg-lumiere-purple text-white border-lumiere-purple shadow-xs font-semibold'
                  : 'bg-white hover:bg-[#FAF9F7] text-[#4A4A4A] border-[#E8DEF5]'
              }`}
            >
              {con}
            </button>
          );
        })}
      </div>

      {/* Matched Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A1A1A]">
            Matched Solution Formulations
          </h3>
          <span className="text-xs text-[#8A859E]">
            {filteredProducts.length} targeted products
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const isFav = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl border border-[#EFEBF7] p-4 sm:p-5 flex flex-col justify-between hover:shadow-lg hover:border-lumiere-purple/30 transition-all duration-300"
                >
                  <div>
                    <div className="relative aspect-[4/5] rounded-2xl bg-[#FAF9F7] overflow-hidden mb-3.5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isFav
                            ? 'bg-rose-50 text-rose-500 shadow-sm'
                            : 'bg-white/90 text-gray-400 hover:text-rose-500 shadow-2xs'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#8A859E] mb-1.5">
                      <span className="uppercase font-semibold tracking-widest text-lumiere-purple">{product.category}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        <span className="font-bold text-[#1A1A1A]">{product.rating}</span>
                      </div>
                    </div>

                    <Link
                      to={`/product/${product.id}`}
                      className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] hover:text-lumiere-purple transition-colors line-clamp-1 block leading-snug"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-[#7A748E] line-clamp-2 mt-1 leading-relaxed">
                      {product.subTitle}
                    </p>

                    {/* Active compound tag */}
                    {product.activeCompounds.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        <span className="text-[10px] bg-[#FAF9F7] border border-[#EAE2F8] px-2.5 py-0.5 rounded-full text-[#4A3578] font-semibold">
                          {product.activeCompounds[0].name} ({product.activeCompounds[0].percentage})
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#F2EDFA] flex items-center justify-between">
                    <span className="text-base sm:text-lg font-bold text-[#1A1A1A]">${product.price.toFixed(2)}</span>
                    <div className="flex items-center space-x-1.5">
                      <Link
                        to={`/product/${product.id}`}
                        className="px-3 py-1.5 rounded-full bg-[#FAF9F7] hover:bg-[#EFEBF7] text-[#4A3578] text-xs font-semibold"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-8 h-8 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white flex items-center justify-center transition-colors shadow-xs"
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
          <div className="py-12 text-center bg-white rounded-3xl border border-[#EFEBF7] p-8">
            <p className="text-sm text-[#666666] mb-3">No specific formulas match your exact query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedConcern(null);
                setActiveCollection('all');
              }}
              className="px-5 py-2 rounded-full bg-lumiere-purple text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
