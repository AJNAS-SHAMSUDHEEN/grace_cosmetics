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
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#EFEBF7] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#F0EBF7] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-lumiere-purple fill-lumiere-purple" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Wishlist</h2>
                <p className="text-xs text-[#666666]">
                  {wishlistProducts.length} saved {wishlistProducts.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3EEFA] flex items-center justify-center mx-auto text-lumiere-purple">
                  <Heart className="w-7 h-7" />
                </div>
                <p className="font-serif text-xl font-semibold text-gray-800">Your wishlist is empty</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Click the heart icon on any formula to save it for your next beauty ritual.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    onExploreProducts();
                  }}
                  className="mt-2 px-6 py-2.5 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Discover Formulations
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex space-x-3.5 p-3 rounded-2xl bg-[#FAF9F7] border border-[#EFEBF7]"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => {
                      setIsWishlistOpen(false);
                      onOpenProductDetail(product.id);
                    }}
                    className="w-18 h-20 object-cover rounded-xl bg-white border border-[#EAE4F5] cursor-pointer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            onOpenProductDetail(product.id);
                          }}
                          className="font-serif text-sm font-semibold text-[#1A1A1A] line-clamp-1 cursor-pointer hover:text-lumiere-purple"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#8E8E93] block mt-0.5">
                        {product.volume}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFEBF7]">
                      <span className="text-sm font-bold text-[#1A1A1A]">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-3 py-1 rounded-full bg-lumiere-purple hover:bg-[#4A3578] text-white text-xs font-medium flex items-center space-x-1 shadow-xs transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 border-t border-[#F0EBF7] bg-white flex items-center justify-between">
              <button
                onClick={clearWishlist}
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                Clear All
              </button>

              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="px-5 py-2.5 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5"
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
