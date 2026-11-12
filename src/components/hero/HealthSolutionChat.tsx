import React, { useState, useMemo, useRef, useEffect } from 'react';
import { HEALTH_CONDITIONS, HealthCondition } from '../../data/healthConditions';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { Search, Sparkles, Send, Stethoscope, ShoppingBag, Eye, RefreshCw, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface HealthSolutionChatProps {
  onOpenDetail: (productId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text?: string;
  condition?: HealthCondition;
  matchedProducts?: Product[];
}

export const HealthSolutionChat: React.FC<HealthSolutionChatProps> = ({ onOpenDetail }) => {
  const { addToCart } = useCart();
  const [searchInput, setSearchInput] = useState('');
  const [activeCondition, setActiveCondition] = useState<HealthCondition | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const quickSymptoms = [
    { label: 'Acne & Breakouts', query: 'acne' },
    { label: 'Eczema & Itch', query: 'eczema' },
    { label: 'Rosacea & Redness', query: 'rosacea' },
    { label: 'Dark Spots & Melasma', query: 'melasma' },
    { label: 'Severe Dryness', query: 'dryness' },
    { label: 'Fine Lines & Wrinkles', query: 'wrinkles' },
    { label: 'Puffy Eyes & Circles', query: 'dark circles' },
    { label: 'Psoriasis Plaques', query: 'psoriasis' },
  ];

  // Helper to match condition by query
  const matchCondition = (query: string): HealthCondition | null => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    // 1. Direct name match
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
        name: `Targeted Formulations for "${query}"`,
        keywords: [query],
        category: 'Sensitivity',
        symptoms: ['Tailored clinical match based on active formulations'],
        explanation: `We analyzed our dermatological inventory for "${query}" and isolated compatible biocompatible formulations for your skin barrier.`,
        recommendedActiveIngredients: ['Biomimetic Ceramides', 'Niacinamide', 'Hyaluronic Acid'],
        productIds: matchedProducts.map((p) => p.id),
      };
    }

    return null;
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setIsTyping(true);

    setTimeout(() => {
      const match = matchCondition(query);
      setActiveCondition(match);
      setIsTyping(false);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 450);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleSearch(searchInput);
    }
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

  const handleReset = () => {
    setActiveCondition(null);
    setSearchInput('');
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-[#E8DEF5] shadow-lg shadow-purple-900/5 flex flex-col space-y-4">
      {/* 1. Header Bar: "Find Your Solution" */}
      <div className="flex items-center justify-between border-b border-[#F0EBF7] pb-3.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-[#5B4296] text-white flex items-center justify-center shadow-xs">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-tight leading-none">
              Find Your Solution
            </h3>
            <span className="text-[10px] font-semibold text-[#5B4296] uppercase tracking-wider">
              Clinical Health & Symptom Consultant
            </span>
          </div>
        </div>

        {activeCondition && (
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-lumiere-purple transition-colors bg-[#F5F0FB] px-2.5 py-1 rounded-full border border-[#E8DEF5]"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 2. Chat / Solution Interaction Window */}
      <div className="max-h-[320px] overflow-y-auto pr-1 space-y-3.5 text-xs">
        {/* Initial Assistant Greeting Bubble */}
        <div className="flex items-start space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-[#EAE3F7] text-[#5B4296] flex items-center justify-center shrink-0 mt-0.5 border border-[#D8CEF0]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="bg-[#FAF9F7] border border-[#EAE4F5] rounded-2xl rounded-tl-none p-3.5 text-[#333333] space-y-2 max-w-xl">
            <p className="leading-relaxed">
              <strong>Welcome to Clinical Care.</strong> What health problem, skin condition, or symptom are you experiencing?
            </p>
            <p className="text-[11px] text-[#666666]">
              Type in the search bar below or select a common medical concern:
            </p>

            {/* Quick symptom pill chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickSymptoms.map((qs) => (
                <button
                  key={qs.query}
                  onClick={() => {
                    setSearchInput(qs.label);
                    handleSearch(qs.query);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-[#F3EEFA] text-[#5B4296] border border-[#E8DEF5] text-[10px] font-medium transition-colors shadow-2xs"
                >
                  {qs.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Search Query Bubble (if active) */}
        {activeCondition && (
          <div className="flex items-start justify-end space-x-2">
            <div className="bg-[#5B4296] text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-xs max-w-md shadow-xs">
              <span>{searchInput || activeCondition.name}</span>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 text-[#5B4296] bg-[#F5F0FB] p-3 rounded-2xl w-36">
            <span className="w-2 h-2 rounded-full bg-[#5B4296] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[#5B4296] animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-[#5B4296] animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] font-medium">Analyzing...</span>
          </div>
        )}

        {/* AI Medical Breakdown & Matched Product Solutions */}
        {activeCondition && !isTyping && (
          <div className="flex items-start space-x-2.5 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-[#EAE3F7] text-[#5B4296] flex items-center justify-center shrink-0 mt-0.5 border border-[#D8CEF0]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white border border-[#E8DEF5] rounded-2xl rounded-tl-none p-4 text-[#333333] space-y-3.5 shadow-xs w-full">
              {/* Condition Title & Explanation */}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B4296] bg-[#F5F0FB] px-2 py-0.5 rounded-full border border-[#E8DEF5]">
                    {activeCondition.category}
                  </span>
                  <span className="text-xs font-bold text-[#1A1A1A]">
                    {activeCondition.name}
                  </span>
                </div>
                <p className="text-[11px] text-[#555555] leading-relaxed mt-1.5">
                  {activeCondition.explanation}
                </p>
              </div>

              {/* Recommended Actives */}
              <div className="p-2.5 rounded-xl bg-[#FAF9F7] border border-[#EFEBF7]">
                <span className="text-[10px] font-bold text-[#4A3578] uppercase tracking-wider block mb-1">
                  Targeted Clinical Actives:
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeCondition.recommendedActiveIngredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white border border-[#E8DEF5] text-[10px] text-gray-700 font-medium"
                    >
                      ✓ {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Matched Products Cards Carousel/List */}
              <div>
                <span className="text-[11px] font-bold text-[#1A1A1A] block mb-2">
                  Recommended Formulations ({matchedProducts.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {matchedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center space-x-2.5 p-2 rounded-xl bg-[#FAF9F7] border border-[#EAE4F5] hover:border-[#D8CEF0] transition-colors"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        onClick={() => onOpenDetail(prod.id)}
                        className="w-12 h-14 object-cover rounded-lg bg-white border border-gray-100 cursor-pointer shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => onOpenDetail(prod.id)}
                          className="font-serif text-xs font-semibold text-[#1A1A1A] truncate cursor-pointer hover:text-lumiere-purple"
                        >
                          {prod.name}
                        </h4>
                        <span className="text-[10px] text-gray-500 block truncate">
                          {prod.category} • ${prod.price}
                        </span>

                        <div className="flex items-center space-x-1.5 mt-1">
                          <button
                            onClick={() => handleAddToCart(prod)}
                            className="px-2 py-0.5 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-[9px] font-medium flex items-center space-x-1 transition-colors"
                          >
                            <ShoppingBag className="w-2.5 h-2.5" />
                            <span>{addedProductId === prod.id ? 'Added' : 'Add'}</span>
                          </button>
                          <button
                            onClick={() => onOpenDetail(prod.id)}
                            className="text-[9px] text-[#5B4296] hover:underline"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* 3. Prominent Search Bar Input */}
      <form onSubmit={handleFormSubmit} className="relative pt-1">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Type a disease, condition, symptom (e.g. Eczema, Acne, Rosacea, Wrinkles)..."
            className="w-full bg-[#FAF9F7] border border-[#E0D8ED] rounded-full pl-10 pr-24 py-3 text-xs text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:border-[#5B4296] focus:bg-white transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!searchInput.trim()}
            className="absolute right-1.5 px-4 py-2 rounded-full bg-[#5B4296] hover:bg-[#4A3578] disabled:opacity-40 text-white text-xs font-semibold transition-all flex items-center space-x-1 shadow-xs"
          >
            <span>Search</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>
    </div>
  );
};
