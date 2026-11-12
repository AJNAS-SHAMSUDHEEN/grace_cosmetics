import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/products';
import { Search, X, Sparkles, Filter, Sliders, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface InteractiveDiscoveryProps {
  onOpenDetail: (productId: string) => void;
}

export const InteractiveDiscovery: React.FC<InteractiveDiscoveryProps> = ({ onOpenDetail }) => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('Triskin'); // Pre-seeded with Triskin so users immediately see results, or can clear/search anything!
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(300);

  const searchSuggestions = [
    'Triskin',
    'Peptide',
    'Cellular Renewal',
    'Gold Radiance',
    'SPF 50',
    'Retinol',
    'Cryo',
    'Hyaluronic',
  ];

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      // Search matching name, subtitle, description, ingredients, or active compounds
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.subTitle.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.ingredientsList.some((ing) => ing.toLowerCase().includes(query)) ||
        product.activeCompounds.some((ac) => ac.name.toLowerCase().includes(query));

      // Category matching
      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Triskin'
          ? product.name.toLowerCase().includes('triskin')
          : product.category === selectedCategory);

      // Price matching
      const matchesPrice = product.price <= maxPrice;

      return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, maxPrice]);

  return (
    <section id="discovery" className="py-24 relative bg-luxury-dark border-t border-luxury-gold/15">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-luxury-gold/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.25em] text-luxury-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Algorithmic Matching</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-luxury-ivory tracking-tight">
            Cellular Formulation Discovery
          </h2>
          <p className="text-sm font-sans text-white/60">
            Real-time pharmacopeia search. Type any active compound, clinical need, or collection name such as{' '}
            <strong className="text-luxury-champagne font-mono">"Triskin"</strong> to isolate target elixirs.
          </p>
        </div>

        {/* Search & Filter Command Center */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-8 border border-luxury-gold/25 shadow-2xl space-y-6">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-luxury-gold absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formulations (e.g. Triskin, Retinol, Peptide, Gold, SPF)..."
              className="w-full bg-luxury-espresso/80 border border-luxury-gold/30 rounded-2xl pl-12 pr-12 py-4 text-sm sm:text-base font-sans text-luxury-ivory placeholder:text-white/30 focus:outline-none focus:border-luxury-gold shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-white/40 hover:text-white bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex items-center flex-wrap gap-2 pt-1">
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider mr-1">
              Active Suggestions:
            </span>
            {searchSuggestions.map((sug) => (
              <button
                key={sug}
                onClick={() => setSearchQuery(sug)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  searchQuery.toLowerCase() === sug.toLowerCase()
                    ? 'bg-luxury-gold text-luxury-dark font-semibold'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Category & Price Slider */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-white/10 items-center">
            {/* Category Select (7 cols) */}
            <div className="md:col-span-7 flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {['All', 'Triskin', 'Serums', 'Moisturizers', 'Cleansers', 'Sunscreen'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-luxury-gold/25 border border-luxury-gold text-luxury-ivory font-medium'
                      : 'bg-white/[0.03] text-white/50 border border-white/5 hover:text-white'
                  }`}
                >
                  {cat === 'Triskin' ? 'Triskin Series' : cat}
                </button>
              ))}
            </div>

            {/* Price Range Slider (5 cols) */}
            <div className="md:col-span-5 flex items-center space-x-3 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
              <span className="text-[11px] font-mono text-white/50 whitespace-nowrap">
                Max: <strong className="text-luxury-champagne">${maxPrice}</strong>
              </span>
              <input
                type="range"
                min="70"
                max="300"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-luxury-gold h-1 bg-white/10 rounded-lg cursor-pointer"
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setMaxPrice(300);
                }}
                className="text-[10px] font-mono uppercase text-luxury-gold hover:underline whitespace-nowrap"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter Banner */}
        <div className="max-w-4xl mx-auto flex items-center justify-between mt-6 px-2 text-xs font-mono text-white/50">
          <span>
            Displaying <strong className="text-luxury-gold">{filteredResults.length}</strong> matching formulations
            {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
          </span>
          {searchQuery.toLowerCase().includes('triskin') && (
            <span className="text-luxury-gold flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Triskin Cellular Line Active
            </span>
          )}
        </div>

        {/* Live Matching Results Grid */}
        <div className="max-w-5xl mx-auto mt-8 space-y-4">
          {filteredResults.length === 0 ? (
            <div className="text-center py-16 glass-card rounded-3xl border border-white/10 space-y-3">
              <Search className="w-8 h-8 text-luxury-gold/50 mx-auto" />
              <p className="font-serif text-xl text-luxury-ivory">No formulations found.</p>
              <p className="text-xs text-white/50">
                Try searching for "Triskin", "Vitamin C", "Gold", or reset your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('Triskin');
                  setSelectedCategory('All');
                  setMaxPrice(300);
                }}
                className="mt-2 px-5 py-2 rounded-full bg-luxury-gold text-luxury-dark text-xs font-mono uppercase tracking-wider font-semibold"
              >
                Show Triskin Formulations
              </button>
            </div>
          ) : (
            filteredResults.map((product) => (
              <div
                key={product.id}
                className="group p-4 sm:p-5 rounded-2xl glass-card border border-luxury-gold/15 hover:border-luxury-gold/45 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-5"
              >
                {/* Product Thumbnail & Basic Info */}
                <div
                  onClick={() => onOpenDetail(product.id)}
                  className="flex items-center space-x-4 cursor-pointer w-full sm:w-auto"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl border border-white/10 bg-black/40 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-gold">
                        {product.category}
                      </span>
                      {product.name.toLowerCase().includes('triskin') && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30">
                          Triskin Collection
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl text-luxury-ivory group-hover:text-luxury-champagne transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-1 max-w-md mt-0.5 font-sans">
                      {product.shortDescription}
                    </p>
                    <span className="text-[11px] font-mono text-luxury-gold/80 block mt-1">
                      {product.volume} • Rating: {product.rating} ★
                    </span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  <div className="text-left sm:text-right">
                    <span className="font-serif text-2xl text-luxury-gold font-light block">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs font-mono text-white/40 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenDetail(product.id)}
                      className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-luxury-ivory transition-colors"
                    >
                      Examine
                    </button>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-2.5 rounded-full bg-luxury-gold text-luxury-dark hover:bg-luxury-lightGold transition-colors shadow-lg"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
