import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Settings,
  Shield,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
  Clock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { Address } from '../types';

export const ProfilePage: React.FC = () => {
  const {
    user,
    isAdmin,
    logout,
    openLoginModal,
    addAddress,
    removeAddress,
    setDefaultAddress,
    updateUserProfile,
  } = useAuth();
  const { getUserOrders } = useShop();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'settings'>('orders');

  // Address modal form
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState<Omit<Address, 'id'>>({
    fullName: user?.displayName || '',
    phone: user?.phone || '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false,
  });

  // Settings form
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSavedSettings, setIsSavedSettings] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#FAF0F3] border border-[#E8BEC5] text-[#701A33] flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1E0A12]">
            Grace Beauty Account
          </h2>
          <p className="text-xs text-[#7A646E] mt-1">
            Sign in to track your orders, manage saved addresses, and receive tailored K-Beauty formulations.
          </p>
        </div>
        <button
          onClick={openLoginModal}
          className="w-full py-3 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const userOrders = getUserOrders(user.uid, user.email);

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(newAddr);
    setIsAddingAddress(false);
    setNewAddr({
      fullName: user.displayName,
      phone: user.phone || '',
      streetAddress: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      isDefault: false,
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ displayName, phone });
    setIsSavedSettings(true);
    setTimeout(() => setIsSavedSettings(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Admin Dashboard Quick Link Banner */}
      {isAdmin && (
        <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 block">
                Store Administrator Access Active
              </span>
              <span className="text-xs text-amber-700">
                You have administrative access to manage products, customer orders, and discounts.
              </span>
            </div>
          </div>
          <Link
            to="/admin"
            className="px-5 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center space-x-1.5 whitespace-nowrap"
          >
            <span>Open Admin Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#701A33] to-[#8B2C47] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            {user.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-2xl font-bold text-[#1E0A12]">
                {user.displayName}
              </h1>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isAdmin
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-[#FCEEF1] text-[#701A33] border-[#E8BEC5]'
                }`}
              >
                {isAdmin ? 'Store Admin' : 'Grace VIP Member'}
              </span>
            </div>
            <p className="text-xs text-[#7A646E] mt-0.5">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="px-4 py-2 rounded-full border border-[#EED9DF] hover:border-[#701A33] text-xs font-semibold text-[#55424B] hover:text-[#701A33] transition-colors flex items-center space-x-1.5 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Navigation */}
        <div className="w-full md:w-60 shrink-0 bg-white rounded-3xl border border-[#EED9DF] p-3 shadow-xs space-y-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#701A33] text-white shadow-xs'
                : 'text-[#55424B] hover:bg-[#FDF7F8]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="flex-1 text-left">My Orders</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'orders' ? 'bg-white/20' : 'bg-gray-100 text-gray-600'}`}>
              {userOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-[#701A33] text-white shadow-xs'
                : 'text-[#55424B] hover:bg-[#FDF7F8]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span className="flex-1 text-left">Saved Addresses</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'addresses' ? 'bg-white/20' : 'bg-gray-100 text-gray-600'}`}>
              {user.addresses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#701A33] text-white shadow-xs'
                : 'text-[#55424B] hover:bg-[#FDF7F8]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="flex-1 text-left">Account Settings</span>
          </button>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full min-w-0">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif text-xl font-semibold text-[#1E0A12]">
                  Order History & Live Status
                </h2>
                <span className="text-xs text-[#7A646E]">
                  {userOrders.length} orders placed
                </span>
              </div>

              {userOrders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-[#EED9DF] p-6 space-y-3">
                  <Package className="w-10 h-10 text-gray-300 mx-auto" />
                  <p className="text-sm font-semibold text-[#1E0A12]">No orders placed yet</p>
                  <p className="text-xs text-[#7A646E] max-w-sm mx-auto">
                    Experience authentic K-Beauty formulations delivered to your doorstep.
                  </p>
                  <Link
                    to="/catalog"
                    className="inline-block mt-2 px-6 py-2 rounded-full bg-[#701A33] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#520B1E] transition-colors"
                  >
                    Explore Formulations
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((order) => {
                    const statusColor =
                      order.orderStatus === 'delivered'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : order.orderStatus === 'shipped'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : order.orderStatus === 'cancelled'
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200';

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-4"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F2E1E6]">
                          <div>
                            <span className="text-xs text-[#7A646E] block">
                              Order placed on {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <span className="text-sm font-bold text-[#701A33] font-mono">
                              #{order.orderNumber}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${statusColor}`}>
                              {order.orderStatus}
                            </span>
                            <span className="text-sm font-bold text-[#1E0A12]">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Items in this order */}
                        <div className="space-y-3">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={it.product.image}
                                  alt={it.product.name}
                                  className="w-12 h-12 object-contain rounded-xl bg-[#FDF7F8] border border-[#EED9DF] p-1"
                                />
                                <div>
                                  <Link
                                    to={`/product/${it.product.id}`}
                                    className="font-medium text-[#1E0A12] hover:text-[#701A33] transition-colors block"
                                  >
                                    {it.product.name}
                                  </Link>
                                  <span className="text-[11px] text-[#7A646E]">
                                    Qty: {it.quantity} • ${it.product.price} each
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => addToCart(it.product, 1)}
                                className="px-3 py-1 rounded-full border border-[#EED9DF] hover:border-[#701A33] text-[11px] font-semibold text-[#701A33] hover:bg-rose-50 transition-colors cursor-pointer"
                              >
                                Buy Again
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Footer info */}
                        <div className="pt-3 border-t border-[#F2E1E6] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#7A646E]">
                          <span>
                            Est. Delivery: <strong>{order.estimatedDelivery}</strong>
                          </span>
                          <span>
                            Payment: <strong className="capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card (Paid)'}</strong>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#1E0A12]">
                    Saved Delivery Addresses
                  </h2>
                  <p className="text-xs text-[#7A646E]">
                    Save multiple addresses for fast 1-click checkout.
                  </p>
                </div>
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="px-4 py-2 rounded-full bg-[#701A33] text-white text-xs font-semibold hover:bg-[#520B1E] transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Address</span>
                  </button>
                )}
              </div>

              {/* Add Address Form */}
              {isAddingAddress && (
                <form
                  onSubmit={handleCreateAddress}
                  className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-4"
                >
                  <h3 className="font-serif text-base font-semibold text-[#1E0A12]">
                    Add New Shipping Address
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#55424B] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#55424B] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#55424B] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddr.streetAddress}
                      onChange={(e) => setNewAddr({ ...newAddr, streetAddress: e.target.value })}
                      className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#55424B] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#55424B] mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#55424B] mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddr.postalCode}
                        onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                        className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full bg-[#701A33] text-white text-xs font-semibold hover:bg-[#520B1E]"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Address Cards List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`bg-white rounded-3xl border p-5 space-y-3 relative transition-all ${
                      addr.isDefault
                        ? 'border-[#701A33] shadow-xs'
                        : 'border-[#EED9DF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1E0A12]">
                        {addr.fullName}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FCEEF1] text-[#701A33] px-2 py-0.5 rounded-full border border-[#E8BEC5]">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#55424B] leading-relaxed">
                      {addr.streetAddress}
                      {addr.apartment ? `, ${addr.apartment}` : ''}
                      <br />
                      {addr.city}, {addr.state} {addr.postalCode}
                      <br />
                      {addr.country}
                    </p>

                    <p className="text-xs text-[#7A646E]">Phone: {addr.phone}</p>

                    <div className="pt-2 border-t border-[#F2E1E6] flex items-center justify-between">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-xs font-semibold text-[#701A33] hover:underline"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => removeAddress(addr.id)}
                        className="text-gray-400 hover:text-rose-600 ml-auto p-1"
                        title="Delete Address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ACCOUNT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#1E0A12]">
                  Account Details
                </h2>
                <p className="text-xs text-[#7A646E]">
                  Update your contact details and display preferences.
                </p>
              </div>

              {isSavedSettings && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-medium text-[#55424B] mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-4 py-2.5 text-xs text-[#1E0A12]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#55424B] mb-1">
                    Email Address (Read-only)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#55424B] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-4 py-2.5 text-xs text-[#1E0A12]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
