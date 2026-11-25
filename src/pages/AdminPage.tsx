import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { Product, OrderStatus, Coupon } from '../types';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Percent,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Search,
  DollarSign,
  TrendingUp,
  Clock,
  Truck,
  Shield,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user, isAdmin, loginAsDemoAdmin } = useAuth();
  const {
    products,
    orders,
    coupons,
    addProduct,
    deleteProduct,
    toggleStock,
    updateOrderStatus,
    addCoupon,
    deleteCoupon,
    analytics,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'coupons'>('dashboard');

  // Search in products & orders
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Add Product Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: '',
    subTitle: '',
    category: 'Skincare',
    price: 24,
    originalPrice: 30,
    volume: '50ml',
    tag: 'New',
    image: '/products/abib-glutathiosome-dark-spot-pad.jpg',
    description: '',
    shortDescription: '',
    inStock: true,
    stockCount: 50,
  });

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Add Coupon Modal
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    code: '',
    discountPercent: 15,
    minOrder: 25,
    description: '',
    isActive: true,
  });

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
          <Shield className="w-8 h-8" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1E0A12]">
            Admin Privileges Required
          </h2>
          <p className="text-xs text-[#7A646E] mt-1">
            You must be signed in with an authorized store administrator account to view the Grace Beauty Store operations dashboard.
          </p>
        </div>
        <button
          onClick={loginAsDemoAdmin}
          className="w-full py-3 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
        >
          ⚡ Sign In as Demo Admin
        </button>
      </div>
    );
  }

  // Filtered products
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Filtered orders
  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;

    await addProduct({
      name: newProd.name,
      subTitle: newProd.subTitle || 'Clinical formulation',
      category: (newProd.category as any) || 'Skincare',
      price: Number(newProd.price),
      originalPrice: newProd.originalPrice ? Number(newProd.originalPrice) : undefined,
      rating: 5.0,
      reviewCount: 1,
      volume: newProd.volume || '50ml',
      tag: (newProd.tag as any) || 'New',
      image: newProd.image || '/products/abib-glutathiosome-dark-spot-pad.jpg',
      gallery: [newProd.image || '/products/abib-glutathiosome-dark-spot-pad.jpg'],
      description: newProd.description || 'Authentic K-Beauty formulation.',
      shortDescription: newProd.shortDescription || newProd.subTitle || '',
      keyBenefits: ['Original imported formulation', 'Clinically verified'],
      ingredientsList: ['Active Botanicals', 'Cellular Peptides'],
      activeCompounds: [],
      usageDirections: 'Apply onto cleansed skin.',
      skinType: ['All Skin Types'],
      texture: 'Silky Texture',
      inStock: newProd.inStock !== false,
      stockCount: newProd.stockCount || 50,
    });

    setIsAddProductOpen(false);
    setNewProd({
      name: '',
      subTitle: '',
      category: 'Skincare',
      price: 24,
      originalPrice: 30,
      volume: '50ml',
      tag: 'New',
      image: '/products/abib-glutathiosome-dark-spot-pad.jpg',
      description: '',
      shortDescription: '',
      inStock: true,
      stockCount: 50,
    });
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code) return;
    addCoupon({
      ...newCoupon,
      code: newCoupon.code.toUpperCase().trim(),
    });
    setIsAddCouponOpen(false);
    setNewCoupon({
      code: '',
      discountPercent: 15,
      minOrder: 25,
      description: '',
      isActive: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#F2E1E6]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#701A33] mb-1">
            <Shield className="w-4 h-4" />
            <span>Store Operations</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E0A12]">
            Grace Beauty Admin Dashboard
          </h1>
          <p className="text-xs text-[#7A646E] mt-0.5">
            Manage live inventory, customer orders, fulfillment pipelines, and promotional campaigns.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex p-1 bg-[#FAF0F3] rounded-full border border-[#E8BEC5] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#701A33] text-white shadow-xs'
                : 'text-[#55424B] hover:text-[#701A33]'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#701A33] text-white shadow-xs'
                : 'text-[#55424B] hover:text-[#701A33]'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#701A33] text-white shadow-xs'
                : 'text-[#55424B] hover:text-[#701A33]'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'coupons'
                ? 'bg-[#701A33] text-white shadow-xs'
                : 'text-[#55424B] hover:text-[#701A33]'
            }`}
          >
            Coupons ({coupons.length})
          </button>
        </div>
      </div>

      {/* TAB 1: DASHBOARD METRICS */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-emerald-700">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A646E]">Total Sales</span>
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E0A12]">
                ${analytics.totalRevenue.toFixed(2)}
              </div>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>Active Revenue</span>
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[#701A33]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A646E]">Customer Orders</span>
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E0A12]">
                {analytics.totalOrders}
              </div>
              <span className="text-[11px] text-[#7A646E]">
                {analytics.processingOrdersCount} pending dispatch
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-blue-700">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A646E]">Active Products</span>
                <Package className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E0A12]">
                {analytics.totalProducts}
              </div>
              <span className="text-[11px] text-[#7A646E]">
                100% Authentic Catalog
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-purple-700">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A646E]">Active Discounts</span>
                <Percent className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E0A12]">
                {coupons.filter((c) => c.isActive).length}
              </div>
              <span className="text-[11px] text-[#7A646E]">
                Live Promotions
              </span>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-[#1E0A12]">
                Recent Customer Orders
              </h2>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-[#701A33] hover:underline"
              >
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F2E1E6] text-[#7A646E] uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">Order</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Payment</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2E1E6]">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FDF7F8] transition-colors">
                      <td className="py-3 font-mono font-bold text-[#701A33]">
                        #{ord.orderNumber}
                      </td>
                      <td className="py-3 font-medium text-[#1E0A12]">
                        {ord.customerName}
                      </td>
                      <td className="py-3 text-[#7A646E]">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 font-bold text-[#1E0A12]">
                        ${ord.total.toFixed(2)}
                      </td>
                      <td className="py-3 capitalize text-[#55424B]">
                        {ord.paymentMethod === 'cod' ? 'COD (Pending)' : 'Card (Paid)'}
                      </td>
                      <td className="py-3">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-white border border-[#EED9DF] rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none focus:border-[#701A33] cursor-pointer"
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1 rounded-lg text-gray-400 hover:text-[#701A33] hover:bg-rose-50"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGER */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by name or category..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#EED9DF] text-xs focus:outline-none focus:border-[#701A33]"
              />
            </div>

            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F2E1E6] text-[#7A646E] uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">Volume</th>
                  <th className="pb-3 font-semibold">Stock Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2E1E6]">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FDF7F8] transition-colors">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded-xl bg-[#FDF7F8] border border-[#EED9DF] p-1"
                        />
                        <div className="max-w-xs">
                          <span className="font-semibold text-[#1E0A12] block truncate">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-[#7A646E] block truncate">
                            {p.subTitle}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-[#55424B] font-medium">{p.category}</td>
                    <td className="py-3 font-bold text-[#1E0A12]">${p.price}</td>
                    <td className="py-3 text-[#7A646E]">{p.volume}</td>
                    <td className="py-3">
                      <button
                        onClick={() => toggleStock(p.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-colors cursor-pointer ${
                          p.inStock !== false
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        {p.inStock !== false ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGER */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              placeholder="Search by order #, customer name or email..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#EED9DF] text-xs focus:outline-none focus:border-[#701A33]"
            />
          </div>

          <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F2E1E6] text-[#7A646E] uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Order</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Items</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Payment</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2E1E6]">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FDF7F8] transition-colors">
                    <td className="py-3 font-mono font-bold text-[#701A33]">
                      #{ord.orderNumber}
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-[#1E0A12] block">
                        {ord.customerName}
                      </span>
                      <span className="text-[11px] text-[#7A646E] block">
                        {ord.customerEmail}
                      </span>
                    </td>
                    <td className="py-3 text-[#55424B]">
                      {ord.items.length} items
                    </td>
                    <td className="py-3 font-bold text-[#1E0A12]">
                      ${ord.total.toFixed(2)}
                    </td>
                    <td className="py-3 capitalize text-[#55424B]">
                      {ord.paymentMethod === 'cod' ? 'COD' : 'Card (Paid)'}
                    </td>
                    <td className="py-3">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-white border border-[#EED9DF] rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-[#701A33] cursor-pointer"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#701A33] hover:bg-rose-50"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: COUPONS MANAGER */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-[#1E0A12]">
              Active Promotional Discount Codes
            </h2>
            <button
              onClick={() => setIsAddCouponOpen(true)}
              className="px-5 py-2 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="bg-white rounded-3xl border border-[#EED9DF] p-6 shadow-xs space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-[#701A33] bg-[#FCEEF1] px-3 py-1 rounded-xl border border-[#E8BEC5]">
                    {c.code}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {c.discountPercent}% OFF
                  </span>
                </div>

                <p className="text-xs text-[#55424B] leading-relaxed">{c.description}</p>
                <p className="text-[11px] text-[#7A646E]">Min. Order Requirement: ${c.minOrder}</p>

                <div className="pt-2 border-t border-[#F2E1E6] flex justify-end">
                  <button
                    onClick={() => deleteCoupon(c.code)}
                    className="text-gray-400 hover:text-rose-600 p-1"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsAddProductOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-[#EED9DF] z-10 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2E1E6]">
              <h3 className="font-serif text-lg font-bold text-[#1E0A12]">
                Add Formulation to Catalog
              </h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#55424B] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Abib Heartleaf Calming Cream"
                  className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#55424B] mb-1">
                  Subtitle / Key Ingredient Focus *
                </label>
                <input
                  type="text"
                  required
                  value={newProd.subTitle}
                  onChange={(e) => setNewProd({ ...newProd, subTitle: e.target.value })}
                  placeholder="e.g. Soothing & Barrier Repair"
                  className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#55424B] mb-1">
                    Category *
                  </label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Serums">Serums</option>
                    <option value="Moisturizers">Moisturizers</option>
                    <option value="Cleansers">Cleansers</option>
                    <option value="Sunscreen">Sunscreen</option>
                    <option value="Beauty Essentials">Beauty Essentials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#55424B] mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#55424B] mb-1">
                    Volume / Size
                  </label>
                  <input
                    type="text"
                    value={newProd.volume}
                    onChange={(e) => setNewProd({ ...newProd, volume: e.target.value })}
                    placeholder="e.g. 50ml / 1.7 fl.oz"
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#55424B] mb-1">
                    Product Badge / Tag
                  </label>
                  <select
                    value={newProd.tag}
                    onChange={(e) => setNewProd({ ...newProd, tag: e.target.value as any })}
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="New">New</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="Award Winner">Award Winner</option>
                    <option value="Limited Edition">Limited Edition</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#55424B] mb-1">
                  Product Image URL
                </label>
                <input
                  type="text"
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#701A33] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#520B1E]"
                >
                  Save Formulation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ORDER DETAILS */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-[#EED9DF] z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2E1E6]">
              <div>
                <span className="text-xs text-[#7A646E] block">Order Details</span>
                <span className="font-mono text-base font-bold text-[#701A33]">
                  #{selectedOrder.orderNumber}
                </span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FDF7F8] border border-[#EED9DF] space-y-1">
                <span className="font-bold text-[#1E0A12] block">Shipping Destination</span>
                <p className="text-[#55424B]">
                  <strong>{selectedOrder.shippingAddress.fullName}</strong> — {selectedOrder.shippingAddress.streetAddress}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                </p>
                <p className="text-[#7A646E]">Phone: {selectedOrder.shippingAddress.phone}</p>
                <p className="text-[#7A646E]">Email: {selectedOrder.customerEmail}</p>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedOrder.items.map((it: any, i: number) => (
                  <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div>
                      <span className="font-semibold text-[#1E0A12] block">{it.product.name}</span>
                      <span className="text-[11px] text-[#7A646E]">Qty: {it.quantity} × ${it.product.price}</span>
                    </div>
                    <span className="font-bold">${(it.quantity * it.product.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#F2E1E6] flex justify-between font-bold text-sm text-[#1E0A12]">
                <span>Total Amount:</span>
                <span className="text-[#701A33]">${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD COUPON */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsAddCouponOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#EED9DF] z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2E1E6]">
              <h3 className="font-serif text-base font-bold text-[#1E0A12]">
                Create Discount Code
              </h3>
              <button onClick={() => setIsAddCouponOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#55424B] mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER25"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs font-mono font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#55424B] mb-1">
                    Discount % *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={newCoupon.discountPercent}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountPercent: Number(e.target.value) })}
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#55424B] mb-1">
                    Min Order ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newCoupon.minOrder}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: Number(e.target.value) })}
                    className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#55424B] mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. 25% off all glowing serums"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  className="w-full bg-[#FDF7F8] border border-[#EED9DF] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCouponOpen(false)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#701A33] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
