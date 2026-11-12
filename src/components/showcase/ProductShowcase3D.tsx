import React, { useState } from 'react';
import { ShowcaseViewer3D } from '../3d/ShowcaseViewer3D';
import { PRODUCTS } from '../../data/products';
import { Sparkles, Shield, Droplets, Layers, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ProductShowcase3DProps {
  onOpenDetail: (productId: string) => void;
}

export const ProductShowcase3D: React.FC<ProductShowcase3DProps> = ({ onOpenDetail }) => {
  const { addToCart } = useCart();
  const [selectedFinish, setSelectedFinish] = useState<'gold' | 'rosegold' | 'obsidian' | 'platinum'>('gold');
  const [selectedProductId, setSelectedProductId] = useState<string>('triskin-cellular-renewal-elixir');
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const showcaseProducts = PRODUCTS.filter((p) => p.is3dAvailable).slice(0, 4);

  return (
    <section id="showcase" className="py-24 relative bg-gradient-to-b from-luxury-dark via-luxury-espresso/60 to-luxury-dark border-t border-luxury-gold/15">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-luxury-gold/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.25em] text-luxury-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Realtime 3D Sensory Laboratory</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-luxury-ivory tracking-tight">
            The Interactive Vessel Experience
          </h2>
          <p className="text-sm font-sans text-white/60">
            Rotate the heavy refractive glass bottle in 360 degrees. Switch bespoke finishes, adjust laboratory lighting, and inspect micro-crystalline suspension.
          </p>
        </div>

        {/* 3D Showcase Split Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: 3D Interactive Canvas Viewer (7 cols) */}
          <div className="lg:col-span-7">
            <ShowcaseViewer3D
              finish={selectedFinish}
              onFinishChange={setSelectedFinish}
              productName={product.name}
            />

            {/* Product Switcher Bar below 3D */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {showcaseProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProductId(p.id)}
                  className={`p-3 rounded-2xl glass-card text-left border transition-all ${
                    selectedProductId === p.id
                      ? 'border-luxury-gold bg-luxury-gold/15'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-[9px] font-mono uppercase tracking-wider text-luxury-gold block">
                    {p.category}
                  </span>
                  <p className="font-serif text-xs text-luxury-ivory line-clamp-1 mt-0.5 font-medium">
                    {p.name}
                  </p>
                  <span className="font-mono text-[11px] text-white/60 block mt-1">
                    ${p.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Molecular Breakdown & Direct Action (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-luxury-gold/25 space-y-6">
              {/* Product Title & Category */}
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-luxury-gold block mb-1">
                  Active Formulation • {product.category}
                </span>
                <h3 className="font-serif text-3xl text-luxury-ivory font-light leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs font-sans text-white/60 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Physical Specifications */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs font-mono">
                <div>
                  <span className="text-white/40 block">Vessel Refraction</span>
                  <span className="text-luxury-ivory font-medium">1.52 High-Density Glass</span>
                </div>
                <div>
                  <span className="text-white/40 block">Volume Dispatch</span>
                  <span className="text-luxury-champagne font-medium">{product.volume}</span>
                </div>
                <div>
                  <span className="text-white/40 block">Suspension Media</span>
                  <span className="text-luxury-ivory font-medium">Lipid Bio-Vector</span>
                </div>
                <div>
                  <span className="text-white/40 block">Cellular Purity</span>
                  <span className="text-luxury-gold font-medium">99.4% Pharmaceutical</span>
                </div>
              </div>

              {/* Active Compounds Spotlight */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-luxury-champagne block">
                  Targeted Cellular Delivery
                </span>
                {product.activeCompounds.map((ac, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <div>
                      <span className="text-luxury-ivory font-mono font-medium block">{ac.name}</span>
                      <span className="text-[10px] text-white/50">{ac.description}</span>
                    </div>
                    <span className="font-mono text-luxury-gold font-bold ml-2">{ac.percentage}</span>
                  </div>
                ))}
              </div>

              {/* Price & Add to Bag CTA */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase block">Investment</span>
                  <span className="font-serif text-3xl text-luxury-gold font-light">${product.price}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => onOpenDetail(product.id)}
                    className="px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-luxury-ivory transition-all"
                  >
                    Details
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-lightGold text-luxury-dark font-mono text-xs uppercase tracking-widest font-bold shadow-lg shadow-luxury-gold/25 hover:brightness-110 transition-all flex items-center space-x-2"
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Acquire Formula</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

