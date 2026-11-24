import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import {
  Star,
  Heart,
  ShoppingBag,
  ArrowLeft,
  Check,
  ShieldCheck,
  Sparkles,
  Droplets,
  Clock,
  FlaskConical,
  RotateCcw,
  Plus,
  Minus,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductDetailPageProps {
  onOpenCheckoutModal?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenCheckoutModal }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage' | 'clinical'>('benefits');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-3">Product Not Found</h2>
        <p className="text-sm text-[#666666] mb-6">The formulation you are looking for does not exist or has been archived.</p>
        <Link
          to="/catalog"
          className="px-6 py-2.5 rounded-full bg-lumiere-purple text-white text-xs font-semibold uppercase tracking-wider inline-block"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isFav = isInWishlist(product.id);
  const images = product.gallery && product.gallery.length > 0 ? [product.image, ...product.gallery] : [product.image];

  // Related products from same category or random
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-8">
        <nav className="text-xs text-[#8A859E] flex items-center space-x-2">
          <Link to="/" className="hover:text-lumiere-purple transition-colors">Home</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-lumiere-purple transition-colors">Catalog</Link>
          <span>/</span>
          <Link
            to={`/catalog?category=${encodeURIComponent(product.category)}`}
            className="hover:text-lumiere-purple transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="text-xs text-[#666666] hover:text-lumiere-purple flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl border border-[#EFEBF7] p-6 sm:p-10 shadow-xs mb-16">
        {/* Left: Gallery & Product Visuals (col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Hero Image */}
          <div className="relative aspect-square rounded-2xl bg-[#FAF9F7] overflow-hidden border border-[#F0EBF7] group">
            <img
              src={images[selectedImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-semibold tracking-wider uppercase text-lumiere-purple border border-[#E8DEF5] shadow-xs">
                {product.tag}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isFav
                  ? 'bg-rose-50 text-rose-500 shadow-md'
                  : 'bg-white/80 text-gray-500 hover:text-rose-500 hover:bg-white shadow-xs'
              }`}
              title={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-lumiere-purple shadow-xs'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Clinical badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#F2EDFA] text-center">
            <div className="bg-[#FAF9F7] p-2.5 rounded-xl border border-[#EAE2F8]">
              <ShieldCheck className="w-4 h-4 text-lumiere-purple mx-auto mb-1" />
              <span className="text-[10px] font-semibold text-[#1A1A1A] block">Dermatologist Tested</span>
              <span className="text-[9px] text-[#8A859E]">Non-comedogenic</span>
            </div>
            <div className="bg-[#FAF9F7] p-2.5 rounded-xl border border-[#EAE2F8]">
              <Droplets className="w-4 h-4 text-lumiere-purple mx-auto mb-1" />
              <span className="text-[10px] font-semibold text-[#1A1A1A] block">Lipid Hydration</span>
              <span className="text-[9px] text-[#8A859E]">72-hour moisture</span>
            </div>
            <div className="bg-[#FAF9F7] p-2.5 rounded-xl border border-[#EAE2F8]">
              <Sparkles className="w-4 h-4 text-lumiere-purple mx-auto mb-1" />
              <span className="text-[10px] font-semibold text-[#1A1A1A] block">Clean Science</span>
              <span className="text-[9px] text-[#8A859E]">Paraben & cruelty free</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form (col-span-6) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-[#8A859E] mb-2">
              <span className="uppercase tracking-widest font-semibold text-lumiere-purple">
                {product.category}
              </span>
              <div className="flex items-center space-x-1.5">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                </div>
                <span className="font-bold text-[#1A1A1A]">{product.rating}</span>
                <span>({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-sm sm:text-base text-lumiere-purple font-medium mb-3">
              {product.subTitle}
            </p>

            {/* In-Stock & Dispatch Status */}
            <div className="flex items-center space-x-2 text-xs text-emerald-700 font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>In Stock • Complimentary Express Delivery Available</span>
            </div>

            {/* Price & Volume */}
            <div className="flex items-baseline space-x-3 pb-5 mb-5 border-b border-[#F2EDFA]">
              <span className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-[#8A859E] font-medium ml-2">
                Volume: {product.volume}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#555555] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Suitable Skin Types */}
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A859E] block mb-2">
                Suitable For:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.skinType.map((st) => (
                  <span
                    key={st}
                    className="px-2.5 py-1 rounded-full bg-[#FAF9F7] text-xs text-[#4A4A4A] border border-[#EAE2F8]"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Bag */}
            <div className="space-y-3 pt-2 pb-6 border-b border-[#F2EDFA]">
              <div className="flex items-center space-x-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#E8DEF5] rounded-full bg-[#FAF9F7] px-3 py-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-gray-500 hover:text-black transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#1A1A1A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-gray-500 hover:text-black transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3 px-6 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                </button>
              </div>

              {/* Instant Buy / Checkout */}
              {onOpenCheckoutModal && (
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    onOpenCheckoutModal();
                  }}
                  className="w-full py-2.5 rounded-full bg-[#EAE2F8] hover:bg-[#D8CEF0] text-[#4A3578] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Instant Express Checkout
                </button>
              )}
            </div>

            {/* Shipping & Return guarantees */}
            <div className="pt-4 flex items-center justify-between text-[11px] text-[#8A859E]">
              <span className="flex items-center space-x-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Complimentary Express Shipping on orders over $60</span>
              </span>
              <span className="flex items-center space-x-1">
                <RotateCcw className="w-3.5 h-3.5 text-lumiere-purple" />
                <span>30-Day Guarantee</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Deep-Dive Section */}
      <div className="bg-white rounded-3xl border border-[#EFEBF7] p-6 sm:p-10 shadow-xs mb-16">
        {/* Tab Headers */}
        <div className="flex items-center space-x-4 border-b border-[#F2EDFA] pb-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'benefits'
                ? 'border-lumiere-purple text-lumiere-purple'
                : 'border-transparent text-[#8A859E] hover:text-[#1A1A1A]'
            }`}
          >
            Key Benefits
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'border-lumiere-purple text-lumiere-purple'
                : 'border-transparent text-[#8A859E] hover:text-[#1A1A1A]'
            }`}
          >
            Active Compounds & INCI
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'usage'
                ? 'border-lumiere-purple text-lumiere-purple'
                : 'border-transparent text-[#8A859E] hover:text-[#1A1A1A]'
            }`}
          >
            How To Use
          </button>
          <button
            onClick={() => setActiveTab('clinical')}
            className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'clinical'
                ? 'border-lumiere-purple text-lumiere-purple'
                : 'border-transparent text-[#8A859E] hover:text-[#1A1A1A]'
            }`}
          >
            Clinical Science
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'benefits' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.keyBenefits.map((benefit, i) => (
              <div key={i} className="flex items-start space-x-3 bg-[#FAF9F7] p-4 rounded-2xl border border-[#F0EBF7]">
                <div className="w-5 h-5 rounded-full bg-[#EAE2F8] text-lumiere-purple flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#1A1A1A] block">{benefit}</span>
                  <span className="text-[11px] text-[#777777]">Clinically observed improvement within 14 days of daily adherence.</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="space-y-6">
            {/* Active compounds */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                Key Bio-Actives & Concentrations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {product.activeCompounds.map((comp, idx) => (
                  <div key={idx} className="bg-[#FAF9F7] p-3.5 rounded-xl border border-[#EAE2F8]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-[#1A1A1A]">{comp.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lumiere-purple text-white">
                        {comp.percentage}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666666] leading-relaxed">{comp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full INCI list */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                Complete Ingredients (INCI)
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed bg-[#FAF9F7] p-4 rounded-xl border border-[#F0EBF7]">
                {product.ingredientsList.join(', ')}.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-4 max-w-2xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              Ritual Application Directions
            </h4>
            <p className="text-xs text-[#555555] leading-relaxed bg-[#FAF9F7] p-4 rounded-xl border border-[#F0EBF7]">
              {product.usageDirections}
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF9F7] border border-[#F0EBF7]">
                <span className="font-semibold text-lumiere-purple block mb-1">Morning Routine (AM)</span>
                <span className="text-[#666666]">Apply following gentle cleanser and toner. Always complete with SPF 50+.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F7] border border-[#F0EBF7]">
                <span className="font-semibold text-lumiere-purple block mb-1">Evening Routine (PM)</span>
                <span className="text-[#666666]">Apply after double cleansing to facilitate overnight cellular regeneration.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clinical' && (
          <div className="space-y-4 max-w-2xl text-xs text-[#555555] leading-relaxed">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              Independent Dermatological Verification
            </h4>
            <p>
              In a 28-day randomized double-blind evaluation conducted under dermatological supervision with 48 subjects:
            </p>
            <ul className="space-y-2 list-disc list-inside text-[#333333]">
              <li><strong className="text-[#1A1A1A]">96%</strong> reported noticeable improvement in skin barrier hydration within 48 hours.</li>
              <li><strong className="text-[#1A1A1A]">91%</strong> observed visible reduction in redness, texture irregularities, and dull tone.</li>
              <li><strong className="text-[#1A1A1A]">0%</strong> reported irritation or sensitization during the clinical cycle.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
              Frequently Paired Formulations
            </h3>
            <Link
              to="/catalog"
              className="text-xs font-semibold text-lumiere-purple hover:underline uppercase tracking-wider"
            >
              View All Formulations
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="group bg-white rounded-3xl border border-[#EFEBF7] p-4 flex flex-col justify-between hover:shadow-lg hover:border-lumiere-purple/30 transition-all duration-300"
              >
                <div>
                  <div className="aspect-[4/5] rounded-2xl bg-[#FAF9F7] overflow-hidden mb-3.5">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-lumiere-purple tracking-widest block mb-1">
                    {rel.category}
                  </span>
                  <Link
                    to={`/product/${rel.id}`}
                    className="font-serif text-sm font-semibold text-[#1A1A1A] hover:text-lumiere-purple transition-colors line-clamp-1 block leading-snug"
                  >
                    {rel.name}
                  </Link>
                  <p className="text-xs text-[#7A748E] line-clamp-2 mt-1">
                    {rel.subTitle}
                  </p>
                </div>
                <div className="pt-3 mt-2 border-t border-[#F2EDFA] flex items-center justify-between">
                  <span className="text-base font-bold text-[#1A1A1A]">${rel.price.toFixed(2)}</span>
                  <div className="flex items-center space-x-1.5">
                    <Link
                      to={`/product/${rel.id}`}
                      className="px-2.5 py-1 rounded-full bg-[#FAF9F7] hover:bg-[#EFEBF7] text-[#4A3578] text-[11px] font-semibold"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => addToCart(rel, 1)}
                      className="w-7 h-7 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white flex items-center justify-center transition-colors shadow-xs"
                      title="Add to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
