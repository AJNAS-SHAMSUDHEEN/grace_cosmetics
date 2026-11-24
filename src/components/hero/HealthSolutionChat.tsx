import React, { useState, useMemo } from 'react';
import { HEALTH_CONDITIONS, HealthCondition } from '../../data/healthConditions';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { Search, X, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface HealthSolutionChatProps {
  onOpenDetail: (productId: string) => void;
}

export const HealthSolutionChat: React.FC<HealthSolutionChatProps> = ({ onOpenDetail }) => {
  const { addToCart } = useCart();
  const [searchInput, setSearchInput] = useState('');
  const [activeCondition, setActiveCondition] = useState<HealthCondition | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const quickConditions = [
    { label: 'Acne & Breakouts', query: 'acne' },
    { label: 'Eczema & Itch', query: 'eczema' },
    { label: 'Rosacea & Redness', query: 'rosacea' },
    { label: 'Melasma & Spots', query: 'melasma' },
    { label: 'Severe Dryness', query: 'dryness' },
    { label: 'Fine Lines', query: 'wrinkles' },
    { label: 'Dark Circles', query: 'dark circles' },
    { label: 'Psoriasis', query: 'psoriasis' },
  ];

  // Match condition by search query
  const matchCondition = (query: string): HealthCondition | null => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    // 1. Name match
    const nameMatch = HEALTH_CONDITIONS.find((c) =>
      c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
    if (nameMatch) return nameMatch;

    // 2. Keyword match
    const keywordMatch = HEALTH_CONDITIONS.find((c) =>
      c.keywords.some((k) => q.includes(k) || k.includes(q))
    );
    if (keywordMatch) return keywordMatch;

    // 3. Symptoms match
    const symptomMatch = HEALTH_CONDITIONS.find((c) =>
      c.symptoms.some((s) => s.toLowerCase().includes(q))
    );
    if (symptomMatch) return symptomMatch;

    // 4. Fallback search across product names or ingredients
    const matchedProducts = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subTitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.skinType.some((st) => st.toLowerCase().includes(q))
    );

    if (matchedProducts.length > 0) {
      return {
        id: 'custom-match',
        name: `Targeted Solutions for "${query}"`,
        keywords: [query],
        category: 'Sensitivity',
        symptoms: ['Tailored clinical match'],
        explanation: `Formulations engineered to calm and address "${query}".`,
        recommendedActiveIngredients: ['Biomimetic Ceramides', 'Niacinamide', 'Hyaluronic Acid'],
        productIds: matchedProducts.map((p) => p.id),
      };
    }

    return null;
  };

  const handleSelectCondition = (query: string) => {
    setSearchInput(query);
    const match = matchCondition(query);
    setActiveCondition(match);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    if (val.trim()) {
      const match = matchCondition(val);
      setActiveCondition(match);
    } else {
      setActiveCondition(null);
    }
  };

  const handleClear = () => {
    setSearchInput('');
    setActiveCondition(null);
  };

  const matchedProducts = useMemo(() => {
    if (!activeCondition) return [];
    return PRODUCTS.filter((p) => activeCondition.productIds.includes(p.id));
  }, [activeCondition]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <div className="w-full space-y-3">
      {/* Prominent Search Bar */}
      <div className="relative">
        <div
          className={`relative flex items-center bg-white rounded-full border transition-all duration-300 shadow-sm ${
            isFocused
              ? 'border-[#5B4296] ring-3 ring-[#E8DEF5] shadow-md'
              : 'border-[#E0D8ED] hover:border-[#C4B5E8]'
          }`}
        >
          <Search className="w-5 h-5 text-[#6C559C] absolute left-4 pointer-events-none" />
          
          <input
            type="text"
            value={searchInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChange={handleInputChange}
            placeholder="Type a disease, condition, or symptom (e.g. Eczema, Acne, Rosacea, Wrinkles)..."
            className="w-full bg-transparent pl-12 pr-28 py-3.5 sm:py-4 text-xs sm:text-sm font-sans text-[#1A1A1A] placeholder:text-[#8E8E93] focus:outline-none rounded-full"
          />

          {searchInput && (
            <button
              onClick={handleClear}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 mr-2"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => handleSelectCondition(searchInput)}
            className="mr-1.5 px-5 py-2.5 rounded-full bg-[#5B4296] hover:bg-[#4A3578] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            Search
          </button>
        </div>

        {/* Auto Side-Scrolling Quick Suggestion Pills (In one line, matching search bar width, without 'Popular Concerns') */}
        <div className="relative w-full overflow-hidden pt-2.5">
          {/* Subtle edge fade gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#F5F0FB] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#EDE6F8] to-transparent z-10" />

          {/* Scrolling ticker track */}
          <div className="animate-marquee-slow flex items-center space-x-2 py-0.5">
            {[...quickConditions, ...quickConditions].map((qc, index) => {
              const isSelected = searchInput.toLowerCase() === qc.query.toLowerCase();
              return (
                <button
                  key={`${qc.query}-${index}`}
                  onClick={() => handleSelectCondition(qc.query)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border shrink-0 ${
                    isSelected
                      ? 'bg-[#5B4296] text-white border-[#5B4296] shadow-xs'
                      : 'bg-white/90 hover:bg-white text-[#554D69] border-[#E0D8ED] hover:border-[#5B4296] hover:text-[#5B4296] shadow-2xs'
                  }`}
                >
                  {qc.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Relevant Products Display (Appears smoothly when query matches) */}
        {activeCondition && (
          <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DEF5] shadow-xl animate-fade-in space-y-3">
            {/* Condition Header Bar */}
            <div className="flex items-center justify-between border-b border-[#F0EBF7] pb-2.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B4296] bg-[#F5F0FB] px-2 py-0.5 rounded-full border border-[#E8DEF5]">
                  {activeCondition.category}
                </span>
                <h4 className="font-serif text-base font-bold text-[#1A1A1A] mt-1">
                  {activeCondition.name}
                </h4>
                <p className="text-xs text-[#666666] line-clamp-2 mt-0.5">
                  {activeCondition.explanation}
                </p>
              </div>
              <button
                onClick={handleClear}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Matched Products Horizontal Cards Grid */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#1A1A1A] block">
                Targeted Formulations for this Condition:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                {matchedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center space-x-3 p-2.5 rounded-xl bg-[#FAF9F7] border border-[#EAE4F5] hover:border-[#D8CEF0] transition-colors"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      onClick={() => onOpenDetail(prod.id)}
                      className="w-12 h-14 object-cover rounded-lg bg-white border border-gray-100 cursor-pointer shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5
                        onClick={() => onOpenDetail(prod.id)}
                        className="font-serif text-xs font-semibold text-[#1A1A1A] truncate cursor-pointer hover:text-lumiere-purple"
                      >
                        {prod.name}
                      </h5>
                      <span className="text-[10px] text-gray-500 block truncate">
                        {prod.category} • ${prod.price}
                      </span>

                      <div className="flex items-center space-x-2 mt-1">
                        <button
                          onClick={() => handleAddToCart(prod)}
                          className="px-2.5 py-0.5 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-[10px] font-medium flex items-center space-x-1 transition-colors"
                        >
                          {addedProductId === prod.id ? (
                            <>
                              <Check className="w-2.5 h-2.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-2.5 h-2.5" />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => onOpenDetail(prod.id)}
                          className="text-[10px] text-[#5B4296] font-medium hover:underline"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
