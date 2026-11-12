import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../../data/products';
import { Search, X, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
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
        else {
          // Open
        }
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
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 pt-20 sm:pt-28">
        <div className="relative w-full max-w-2xl bg-luxury-dark border border-luxury-gold/30 rounded-3xl overflow-hidden shadow-2xl z-10 glass-panel">
          {/* Search Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center space-x-3">
            <Search className="w-5 h-5 text-luxury-gold" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, category, or active compound (e.g. Triskin, Retinol)..."
              className="flex-1 bg-transparent text-sm sm:text-base font-sans text-luxury-ivory placeholder:text-white/30 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-white/50 hover:text-white border border-white/10"
            >
              ESC
            </button>
          </div>

          {/* Quick Filter Prompts */}
          <div className="px-5 py-2.5 bg-luxury-espresso/60 border-b border-white/5 flex items-center space-x-2 overflow-x-auto text-[11px] font-mono text-white/50 no-scrollbar">
            <span>Suggestions:</span>
            {['Triskin', 'Peptide Cream', '24K Gold', 'SPF 50', 'Cryo Mask'].map((sug) => (
              <button
                key={sug}
                onClick={() => setQuery(sug)}
                className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 text-luxury-champagne"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4 space-y-2">
            {results.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="font-serif text-lg text-luxury-ivory">No formulations found</p>
                <p className="text-xs text-white/40">Try searching for "Triskin", "Niacinamide", or "Serum"</p>
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product.id);
                  }}
                  className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-luxury-espresso border border-white/5 hover:border-luxury-gold/30 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-14 object-cover rounded-xl border border-white/10 bg-black/40"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-luxury-gold">
                          {product.category}
                        </span>
                        {product.name.toLowerCase().includes('triskin') && (
                          <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-luxury-gold/20 text-luxury-gold">
                            Triskin
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-sm text-luxury-ivory group-hover:text-luxury-champagne leading-snug">
                        {product.name}
                      </h4>
                      <span className="text-[10px] text-white/40 font-mono">{product.volume}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-serif text-base text-luxury-gold font-light">
                      ${product.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                        onClose();
                      }}
                      className="p-2 rounded-full bg-luxury-gold/20 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-dark transition-colors"
                      title="Quick Add to Bag"
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
