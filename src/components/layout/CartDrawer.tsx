import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, Gift } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onOpenCheckoutModal: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onOpenCheckoutModal,
  onExploreProducts,
}) => {
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
  const [luxuryGiftBox, setLuxuryGiftBox] = useState(true);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURA20') {
      setDiscountPercent(20);
      setPromoSuccess('Privilege code applied: 20% savings deducted.');
      setPromoError(null);
    } else {
      setPromoError('Invalid privilege code. Try "AURA20"');
      setPromoSuccess(null);
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-luxury-dark border-l border-luxury-gold/20 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl tracking-wide text-luxury-ivory">Your Shopping Bag</h2>
              <p className="text-[11px] font-mono uppercase tracking-widest text-luxury-gold">
                {items.length} {items.length === 1 ? 'Formulation' : 'Formulations'}
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Courier Progress Bar */}
          <div className="px-5 py-3.5 bg-luxury-espresso/60 border-b border-luxury-gold/15">
            <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
              <span className="text-luxury-champagne">
                {amountToFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Unlocked Complimentary Courier Dispatch
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-luxury-gold font-semibold">${amountToFreeShipping.toFixed(0)}</strong> more for free worldwide courier
                  </span>
                )}
              </span>
              <span className="text-white/50">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-lightGold transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center mx-auto text-luxury-gold">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <p className="font-serif text-xl text-luxury-ivory">Your bag is awaiting elixirs.</p>
                <p className="text-xs text-white/50 max-w-xs mx-auto">
                  Discover our clinical bio-active stem cell serums and cellular renewal cremes.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExploreProducts();
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-luxury-gold text-luxury-dark font-mono text-xs uppercase tracking-widest font-semibold hover:bg-luxury-lightGold transition-all"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex space-x-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-luxury-gold/20 transition-all"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl border border-white/10 bg-black/40"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm text-luxury-ivory leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-white/40 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] font-mono text-luxury-gold block mt-0.5">
                        {item.selectedVolume || item.product.volume}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 bg-luxury-dark border border-white/10 rounded-full px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-white/60 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono px-1 text-luxury-ivory">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-white/60 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="font-mono text-sm text-luxury-champagne font-medium">
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
            <div className="p-5 border-t border-white/10 bg-luxury-dark/95 space-y-4">
              {/* Luxury Packaging Option */}
              <div
                onClick={() => setLuxuryGiftBox(!luxuryGiftBox)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-luxury-espresso/40 border border-luxury-gold/15 cursor-pointer hover:border-luxury-gold/40 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Gift className="w-4 h-4 text-luxury-gold" />
                  <div>
                    <p className="text-xs font-serif text-luxury-ivory">Complimentary Sovereign Packaging</p>
                    <p className="text-[10px] text-white/40">Includes wax-sealed box & archival botanical cards</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={luxuryGiftBox}
                  onChange={(e) => setLuxuryGiftBox(e.target.checked)}
                  className="accent-luxury-gold rounded"
                />
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Privilege Code (try AURA20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-luxury-ivory focus:outline-none focus:border-luxury-gold uppercase placeholder:normal-case"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-luxury-espresso border border-luxury-gold/30 hover:border-luxury-gold rounded-xl text-xs font-mono uppercase tracking-wider text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-red-400 font-mono -mt-2">{promoError}</p>}
              {promoSuccess && <p className="text-[11px] text-emerald-400 font-mono -mt-2">{promoSuccess}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-white/5">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span>Courier Delivery</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-serif text-luxury-ivory pt-2 border-t border-white/10">
                  <span>Total Investment</span>
                  <span className="font-mono text-luxury-gold font-bold">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Sovereign Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckoutModal();
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-lightGold text-luxury-dark font-mono text-xs uppercase tracking-widest font-bold shadow-lg shadow-luxury-gold/20 hover:brightness-110 flex items-center justify-center space-x-2 transition-all"
              >
                <span>Proceed to Sovereign Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-white/40 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Protected by 256-Bit Cryptographic Vault & Certified Cold-Chain</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
