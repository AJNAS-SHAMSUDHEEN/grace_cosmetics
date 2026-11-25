import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { Address, PaymentMethod } from '../types';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle,
  Tag,
  ArrowRight,
  MapPin,
  Lock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { user, openLoginModal } = useAuth();
  const { placeOrder, applyCoupon } = useShop();

  // If cart is empty, redirect to catalog
  useEffect(() => {
    if (items.length === 0) {
      navigate('/catalog');
    }
  }, [items, navigate]);

  // Default address or form address
  const defaultAddr = user?.addresses.find((a) => a.isDefault) || user?.addresses[0];

  const [formData, setFormData] = useState<Address>({
    id: defaultAddr?.id || 'addr-temp',
    fullName: defaultAddr?.fullName || user?.displayName || '',
    phone: defaultAddr?.phone || user?.phone || '',
    streetAddress: defaultAddr?.streetAddress || '',
    apartment: defaultAddr?.apartment || '',
    city: defaultAddr?.city || '',
    state: defaultAddr?.state || '',
    postalCode: defaultAddr?.postalCode || '',
    country: defaultAddr?.country || 'India',
  });

  const [email, setEmail] = useState<string>(user?.email || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card_test');
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

  // Card details state for simulation
  const [cardInfo, setCardInfo] = useState({
    number: '4242 •••• •••• 4242',
    name: user?.displayName || 'Aisha Sharma',
    expiry: '12/28',
    cvv: '921',
  });

  // Calculate pricing
  const shippingFee = subtotal > 60 || subtotal === 0 ? 0 : 5.99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode, subtotal);
    if (res.valid) {
      setDiscountAmount(res.discountAmount);
      setCouponMessage({ text: res.message, isError: false });
    } else {
      setDiscountAmount(0);
      setCouponMessage({ text: res.message, isError: true });
    }
  };

  const fillTestCard = () => {
    setCardInfo({
      number: '4242 4242 4242 4242',
      name: formData.fullName || 'Grace Valued Client',
      expiry: '08/29',
      cvv: '888',
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsPlacingOrder(true);

    try {
      const placed = await placeOrder({
        userId: user?.uid,
        customerName: formData.fullName,
        customerEmail: email || user?.email || 'customer@example.com',
        customerPhone: formData.phone,
        shippingAddress: formData,
        items: [...items],
        subtotal,
        shippingFee,
        discount: discountAmount,
        total: grandTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'card_test' ? 'paid' : 'pending',
        couponCode: discountAmount > 0 ? couponCode : undefined,
      });

      // Clear cart
      clearCart();

      // Navigate to order confirmation
      navigate(`/order-confirmation/${placed.orderNumber}`);
    } catch (err) {
      console.error('Failed to create order', err);
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="text-xs text-[#7A646E] mb-6 flex items-center space-x-2">
        <Link to="/" className="hover:text-[#701A33] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-[#701A33] transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <span className="text-[#1E0A12] font-semibold">Secure Checkout</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Column: Form Details */}
        <div className="flex-1 w-full space-y-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#701A33] mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>256-Bit Encrypted Checkout</span>
            </div>
            <h1 className="font-serif text-3xl font-semibold text-[#1E0A12]">
              Delivery & Payment
            </h1>
          </div>

          {/* Member Login Callout if not logged in */}
          {!user && (
            <div className="p-4 rounded-2xl bg-[#FCEEF1] border border-[#E8BEC5] flex items-center justify-between">
              <div className="text-xs text-[#701A33]">
                <span className="font-bold">Already a Grace Beauty Member?</span> Sign in for auto-filled addresses and order tracking.
              </div>
              <button
                onClick={openLoginModal}
                className="px-4 py-1.5 rounded-full bg-[#701A33] text-white text-xs font-semibold hover:bg-[#520B1E] transition-colors whitespace-nowrap ml-4"
              >
                Sign In
              </button>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-8">
            {/* 1. Contact Info */}
            <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-semibold text-[#1E0A12] flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[#701A33] text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#55424B] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-4 py-2.5 text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#55424B] mb-1">
                    Phone Number (for Courier SMS updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-4 py-2.5 text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-semibold text-[#1E0A12] flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[#701A33] text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Shipping Address</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#55424B] mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-4 py-2.5 text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#55424B] mb-1">
                    Street Address / House / Building *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    placeholder="Flat No, Street, Landmark"
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-4 py-2.5 text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#55424B] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2.5 text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#55424B] mb-1">
                      State / Region *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="State"
                      className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2.5 text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#55424B] mb-1">
                      PIN / Zip Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="682001"
                      className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2.5 text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#55424B] mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Country"
                      className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2.5 text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-semibold text-[#1E0A12] flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[#701A33] text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Select Payment Method</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Simulated Card */}
                <div
                  onClick={() => setPaymentMethod('card_test')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3 ${
                    paymentMethod === 'card_test'
                      ? 'border-[#701A33] bg-[#FCEEF1]/50'
                      : 'border-[#EED9DF] bg-white hover:border-[#D48D9E]'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 mt-0.5 ${paymentMethod === 'card_test' ? 'text-[#701A33]' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <span className="block text-xs font-bold text-[#1E0A12]">
                      Credit / Debit Card (Simulated Test)
                    </span>
                    <span className="block text-[11px] text-[#7A646E] mt-0.5">
                      Instant simulated payment with 1-click test card.
                    </span>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3 ${
                    paymentMethod === 'cod'
                      ? 'border-[#701A33] bg-[#FCEEF1]/50'
                      : 'border-[#EED9DF] bg-white hover:border-[#D48D9E]'
                  }`}
                >
                  <Banknote className={`w-5 h-5 mt-0.5 ${paymentMethod === 'cod' ? 'text-[#701A33]' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <span className="block text-xs font-bold text-[#1E0A12]">
                      Cash on Delivery (COD)
                    </span>
                    <span className="block text-[11px] text-[#7A646E] mt-0.5">
                      Pay cash upon delivery at your doorstep.
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Inputs if test card selected */}
              {paymentMethod === 'card_test' && (
                <div className="p-4 bg-[#FDF7F8] rounded-2xl border border-[#EED9DF] space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#701A33] flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Test Payment Sandbox Active</span>
                    </span>
                    <button
                      type="button"
                      onClick={fillTestCard}
                      className="text-[11px] text-[#701A33] bg-white border border-[#E8BEC5] px-2.5 py-1 rounded-full font-semibold hover:bg-rose-50 cursor-pointer shadow-xs"
                    >
                      ⚡ Auto-Fill Test Card
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#55424B] mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                        className="w-full bg-white border border-[#EED9DF] rounded-xl px-3 py-2 text-xs font-mono text-[#1E0A12]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-[#55424B] mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="w-full bg-white border border-[#EED9DF] rounded-xl px-3 py-2 text-xs font-mono text-[#1E0A12]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[#55424B] mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="w-full bg-white border border-[#EED9DF] rounded-xl px-3 py-2 text-xs font-mono text-[#1E0A12]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Place Order CTA for mobile */}
            <div className="lg:hidden">
              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full py-4 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-sm font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
              >
                <span>{isPlacingOrder ? 'Processing Order...' : `Place Order • $${grandTotal.toFixed(2)}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="w-full lg:w-96 shrink-0 sticky top-24 space-y-6">
          <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-5">
            <h2 className="font-serif text-lg font-semibold text-[#1E0A12] pb-3 border-b border-[#F2E1E6]">
              Order Summary ({items.length} items)
            </h2>

            {/* Item list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3 text-xs">
                  <div className="w-14 h-14 rounded-xl bg-[#FDF7F8] border border-[#EED9DF] p-1 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#1E0A12] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#7A646E]">
                      Qty: {item.quantity} × ${item.product.price}
                    </span>
                  </div>
                  <span className="font-bold text-[#1E0A12]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <div className="pt-3 border-t border-[#F2E1E6]">
              <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Promo Code (e.g. GRACE10)"
                  className="flex-1 bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs uppercase tracking-wider font-semibold text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-semibold tracking-wide transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponMessage && (
                <p
                  className={`text-[11px] mt-2 font-medium ${
                    couponMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-[#F2E1E6] space-y-2 text-xs">
              <div className="flex justify-between text-[#7A646E]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1E0A12]">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#7A646E]">
                <span>Insured Express Shipping</span>
                <span className="font-semibold text-[#1E0A12]">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[10px]">Free</span>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#F2E1E6] flex justify-between text-base font-serif font-bold text-[#1E0A12]">
                <span>Total Amount</span>
                <span className="text-[#701A33]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Desktop Place Order Button */}
            <button
              onClick={handleFormSubmit}
              disabled={isPlacingOrder}
              className="hidden lg:flex w-full py-3.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
            >
              <span>{isPlacingOrder ? 'Processing...' : 'Complete Order'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Guarantees Box */}
          <div className="bg-[#FAF0F3] rounded-2xl p-4 border border-[#E8BEC5] text-xs text-[#701A33] space-y-2">
            <div className="flex items-center space-x-2 font-semibold">
              <Sparkles className="w-4 h-4 text-[#701A33]" />
              <span>Grace Beauty Guarantee</span>
            </div>
            <p className="text-[11px] text-[#55424B] leading-relaxed">
              100% Original Authentic K-Beauty imported directly from authorized laboratories in Seoul. Free express shipping on orders over $60.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
