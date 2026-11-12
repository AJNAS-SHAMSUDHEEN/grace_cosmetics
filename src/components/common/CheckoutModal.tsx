import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Check, ShieldCheck, Sparkles, Truck, Lock, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<'review' | 'confirmed'>('review');
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor.vance@sovereign.ch',
    address: 'Quai du Mont-Blanc 19',
    city: 'Geneva',
    country: 'Switzerland',
  });

  if (!isOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmed');
    clearCart();
  };

  const handleReset = () => {
    setStep('review');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-luxury-dark border border-luxury-gold/30 rounded-3xl overflow-hidden shadow-2xl z-10 glass-panel p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'review' ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-luxury-gold block">
                  Sovereign Concierge Dispatch
                </span>
                <h3 className="font-serif text-3xl text-luxury-ivory font-light">
                  Complete Your Allocation
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-luxury-espresso/60 border border-luxury-gold/15 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-white/70">
                  <span>Selected Formulations</span>
                  <span className="text-luxury-ivory">{items.length} items</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Courier Temperature Control</span>
                  <span className="text-emerald-400">Cryo-Secured (4°C)</span>
                </div>
                <div className="flex justify-between text-sm font-serif text-luxury-ivory pt-2 border-t border-white/10">
                  <span>Total Due</span>
                  <span className="font-mono text-luxury-gold font-bold">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                    Delivery Sanctuary Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[11px] font-mono text-white/40 pt-2">
                  <Lock className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>Frontend Prototype • No Actual Payment Charged</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-lightGold text-luxury-dark font-mono text-xs uppercase tracking-widest font-bold shadow-xl shadow-luxury-gold/25 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Authorize Sovereign Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-luxury-gold/20 border-2 border-luxury-gold flex items-center justify-center mx-auto text-luxury-gold">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-luxury-gold block">
                  Order Authorization: #AUR-94821
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-luxury-ivory font-light">
                  Allocation Confirmed.
                </h3>
                <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
                  Your cellular formulations have entered cryogenic packaging. A cold-chain tracking pass has been transmitted to <strong className="text-luxury-champagne">{formData.email}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-luxury-espresso/80 border border-luxury-gold/20 text-xs font-mono text-left space-y-1.5 max-w-md mx-auto">
                <div className="flex items-center space-x-2 text-luxury-gold mb-1">
                  <Truck className="w-4 h-4" />
                  <span>Estimated Dispatch Courier: 24-48 Hours</span>
                </div>
                <p className="text-white/60">Destination: {formData.address}, {formData.city}, {formData.country}</p>
                <p className="text-white/40 text-[10px]">Cold-chain verification lock: 0x93FA...E2B</p>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-luxury-gold text-luxury-dark font-mono text-xs uppercase tracking-widest font-semibold hover:bg-luxury-lightGold transition-all"
              >
                Return to Sanctuary
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
