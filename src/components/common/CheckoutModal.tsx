import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Check, ShieldCheck, Truck, Lock, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<'review' | 'confirmed'>('review');
  const [formData, setFormData] = useState({
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    country: 'United States',
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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white border border-[#E8DEF5] rounded-3xl overflow-hidden shadow-2xl z-10 p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'review' ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-lumiere-purple block">
                  Lumière Express Dispatch
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  Complete Your Order
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F7] border border-[#EFEBF7] space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Selected Products</span>
                  <span className="font-semibold text-gray-900">{items.length} items</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Method</span>
                  <span className="text-emerald-700 font-semibold">Fast Insured Delivery</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-lumiere-purple">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-gray-600 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF9F7] border border-[#E8DEF5] rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-lumiere-purple"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-600 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF9F7] border border-[#E8DEF5] rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-lumiere-purple"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-gray-600 block mb-1">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#FAF9F7] border border-[#E8DEF5] rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-lumiere-purple"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-gray-600 block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#FAF9F7] border border-[#E8DEF5] rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-lumiere-purple"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-600 block mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#FAF9F7] border border-[#E8DEF5] rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-lumiere-purple"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-gray-400 pt-1">
                  <Lock className="w-3.5 h-3.5 text-lumiere-purple" />
                  <span>Frontend Prototype • No Actual Charges Incurred</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <span>PLACE ORDER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#EFEBF7] border border-lumiere-purple flex items-center justify-center mx-auto text-lumiere-purple">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-lumiere-purple block">
                  Order Number: #LUM-83921
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Your skincare essentials have been booked for packaging. A confirmation has been sent to{' '}
                  <strong className="text-lumiere-purple">{formData.email}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F7] border border-[#EFEBF7] text-xs text-left space-y-1 max-w-md mx-auto">
                <div className="flex items-center space-x-2 text-lumiere-purple font-semibold mb-1">
                  <Truck className="w-4 h-4" />
                  <span>Estimated Delivery: 2-3 Business Days</span>
                </div>
                <p className="text-gray-600">Shipping to: {formData.address}, {formData.city}, {formData.country}</p>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
