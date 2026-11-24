import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Star, ShoppingBag, ArrowRight, Sparkles, Droplets, Shield, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const CategoriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const selectedCategoryParam = searchParams.get('cat') || 'all';
  const [activeTab, setActiveTab] = useState<string>(selectedCategoryParam);

  const categoryData = [
    {
      id: 'cosmetics',
      name: 'Cosmetics',
      tagline: 'Luminous Skin Tints & Peptide Infusions',
      description: 'Hybrid complexion formulas fusing clinical skincare with high-definition optical light diffusion. Weightless breathable coverage.',
      bannerImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
      matchingCategories: ['Beauty Essentials'],
    },
    {
      id: 'skincare',
      name: 'Skincare',
      tagline: 'Cellular Hydration & Barrier Restoration',
      description: 'Prescription-grade restorative creams, deep bio-lipid balms, and gentle balancing cleansers developed to fortify the stratum corneum.',
      bannerImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      matchingCategories: ['Skincare', 'Moisturizers', 'Cleansers'],
    },
    {
      id: 'eye',
      name: 'Eye Care',
      tagline: 'Periorbital Peptide & Caffeine Complexes',
      description: 'Targeted bio-active formulas engineered for delicate periorbital microcirculation, puffiness reduction, and smooth fine line elevation.',
      bannerImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80',
      matchingCategories: ['Beauty Essentials', 'Serums'],
    },
    {
      id: 'hair',
      name: 'Hair & Scalp',
      tagline: 'Follicular Peptides & Scalp Microbiome Care',
      description: 'Nutrient-dense elixirs and biomimetic peptide concentrates that promote robust root density and balanced scalp hydration.',
      bannerImage: 'https://images.unsplash.com/photo-1608248597359-00f722955f19?auto=format&fit=crop&w=1200&q=80',
      matchingCategories: ['Serums'],
    },
    {
      id: 'machines',
      name: 'Machines & Devices',
      tagline: 'Clinical Microcurrent & Sonic Devices',
      description: 'Precision ergonomic home aesthetic devices delivering acoustic vibration, microcurrent toning, and thermal infusion.',
      bannerImage: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1200&q=80',
      matchingCategories: ['Beauty Essentials'],
    },
  ];

  const currentCategory = categoryData.find((c) => c.id === activeTab) || null;

  const displayProducts = PRODUCTS.filter((p) => {
    if (!currentCategory) return true;
    return currentCategory.matchingCategories.includes(p.category);
  });

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', tabId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-xs text-[#8A859E] mb-2 flex items-center space-x-2">
          <Link to="/" className="hover:text-lumiere-purple transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Beauty Categories</span>
        </nav>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] tracking-tight">
          Explore Beauty Categories
        </h1>
        <p className="text-sm text-[#666666] mt-1 max-w-2xl">
          From everyday active essentials to targeted cosmetic treatments and specialized beauty devices, discover our curated collections.
        </p>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        <button
          onClick={() => handleSelectTab('all')}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-[#131124] text-white shadow-xs'
              : 'bg-white hover:bg-[#EFEBF7] text-[#4A4A4A] border border-[#E8DEF5]'
          }`}
        >
          All Categories
        </button>
        {categoryData.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelectTab(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === cat.id
                ? 'bg-lumiere-purple text-white shadow-xs'
                : 'bg-white hover:bg-[#EFEBF7] text-[#4A4A4A] border border-[#E8DEF5]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Category Banner if specific category is selected */}
      {currentCategory && (
        <div className="relative rounded-3xl overflow-hidden bg-[#131124] text-white p-8 sm:p-12 mb-12 shadow-sm min-h-[220px] flex flex-col justify-center">
          <img
            src={currentCategory.bannerImage}
            alt={currentCategory.name}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131124] via-[#131124]/70 to-transparent" />
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D8CEF0]">
              Curated Category
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              {currentCategory.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CEF0] font-medium">
              {currentCategory.tagline}
            </p>
            <p className="text-xs text-white/80 leading-relaxed pt-1">
              {currentCategory.description}
            </p>
          </div>
        </div>
      )}

      {/* Grid of Categories cards (if 'all' is selected) */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryData.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectTab(cat.id)}
              className="group relative rounded-3xl overflow-hidden h-64 bg-[#131124] cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <img
                src={cat.bannerImage}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider uppercase block drop-shadow-md">
                  {cat.name}
                </span>
                <p className="text-xs text-white/80 line-clamp-2 mt-1">
                  {cat.tagline}
                </p>
                <div className="mt-3 flex items-center text-xs text-[#D8CEF0] font-semibold space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products under this category */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A1A1A]">
            {currentCategory ? `${currentCategory.name} Formulations` : 'Featured Products in Categories'}
          </h3>
          <span className="text-xs text-[#8A859E]">
            {displayProducts.length} items available
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product) => {
            const isFav = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#EFEBF7] p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-square rounded-xl bg-[#FAF9F7] overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isFav
                          ? 'bg-rose-50 text-rose-500 shadow-xs'
                          : 'bg-white/80 text-gray-500 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#8A859E] mb-1">
                    <span className="uppercase font-semibold text-lumiere-purple">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                      <span className="font-bold text-[#1A1A1A]">{product.rating}</span>
                    </div>
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="font-serif text-sm font-semibold text-[#1A1A1A] hover:text-lumiere-purple transition-colors line-clamp-1 block"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-[#7A748E] line-clamp-2 mt-1">
                    {product.subTitle}
                  </p>
                </div>
                <div className="pt-3 mt-2 border-t border-[#F2EDFA] flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1A1A1A]">${product.price.toFixed(2)}</span>
                  <div className="flex items-center space-x-1.5">
                    <Link
                      to={`/product/${product.id}`}
                      className="px-2.5 py-1 rounded-full bg-[#FAF9F7] hover:bg-[#EFEBF7] text-[#4A3578] text-[11px] font-semibold"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-7 h-7 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white flex items-center justify-center transition-colors shadow-xs"
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
      </div>
    </div>
  );
};
