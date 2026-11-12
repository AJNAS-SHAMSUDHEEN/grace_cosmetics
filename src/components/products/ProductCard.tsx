import React from 'react';
import { Product } from '../../types';
import { Star, Heart, ShoppingBag, Sparkles, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative rounded-3xl overflow-hidden glass-card border border-luxury-gold/15 hover:border-luxury-gold/50 transition-all duration-500 flex flex-col justify-between">
      {/* Product Image Section */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/40 p-4 flex items-center justify-center">
        {/* Tag Pill (e.g. Best Seller / Award Winner) */}
        {product.tag && (
          <div className="absolute top-4 left-4 z-10 bg-luxury-dark/90 backdrop-blur-md px-3 py-1 rounded-full border border-luxury-gold/30 text-[10px] font-mono uppercase tracking-widest text-luxury-gold flex items-center space-x-1 shadow-md">
            <Sparkles className="w-3 h-3 text-luxury-gold" />
            <span>{product.tag}</span>
          </div>
        )}

        {/* 3D Available Badge */}
        {product.is3dAvailable && (
          <div className="absolute bottom-4 left-4 z-10 bg-luxury-espresso/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-luxury-gold/25 text-[9px] font-mono uppercase tracking-wider text-luxury-champagne">
            3D Interactive
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all ${
            isFavorited
              ? 'bg-luxury-gold text-luxury-dark shadow-lg shadow-luxury-gold/30'
              : 'bg-luxury-dark/70 text-white/70 hover:text-white border border-white/10 hover:border-luxury-gold/40'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-luxury-dark' : ''}`} />
        </button>

        {/* Main Product Image (strictly NO HUMANS, bottles & textures only) */}
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onOpenDetail(product.id)}
          className="w-full h-full object-cover rounded-2xl transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
          loading="lazy"
        />

        {/* Hover Quick View Overlay Button */}
        <div className="absolute inset-0 bg-luxury-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={() => onOpenDetail(product.id)}
            className="px-5 py-2.5 rounded-full bg-luxury-dark/90 backdrop-blur-md border border-luxury-gold text-luxury-ivory font-mono text-xs uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-dark transition-all flex items-center space-x-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 duration-300"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Examine Formula</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Volume */}
          <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-1">
            <span className="uppercase tracking-widest text-luxury-gold">{product.category}</span>
            <span>{product.volume}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetail(product.id)}
            className="font-serif text-xl sm:text-2xl text-luxury-ivory hover:text-luxury-champagne transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-white/50 line-clamp-1 mt-1 font-sans">
            {product.subTitle}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-1.5 mt-2.5">
            <div className="flex items-center text-luxury-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-luxury-gold text-luxury-gold"
                />
              ))}
            </div>
            <span className="text-xs font-mono text-white/80">{product.rating}</span>
            <span className="text-[11px] font-mono text-white/40">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="font-serif text-2xl text-luxury-gold font-light">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono text-white/40 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-4 py-2.5 rounded-full bg-luxury-gold/15 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-dark border border-luxury-gold/40 hover:border-luxury-gold text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 flex items-center space-x-1.5 shadow-md group/btn"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
