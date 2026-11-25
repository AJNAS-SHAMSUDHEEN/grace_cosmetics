import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onOpenCheckoutModal: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onOpenCheckoutModal,
  onExploreProducts,
}) => {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    amountToFreeShipping,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LUMIERE15' || promoCode.trim().toUpperCase() === 'AURA20') {
      setDiscountPercent(15);
      setPromoSuccess('Promo code applied: 15% discount!');
      setPromoError(null);
    } else {
      setPromoError('Invalid code. Try "LUMIERE15"');
      setPromoSuccess(null);
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 10;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#EFEBF7] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#F0EBF7] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Your Shopping Bag</h2>
              <p className="text-xs text-[#666666]">
                {items.length} {items.length === 1 ? 'item' : 'items'} in bag
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#F8F5FC] border-b border-[#EFEBF7]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#5B4296] font-medium">
                {amountToFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Unlocked Free Fast Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-lumiere-purple font-bold">${amountToFreeShipping.toFixed(0)}</strong> more for free shipping
                  </span>
                )}
              </span>
              <span className="text-gray-500 font-semibold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-lumiere-purple transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3EEFA] flex items-center justify-center mx-auto text-[#5B4296]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <p className="font-serif text-xl font-semibold text-gray-800">Your bag is empty</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our curated skincare rituals and add items to your everyday routine.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExploreProducts();
                  }}
                  className="mt-2 px-6 py-2.5 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex space-x-3.5 p-3 rounded-2xl bg-[#FAF9F7] border border-[#EFEBF7]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-20 object-cover rounded-xl bg-white border border-[#EAE4F5]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#8E8E93] block mt-0.5">
                        {item.selectedVolume || item.product.volume}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFEBF7]">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#1A1A1A]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#F0EBF7] bg-white space-y-3.5">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (try LUMIERE15)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-[#FAF9F7] border border-[#E8DEF5] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-lumiere-purple uppercase placeholder:normal-case"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F3EEFA] border border-[#D8CEF0] hover:bg-lumiere-purple hover:text-white rounded-xl text-xs uppercase tracking-wider font-semibold text-[#5B4296] transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-red-500 -mt-1">{promoError}</p>}
              {promoSuccess && <p className="text-[11px] text-emerald-600 -mt-1">{promoSuccess}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-1 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1A1A1A] pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-lumiere-purple">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#701A33]" />
                <span>Secure 256-Bit Encrypted Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
