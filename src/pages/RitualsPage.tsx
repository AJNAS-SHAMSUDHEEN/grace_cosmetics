import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Star, ShoppingBag, ArrowRight, Check, Sparkles, Sun, Moon, Droplet, Shield, Clock, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const RitualsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const stepParam = searchParams.get('step') || '01';
  const [activeStep, setActiveStep] = useState<string>(stepParam);

  const rituals = [
    {
      id: '01',
      stepNumber: '01',
      name: 'CLEANSER',
      category: 'Cleansers',
      title: 'Bioderma Sensibio H2O Micellar Water',
      time: 'AM & PM',
      purpose: 'Removes cellular debris, excess sebum, and particulate pollution without stripping the vital acid mantle.',
      dermatologistTip: 'Soak a cotton pad and sweep gently over skin. No harsh rubbing or rinsing required.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '02',
      stepNumber: '02',
      name: 'TONER / PAD',
      category: 'Skincare',
      title: 'Abib Glutathiosome Dark Spot Pad',
      time: 'AM & PM',
      purpose: 'Infuses 98% pure glutathione nanocarriers to reduce hyperpigmentation by 161.88% in 3 days.',
      dermatologistTip: 'Wipe first with the embossed side, then pat with the silky side for glass skin glow.',
      image: '/products/abib-glutathiosome-dark-spot-pad.jpg',
    },
    {
      id: '03',
      stepNumber: '03',
      name: 'SERUM',
      category: 'Serums',
      title: 'Abib Glutathiosome Deep Shot Ampoule',
      time: 'AM & PM',
      purpose: 'Micro-capsules burst upon contact to deliver concentrated glutathione and vitamin C to stubborn dark spots.',
      dermatologistTip: 'Press 2-3 drops into face, gently bursting golden capsules until fully absorbed.',
      image: '/products/abib-glutathiosome-dark-spot-serum.jpg',
    },
    {
      id: '04',
      stepNumber: '04',
      name: 'FACE MOISTURIZER',
      category: 'Moisturizers',
      title: 'COSRX Snail 92 All in One Cream',
      time: 'AM & PM',
      purpose: '92% snail secretion filtrate locks in active serums and rebuilds compromised lipid barriers.',
      dermatologistTip: 'Gently tap along cheekbones and forehead for bouncy elasticity.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '05',
      stepNumber: '05',
      name: 'SUNSCREEN',
      category: 'Sunscreen',
      title: 'Beauty of Joseon Relief Sun (SPF 50+)',
      time: 'AM Daily',
      purpose: '30% rice extract and grain probiotics provide broad-spectrum UV defense with zero white cast.',
      dermatologistTip: 'Apply generously 15 minutes before stepping into natural light or computer blue light.',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '06',
      stepNumber: '06',
      name: 'NIGHT TREATMENT',
      category: 'Beauty Essentials',
      title: 'Laneige Lip Sleeping Mask (Berry)',
      time: 'PM Nightly',
      purpose: 'Berry fruit complex and Murumuru butter melt away dead dry flakes for baby-soft lips.',
      dermatologistTip: 'Apply a generous coat before sleeping; gently wipe off any excess in the morning.',
      image: 'https://images.unsplash.com/photo-1512290900672-1f4175655557?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const currentRitual = rituals.find((r) => r.id === activeStep) || rituals[0];

  // Matched products for the active ritual step
  const stepProducts = PRODUCTS.filter((p) => p.category === currentRitual.category || p.category === 'Skincare');

  const handleSelectStep = (stepId: string) => {
    setActiveStep(stepId);
    searchParams.set('step', stepId);
    setSearchParams(searchParams);
  };

  const handleAddFullRoutine = () => {
    // Add top product from each of the 6 steps
    const sampleProducts = rituals.map((r) => {
      const match = PRODUCTS.find((p) => p.category === r.category) || PRODUCTS[0];
      return match;
    });
    sampleProducts.forEach((p) => addToCart(p, 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-xs text-[#8A859E] mb-2 flex items-center space-x-2">
          <Link to="/" className="hover:text-lumiere-purple transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Skincare Rituals</span>
        </nav>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] tracking-tight">
          The 6-Step Skincare Ritual
        </h1>
        <p className="text-sm text-[#666666] mt-1 max-w-2xl">
          A scientific daily layering sequence proven to maximize bio-active absorption, fortify the lipid barrier, and ignite lasting radiance.
        </p>
      </div>

      {/* 6 Step Interactive Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
        {rituals.map((r) => {
          const isActive = r.id === activeStep;
          return (
            <div
              key={r.id}
              onClick={() => handleSelectStep(r.id)}
              className={`group rounded-2xl overflow-hidden p-3.5 text-center cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-2 border-lumiere-purple shadow-md -translate-y-1'
                  : 'bg-[#F3EEFA] border border-[#E4D9F5] hover:border-lumiere-purple hover:bg-white'
              }`}
            >
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${
                  isActive ? 'bg-lumiere-purple text-white' : 'bg-white text-[#5B4296] border border-[#E2D6F5]'
                }`}>
                  STEP {r.stepNumber}
                </span>
                <span className="font-serif text-xs sm:text-sm font-semibold text-[#1A1A1A] block truncate">
                  {r.name}
                </span>
              </div>

              <div className="my-3 aspect-square rounded-xl bg-white overflow-hidden border border-[#EFEBF7]">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>

              <span className="text-[10px] text-[#8A859E] font-medium block">
                {r.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Step Spotlight Card */}
      <div className="bg-white rounded-3xl border border-[#EFEBF7] p-6 sm:p-10 shadow-xs mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-[#FAF9F7] border border-[#EAE2F8]">
            <img
              src={currentRitual.image}
              alt={currentRitual.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-lumiere-purple text-white text-xs font-bold uppercase tracking-wider">
                Step {currentRitual.stepNumber}
              </span>
              <span className="text-xs text-[#8A859E] font-medium flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Recommended: {currentRitual.time}</span>
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              {currentRitual.title}
            </h2>

            <p className="text-sm text-[#555555] leading-relaxed">
              {currentRitual.purpose}
            </p>

            <div className="bg-[#FAF9F7] p-4 rounded-2xl border border-[#EAE2F8]">
              <span className="text-xs font-bold text-lumiere-purple uppercase tracking-wider block mb-1">
                Dermatologist Protocol Tip
              </span>
              <p className="text-xs text-[#666666] leading-relaxed">
                "{currentRitual.dermatologistTip}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Formulations for This Ritual Step */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A1A1A]">
            Recommended Formulations for Step {currentRitual.stepNumber} ({currentRitual.name})
          </h3>
          <Link
            to={`/catalog?category=${encodeURIComponent(currentRitual.category)}`}
            className="text-xs font-semibold text-lumiere-purple hover:underline uppercase tracking-wider"
          >
            Explore All in {currentRitual.category}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {stepProducts.map((product) => {
            const isFav = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-[#EFEBF7] p-4 sm:p-5 flex flex-col justify-between hover:shadow-lg hover:border-lumiere-purple/30 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[4/5] rounded-2xl bg-[#FAF9F7] overflow-hidden mb-3.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isFav ? 'bg-rose-50 text-rose-500 shadow-sm' : 'bg-white/90 text-gray-400 hover:text-rose-500 shadow-2xs'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                    </button>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-lumiere-purple block mb-1">
                    {product.category}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] hover:text-lumiere-purple transition-colors line-clamp-1 block leading-snug"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-[#7A748E] line-clamp-2 mt-1 leading-relaxed">
                    {product.subTitle}
                  </p>
                </div>
                <div className="pt-3 mt-2 border-t border-[#F2EDFA] flex items-center justify-between">
                  <span className="text-base sm:text-lg font-bold text-[#1A1A1A]">${product.price.toFixed(2)}</span>
                  <div className="flex items-center space-x-1.5">
                    <Link
                      to={`/product/${product.id}`}
                      className="px-3 py-1.5 rounded-full bg-[#FAF9F7] hover:bg-[#EFEBF7] text-[#4A3578] text-xs font-semibold"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-8 h-8 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white flex items-center justify-center transition-colors shadow-xs"
                      title="Add to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Complete Routine Bundle Card */}
      <div className="bg-gradient-to-r from-[#241A42] to-[#131124] rounded-3xl p-8 sm:p-12 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#D8CEF0]">
            Complete Cellular Transformation
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            The Complete 6-Step Regimen Bundle
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Acquire all 6 formulations designed to work synergistically. Includes complimentary consultation, luxury storage tray, and 20% bundle savings.
          </p>
        </div>
        <div className="text-left md:text-right shrink-0">
          <div className="mb-3">
            <span className="text-xs text-[#D8CEF0] block">Special Ritual Bundle</span>
            <span className="text-3xl font-bold text-white">$275.00</span>
            <span className="text-sm text-gray-400 line-through ml-2">$345.00</span>
          </div>
          <button
            onClick={handleAddFullRoutine}
            className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF9F7] text-[#131124] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4 text-lumiere-purple" />
            <span>Add Complete Ritual (6 Items)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
