import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Package, Truck, Calendar, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useShop();

  const order = orderId ? getOrderById(orderId) : undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="bg-white rounded-3xl border border-[#EED9DF] shadow-lg p-6 sm:p-10 space-y-8 text-center sm:text-left">
        {/* Top Celebration */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 pb-6 border-b border-[#F2E1E6]">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200 shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Order Confirmed & Received
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E0A12] mt-1.5">
              Thank You for Your Order!
            </h1>
            <p className="text-xs text-[#7A646E] mt-1">
              Your 100% original clinical skincare order has been placed successfully. A confirmation email has been dispatched.
            </p>
          </div>
        </div>

        {/* Order Details Header Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-[#FDF7F8] border border-[#EED9DF]">
            <span className="block text-[11px] text-[#7A646E]">Order Number</span>
            <span className="block text-sm font-bold text-[#701A33] font-mono mt-0.5">
              {order?.orderNumber || orderId}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FDF7F8] border border-[#EED9DF]">
            <span className="block text-[11px] text-[#7A646E]">Estimated Delivery</span>
            <span className="block text-sm font-bold text-[#1E0A12] mt-0.5">
              {order?.estimatedDelivery || 'In 3-5 Business Days'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FDF7F8] border border-[#EED9DF]">
            <span className="block text-[11px] text-[#7A646E]">Payment Method</span>
            <span className="block text-sm font-bold text-[#1E0A12] capitalize mt-0.5">
              {order?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Simulated Card (Paid)'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FDF7F8] border border-[#EED9DF]">
            <span className="block text-[11px] text-[#7A646E]">Total Amount</span>
            <span className="block text-sm font-bold text-[#701A33] mt-0.5">
              ${order?.total.toFixed(2) || '0.00'}
            </span>
          </div>
        </div>

        {/* Live Order Status Tracker */}
        <div className="p-6 rounded-2xl bg-[#FAF0F3] border border-[#E8BEC5] text-left">
          <h3 className="font-serif text-sm font-semibold text-[#1E0A12] mb-4">
            Live Order Status
          </h3>

          <div className="relative flex items-center justify-between max-w-2xl mx-auto">
            {/* Progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E8BEC5] -translate-y-1/2 -z-0" />
            <div
              className={`absolute top-1/2 left-0 h-0.5 bg-[#701A33] -translate-y-1/2 -z-0 transition-all duration-500 ${
                order?.orderStatus === 'delivered'
                  ? 'w-full'
                  : order?.orderStatus === 'shipped'
                  ? 'w-2/3'
                  : 'w-1/3'
              }`}
            />

            {/* Steps */}
            {[
              { label: 'Placed', active: true },
              { label: 'Processing', active: order?.orderStatus !== 'cancelled' },
              { label: 'Shipped', active: order?.orderStatus === 'shipped' || order?.orderStatus === 'delivered' },
              { label: 'Delivered', active: order?.orderStatus === 'delivered' },
            ].map((st, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center bg-[#FAF0F3] px-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    st.active
                      ? 'bg-[#701A33] text-white shadow-xs'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-[11px] font-semibold text-[#1E0A12] mt-1.5 whitespace-nowrap">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Line Items */}
        {order && order.items.length > 0 && (
          <div className="space-y-3 text-left">
            <h3 className="font-serif text-base font-semibold text-[#1E0A12]">
              Order Items ({order.items.length})
            </h3>
            <div className="divide-y divide-[#F2E1E6] border-t border-b border-[#F2E1E6]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain rounded-lg bg-[#FDF7F8] border border-[#EED9DF] p-1"
                    />
                    <div>
                      <span className="font-semibold text-[#1E0A12] block">
                        {item.product.name}
                      </span>
                      <span className="text-[11px] text-[#7A646E]">
                        Qty: {item.quantity} × ${item.product.price}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-[#1E0A12]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Address Summary */}
        {order?.shippingAddress && (
          <div className="text-left p-4 rounded-2xl bg-[#FDF7F8] border border-[#EED9DF] text-xs">
            <span className="font-bold text-[#1E0A12] block mb-1 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#701A33]" />
              <span>Delivering To:</span>
            </span>
            <p className="text-[#55424B]">
              <strong>{order.shippingAddress.fullName}</strong> — {order.shippingAddress.streetAddress}, {order.shippingAddress.apartment ? order.shippingAddress.apartment + ', ' : ''}{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            <p className="text-[#7A646E] mt-0.5">Phone: {order.shippingAddress.phone}</p>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            to="/catalog"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#EED9DF] hover:border-[#701A33] text-xs font-semibold text-[#55424B] hover:text-[#701A33] transition-colors text-center"
          >
            Continue Shopping
          </Link>

          <button
            onClick={() => navigate('/profile')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs text-center flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>View All My Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
