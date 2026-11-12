import React, { useState } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { X, Star, Heart, ShoppingBag, Plus, Minus, Check, ShieldCheck, Sparkles, Droplets, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductDetailModalProps {
  productId: string | null;
  onClose: () => void;
  onOpenAnotherProduct: (id: string) => void;
  onOpen3dStudio: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  productId,
  onClose,
  onOpenAnotherProduct,
  onOpen3dStudio,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.id === productId);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage'>('benefits');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!productId || !product) return null;

  const currentImage = selectedImage || product.image;
  const isFavorited = isInWishlist(product.id);

  // Related products from same category or Triskin line
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.name.includes('Triskin'))
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-10">
        <div className="relative w-full max-w-5xl bg-luxury-dark border border-luxury-gold/30 rounded-3xl overflow-hidden shadow-2xl z-10 glass-panel">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-luxury-dark/80 text-white/70 hover:text-white border border-white/10 hover:border-luxury-gold/40 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            {/* LEFT: Product Gallery & 3D trigger (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Frame */}
              <div className="relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center group">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* 3D Laboratory Badge / Button */}
                {product.is3dAvailable && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpen3dStudio();
                    }}
                    className="absolute bottom-4 left-4 bg-luxury-dark/90 backdrop-blur-md border border-luxury-gold/40 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all flex items-center space-x-1.5 shadow-xl"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch 3D Laboratory</span>
                  </button>
                )}

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                    isFavorited
                      ? 'bg-luxury-gold text-luxury-dark'
                      : 'bg-luxury-dark/70 text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-luxury-dark' : ''}`} />
                </button>
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-18 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      currentImage === imgUrl ? 'border-luxury-gold scale-105 shadow-md' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Purity Guarantee */}
              <div className="p-3.5 rounded-2xl bg-luxury-espresso/50 border border-luxury-gold/15 flex items-center space-x-3 text-xs font-mono text-luxury-champagne">
                <ShieldCheck className="w-5 h-5 text-luxury-gold shrink-0" />
                <span>Cold-Chain Certified • Formulated in Swiss Cryo-Cleanrooms</span>
              </div>
            </div>

            {/* RIGHT: Product Information, Active Compounds, Add to Bag (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Tag */}
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-luxury-gold">
                    {product.category}
                  </span>
                  {product.tag && (
                    <span className="px-2.5 py-0.5 rounded-full bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30 text-[10px] font-mono uppercase tracking-wider">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="font-serif text-3xl sm:text-4xl text-luxury-ivory font-light leading-tight">
                  {product.name}
                </h2>

                <p className="text-sm font-sans text-white/60 leading-relaxed">
                  {product.description}
                </p>

                {/* Rating & Volume */}
                <div className="flex items-center justify-between border-y border-white/10 py-3 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-luxury-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                      ))}
                    </div>
                    <span className="text-white/80 font-semibold">{product.rating}</span>
                    <span className="text-white/40">({product.reviewCount} Reviews)</span>
                  </div>
                  <span className="text-luxury-champagne font-medium">{product.volume}</span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline space-x-3">
                  <span className="font-serif text-3xl sm:text-4xl text-luxury-gold font-light">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-white/40 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-emerald-400">
                    Complimentary Courier Included
                  </span>
                </div>

                {/* Active Bio-Compounds High-Tech Table */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-luxury-champagne block">
                    Active Molecular Matrix
                  </span>
                  <div className="space-y-2">
                    {product.activeCompounds.map((ac, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <strong className="text-luxury-ivory font-mono font-medium block">
                            {ac.name}
                          </strong>
                          <span className="text-[11px] text-white/50">{ac.description}</span>
                        </div>
                        <span className="font-mono text-luxury-gold font-bold ml-3 px-2 py-0.5 rounded bg-luxury-gold/10">
                          {ac.percentage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabbed Info: Benefits / Ingredients / Directions */}
                <div className="pt-2">
                  <div className="flex border-b border-white/10 space-x-6 text-xs font-mono uppercase tracking-wider">
                    <button
                      onClick={() => setActiveTab('benefits')}
                      className={`pb-2 transition-colors relative ${
                        activeTab === 'benefits' ? 'text-luxury-gold font-semibold' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      Key Benefits
                      {activeTab === 'benefits' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('ingredients')}
                      className={`pb-2 transition-colors relative ${
                        activeTab === 'ingredients' ? 'text-luxury-gold font-semibold' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      Full Formula
                      {activeTab === 'ingredients' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('usage')}
                      className={`pb-2 transition-colors relative ${
                        activeTab === 'usage' ? 'text-luxury-gold font-semibold' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      Ritual & Usage
                      {activeTab === 'usage' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold" />
                      )}
                    </button>
                  </div>

                  <div className="py-3 text-xs leading-relaxed text-white/70 min-h-[90px]">
                    {activeTab === 'benefits' && (
                      <ul className="space-y-1.5">
                        {product.keyBenefits.map((b, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeTab === 'ingredients' && (
                      <p className="text-white/60 font-mono text-[11px] leading-relaxed">
                        {product.ingredientsList.join(' • ')}
                      </p>
                    )}

                    {activeTab === 'usage' && (
                      <div className="space-y-2">
                        <p>{product.usageDirections}</p>
                        <p className="text-[11px] font-mono text-luxury-gold">
                          Suitable for: {product.skinType.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Add to Cart Action */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center space-x-3 bg-luxury-espresso border border-luxury-gold/30 rounded-full px-3 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-white/60 hover:text-white p-1"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-sm px-2 text-luxury-ivory font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-white/60 hover:text-white p-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-lightGold text-luxury-dark font-mono text-xs uppercase tracking-widest font-bold shadow-lg shadow-luxury-gold/25 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Sovereign Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Formulations Row */}
          {relatedProducts.length > 0 && (
            <div className="p-6 sm:p-10 border-t border-white/10 bg-luxury-espresso/40">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-luxury-gold block mb-4">
                Complementary Cellular Regimen
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedImage(null);
                      onOpenAnotherProduct(rel.id);
                    }}
                    className="flex items-center space-x-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-luxury-gold/30 cursor-pointer transition-all group"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-14 h-16 object-cover rounded-xl border border-white/10 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="font-serif text-sm text-luxury-ivory group-hover:text-luxury-champagne line-clamp-1">
                        {rel.name}
                      </h4>
                      <span className="font-mono text-xs text-luxury-gold font-medium block">
                        ${rel.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
