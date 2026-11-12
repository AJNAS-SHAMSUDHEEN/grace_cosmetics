import React from 'react';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface WishlistDrawerProps {
  onOpenProductDetail: (productId: string) => void;
  onExploreProducts: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  onOpenProductDetail,
  onExploreProducts,
}) => {
  const { wishlistProducts, toggleWishlist, isWishlistOpen, setIsWishlistOpen, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-luxury-dark border-l border-luxury-gold/20 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-luxury-gold fill-luxury-gold" />
              <div>
                <h2 className="font-serif text-2xl tracking-wide text-luxury-ivory">Saved Elixirs</h2>
                <p className="text-[11px] font-mono uppercase tracking-widest text-luxury-gold">
                  {wishlistProducts.length} Curated Items
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center mx-auto text-luxury-gold">
                  <Heart className="w-7 h-7" />
                </div>
                <p className="font-serif text-xl text-luxury-ivory">No saved formulations.</p>
                <p className="text-xs text-white/50 max-w-xs mx-auto">
                  Click the heart icon on any elixir to curate your personal skincare sanctuary.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    onExploreProducts();
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-luxury-gold text-luxury-dark font-mono text-xs uppercase tracking-widest font-semibold hover:bg-luxury-lightGold transition-all"
                >
                  Discover Formulations
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex space-x-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-luxury-gold/20 transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => {
                      setIsWishlistOpen(false);
                      onOpenProductDetail(product.id);
                    }}
                    className="w-20 h-24 object-cover rounded-xl border border-white/10 bg-black/40 cursor-pointer hover:opacity-85 transition-opacity"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            onOpenProductDetail(product.id);
                          }}
                          className="font-serif text-sm text-luxury-ivory leading-snug cursor-pointer hover:text-luxury-gold"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-white/40 hover:text-red-400 p-1 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] font-mono text-luxury-gold block mt-0.5">
                        {product.volume}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                      <span className="font-mono text-sm text-luxury-champagne font-medium">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(product, 1);
                        }}
                        className="px-3 py-1.5 rounded-full bg-luxury-gold/20 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-dark border border-luxury-gold/40 text-[11px] font-mono uppercase tracking-wider flex items-center space-x-1.5 transition-all"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-luxury-dark/95 flex items-center justify-between">
              <button
                onClick={clearWishlist}
                className="text-xs font-mono text-white/40 hover:text-white transition-colors"
              >
                Clear All
              </button>

              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="px-5 py-2.5 rounded-full bg-luxury-gold text-luxury-dark font-mono text-xs uppercase tracking-widest font-semibold hover:bg-luxury-lightGold transition-all flex items-center space-x-1.5"
              >
                <span>Add All to Bag</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
