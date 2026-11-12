import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../../data/products';
import { Search, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = PRODUCTS.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subTitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.ingredientsList.some((ing) => ing.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 pt-20 sm:pt-24">
        <div className="relative w-full max-w-xl bg-white border border-[#E8DEF5] rounded-3xl overflow-hidden shadow-2xl z-10">
          {/* Search Header */}
          <div className="p-4 sm:p-5 border-b border-[#F0EBF7] flex items-center space-x-3">
            <Search className="w-5 h-5 text-lumiere-purple" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products by name, concern, or ingredient..."
              className="flex-1 bg-transparent text-sm sm:text-base font-sans text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2 py-0.5 rounded text-[11px] font-mono text-gray-400 hover:text-gray-700 bg-gray-100"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="px-5 py-2.5 bg-[#FAF9F7] border-b border-[#F0EBF7] flex items-center space-x-2 overflow-x-auto text-[11px] text-gray-500 no-scrollbar">
            <span>Suggestions:</span>
            {['Glow Serum', 'Triskin', 'Cleanser', 'SPF 50', 'Cloud Moisturizer'].map((sug) => (
              <button
                key={sug}
                onClick={() => setQuery(sug)}
                className="px-2.5 py-0.5 rounded-full bg-white hover:bg-[#F3EEFA] text-lumiere-purple border border-[#E8DEF5]"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[55vh] overflow-y-auto p-3 sm:p-4 space-y-2">
            {results.length === 0 ? (
              <div className="text-center py-10 space-y-1">
                <p className="font-serif text-base text-gray-700 font-semibold">No products found</p>
                <p className="text-xs text-gray-400">Try searching for "Triskin", "Moisturizer", or "Serum"</p>
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product.id);
                  }}
                  className="group flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F7] hover:bg-[#F3EEFA] border border-[#EFEBF7] hover:border-[#D8CEF0] cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-14 object-cover rounded-xl bg-white border border-[#E8DEF5]"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-lumiere-purple block">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] group-hover:text-lumiere-purple leading-snug line-clamp-1">
                        {product.name}
                      </h4>
                      <span className="text-[10px] text-gray-400">{product.volume}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-serif text-sm font-bold text-[#1A1A1A]">
                      ${product.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                        onClose();
                      }}
                      className="p-2 rounded-full bg-white hover:bg-lumiere-purple text-gray-600 hover:text-white border border-gray-200 transition-colors shadow-xs"
                      title="Quick Add"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
