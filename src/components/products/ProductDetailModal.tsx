import React, { useState } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { X, Star, Heart, ShoppingBag, Plus, Minus, Check, ShieldCheck, Sparkles, Droplets } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductDetailModalProps {
  productId: string | null;
  onClose: () => void;
  onOpenAnotherProduct: (id: string) => void;
  onOpen3dStudio?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  productId,
  onClose,
  onOpenAnotherProduct,
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

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.name.includes('Lumière'))
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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-white border border-[#E8DEF5] rounded-3xl overflow-hidden shadow-2xl z-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-900 border border-gray-200 transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            {/* Gallery Left */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-[#EAE4F5] bg-[#FAF9F7] flex items-center justify-center group">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full transition-all shadow-xs ${
                    isFavorited
                      ? 'bg-lumiere-purple text-white'
                      : 'bg-white/80 text-gray-500 hover:text-lumiere-purple'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-3 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-16 h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      currentImage === imgUrl ? 'border-lumiere-purple scale-105' : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information Right */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
              <div className="space-y-3.5">
                <div className="flex items-center space-x-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-lumiere-purple">
                    {product.category}
                  </span>
                  {product.tag && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F3EEFA] text-lumiere-purple text-[10px] font-bold uppercase tracking-wider">
                      {product.tag}
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-tight">
                  {product.name}
                </h2>

                <p className="text-xs sm:text-sm text-[#554D69] leading-relaxed">
                  {product.description}
                </p>

                {/* Rating & Volume */}
                <div className="flex items-center justify-between border-y border-[#F0EBF7] py-2.5 text-xs">
                  <div className="flex items-center space-x-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-800">{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount} Reviews)</span>
                  </div>
                  <span className="text-gray-500 font-medium">{product.volume}</span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline space-x-3">
                  <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-emerald-600 font-medium">
                    Free Delivery Available
                  </span>
                </div>

                {/* Active Bio-Compounds High-Tech Table */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A3578] block">
                    Key Active Ingredients
                  </span>
                  <div className="space-y-1.5">
                    {product.activeCompounds.map((ac, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-[#FAF9F7] border border-[#EFEBF7] flex items-center justify-between text-xs"
                      >
                        <div>
                          <strong className="text-gray-900 block">{ac.name}</strong>
                          <span className="text-[11px] text-gray-500">{ac.description}</span>
                        </div>
                        <span className="font-semibold text-lumiere-purple ml-2 px-2 py-0.5 rounded bg-[#EFEBF7]">
                          {ac.percentage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabbed Info */}
                <div className="pt-2">
                  <div className="flex border-b border-[#F0EBF7] space-x-6 text-xs uppercase tracking-wider">
                    <button
                      onClick={() => setActiveTab('benefits')}
                      className={`pb-2 font-bold transition-colors relative ${
                        activeTab === 'benefits' ? 'text-lumiere-purple' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Benefits
                      {activeTab === 'benefits' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lumiere-purple" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('ingredients')}
                      className={`pb-2 font-bold transition-colors relative ${
                        activeTab === 'ingredients' ? 'text-lumiere-purple' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Formula
                      {activeTab === 'ingredients' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lumiere-purple" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('usage')}
                      className={`pb-2 font-bold transition-colors relative ${
                        activeTab === 'usage' ? 'text-lumiere-purple' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      How to Use
                      {activeTab === 'usage' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lumiere-purple" />
                      )}
                    </button>
                  </div>

                  <div className="py-2.5 text-xs leading-relaxed text-gray-600 min-h-[70px]">
                    {activeTab === 'benefits' && (
                      <ul className="space-y-1">
                        {product.keyBenefits.map((b, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-lumiere-purple shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 'ingredients' && (
                      <p className="text-gray-500 text-[11px] leading-relaxed">
                        {product.ingredientsList.join(' • ')}
                      </p>
                    )}
                    {activeTab === 'usage' && (
                      <p>{product.usageDirections}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="pt-3 border-t border-[#F0EBF7] flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-[#F8F5FC] border border-[#E8DEF5] rounded-full px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-500 hover:text-black p-0.5"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-semibold px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-500 hover:text-black p-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
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
      </div>
    </div>
  );
};
