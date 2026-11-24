import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Star, ChevronLeft, ChevronRight, Eye, ShieldCheck, Droplet, Sun, Layers } from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';

export interface ShowcaseSlideTheme {
  bgGradient: string;
  headingColor: string;
  subtextColor: string;
  buttonBg: string;
  glowColor: string;
}

export interface ShowcaseItem {
  id: string;
  productId: string;
  animationType: 'serum' | 'cream' | 'cleanser' | 'sunscreen' | 'lotion';
  image: string;
  theme: ShowcaseSlideTheme;
}

interface InteractiveProductShowcaseProps {
  onOpenDetail: (productId: string) => void;
  onSlideChange?: (item: ShowcaseItem, index: number) => void;
  onShopNow?: () => void;
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'showcase-1',
    productId: 'abib-glutathiosome-dark-spot-pad',
    animationType: 'cleanser', // Toner pad / clarifying essence
    image: '/hero_images/Screenshot_2026-11-24_101433-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #FDF7F2 0%, #F9ECE0 50%, #F4DDC8 100%)',
      headingColor: '#701A33',
      subtextColor: '#684539',
      buttonBg: '#701A33',
      glowColor: 'rgba(235, 180, 155, 0.5)',
    },
  },
  {
    id: 'showcase-2',
    productId: 'anua-azelaic-acid-10-serum',
    animationType: 'serum',
    image: '/hero_images/Screenshot_2026-11-24_101520-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #F2F8F4 0%, #E6F3EA 50%, #D4EADC 100%)',
      headingColor: '#1F472B',
      subtextColor: '#3A5C46',
      buttonBg: '#1F472B',
      glowColor: 'rgba(132, 204, 155, 0.5)',
    },
  },
  {
    id: 'showcase-3',
    productId: 'abib-glutathiosome-dark-spot-serum',
    animationType: 'serum',
    image: '/hero_images/Screenshot_2026-11-24_101552-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #FDF7F8 0%, #FCEEF1 50%, #F8E2E8 100%)',
      headingColor: '#701A33',
      subtextColor: '#6B4553',
      buttonBg: '#701A33',
      glowColor: 'rgba(232, 190, 197, 0.55)',
    },
  },
  {
    id: 'showcase-4',
    productId: 'cosrx-snail-92-all-in-one-cream',
    animationType: 'cream',
    image: '/hero_images/Screenshot_2026-11-24_101632-removebg-preview.png',
    theme: {
      bgGradient: 'linear-gradient(135deg, #FAF8F5 0%, #F2EEE7 50%, #E5DFD5 100%)',
      headingColor: '#520B1E',
      subtextColor: '#57463F',
      buttonBg: '#520B1E',
      glowColor: 'rgba(212, 163, 89, 0.4)',
    },
  },
  {
    id: 'showcase-5',
    productId: 'beauty-of-joseon-relief-sun',
    animationType: 'sunscreen',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    theme: {
      bgGradient: 'linear-gradient(135deg, #FFFDF8 0%, #FDF6E2 50%, #F7E7BE 100%)',
      headingColor: '#6E4518',
      subtextColor: '#5E4A35',
      buttonBg: '#6E4518',
      glowColor: 'rgba(245, 215, 120, 0.5)',
    },
  },
];

export const InteractiveProductShowcase: React.FC<InteractiveProductShowcaseProps> = ({
  onOpenDetail,
  onSlideChange,
  onShopNow,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const currentItem = SHOWCASE_ITEMS[currentIndex];
  const currentProduct: Product = useMemo(() => {
    return (
      PRODUCTS.find((p) => p.id === currentItem.productId) || {
        id: currentItem.productId,
        name: 'Curated Formulation',
        subTitle: 'Pure Dermatological Science',
        category: 'Skincare',
        price: 28,
        rating: 4.96,
        reviewCount: 320,
        volume: '50ml',
        image: currentItem.image,
        gallery: [currentItem.image],
        description: 'Authentic clinical K-Beauty formulation curated for barrier hydration.',
        shortDescription: 'Active formulation with targeted botanical compounds.',
        keyBenefits: ['Deep cellular nourishment', 'Barrier reinforcement'],
        ingredientsList: ['Glutathione', 'Niacinamide'],
        activeCompounds: [],
        usageDirections: 'Apply daily morning and evening.',
        skinType: ['All Skin Types'],
        texture: 'Silky fluid',
      }
    );
  }, [currentItem]);

  // Sync theme to parent
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentItem, currentIndex);
    }
  }, [currentIndex, currentItem, onSlideChange]);

  // Automatic Rotation Timer (Paused when hovered or mobile details open)
  useEffect(() => {
    if (isHovered || isMobileDetailsOpen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isHovered, isMobileDetailsOpen]);

  // 3D Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({
      x: -y * 14, // tilt around X axis
      y: x * 14, // tilt around Y axis
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      // swipe left -> next
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    } else if (diff < -45) {
      // swipe right -> prev
      setCurrentIndex((prev) => (prev - 1 + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length);
    }
    touchStartX.current = null;
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => setIsMobileDetailsOpen((prev) => !prev)}
      className="relative w-full h-[430px] sm:h-[480px] lg:h-[520px] flex items-center justify-center cursor-pointer select-none perspective-[1200px]"
    >
      {/* 1. Dynamic Ambient Aura Backdrop */}
      <motion.div
        key={`glow-${currentItem.id}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: isHovered ? 1.15 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-[80px] pointer-events-none"
        style={{ background: currentItem.theme.glowColor }}
      />

      {/* 2. CATEGORY-SPECIFIC ANIMATED BACKGROUND PARTICLES & EFFECTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        {/* SERUM ANIMATION: Transparent floating droplets & falling drop ripple */}
        {currentItem.animationType === 'serum' && (
          <div className="relative w-full h-full">
            {/* Falling Droplet with accelerating gravity */}
            <motion.div
              animate={{
                y: [20, 240, 240],
                opacity: [0, 0.95, 0],
                scale: [0.7, 1.1, 0.2],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: ['easeIn', 'easeOut'],
                times: [0, 0.8, 1],
              }}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-6 rounded-full bg-gradient-to-b from-white/90 via-emerald-100/70 to-emerald-300/40 shadow-[0_4px_12px_rgba(74,124,89,0.3)] backdrop-blur-xs"
              style={{
                clipPath: 'polygon(50% 0%, 100% 70%, 75% 100%, 25% 100%, 0% 70%)',
              }}
            />

            {/* Droplet Expanding Ripple Rings at Impact Floor */}
            <motion.div
              animate={{
                scale: [0.2, 2.4],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 2.1,
              }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-28 h-8 rounded-full border border-emerald-400/50"
            />

            {/* Floating Suspended Micro-Capsules (Vita beads) */}
            {[
              { x: '25%', y: '30%', size: 9, delay: 0 },
              { x: '75%', y: '25%', size: 12, delay: 0.4 },
              { x: '20%', y: '65%', size: 8, delay: 0.8 },
              { x: '82%', y: '58%', size: 14, delay: 1.2 },
              { x: '35%', y: '78%', size: 10, delay: 0.3 },
              { x: '68%', y: '72%', size: 11, delay: 0.7 },
            ].map((bead, i) => (
              <motion.div
                key={i}
                animate={{
                  y: ['-8px', '8px', '-8px'],
                  x: ['-4px', '4px', '-4px'],
                  scale: [1, 1.12, 1],
                  opacity: [0.55, 0.9, 0.55],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: bead.delay,
                }}
                className="absolute rounded-full shadow-sm"
                style={{
                  left: bead.x,
                  top: bead.y,
                  width: bead.size,
                  height: bead.size,
                  background: 'radial-gradient(circle at 35% 35%, #FFFFFF, #E5C287 50%, #C9963D 100%)',
                  boxShadow: '0 2px 8px rgba(201, 150, 61, 0.4)',
                }}
              />
            ))}
          </div>
        )}

        {/* CREAM ANIMATION: Luxurious cream-texture waves, flowing swirl, glossy sheen */}
        {currentItem.animationType === 'cream' && (
          <div className="relative w-full h-full">
            {/* Swirling Silk Cream Wave Ribbon Orbiting Base */}
            <motion.svg
              viewBox="0 0 500 500"
              className="absolute inset-0 w-full h-full opacity-65"
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            >
              <defs>
                <linearGradient id="creamGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#F5EFE6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#EADBCE" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 120,250 C 140,180 200,140 280,160 C 360,180 400,240 370,320 C 340,400 240,420 180,380 C 120,340 100,320 120,250 Z"
                fill="url(#creamGrad1)"
                filter="blur(14px)"
                animate={{
                  d: [
                    'M 120,250 C 140,180 200,140 280,160 C 360,180 400,240 370,320 C 340,400 240,420 180,380 C 120,340 100,320 120,250 Z',
                    'M 130,240 C 150,170 220,130 290,170 C 370,190 410,250 360,330 C 330,410 230,410 170,370 C 110,330 110,310 130,240 Z',
                    'M 120,250 C 140,180 200,140 280,160 C 360,180 400,240 370,320 C 340,400 240,420 180,380 C 120,340 100,320 120,250 Z',
                  ],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.svg>

            {/* Glossy Cream Highlights */}
            <motion.div
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.3, 0.65, 0.3],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-10 rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent blur-md"
            />
          </div>
        )}

        {/* CLEANSER / TONER PAD ANIMATION: Soft water splash & crystalline dewy spray */}
        {currentItem.animationType === 'cleanser' && (
          <div className="relative w-full h-full">
            {/* Expanding Aquatic Shockwaves */}
            <motion.div
              animate={{
                scale: [0.7, 1.8],
                opacity: [0.6, 0],
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 h-16 rounded-full border border-sky-300/40"
            />
            <motion.div
              animate={{
                scale: [0.7, 1.8],
                opacity: [0.6, 0],
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 1.6 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 h-16 rounded-full border border-amber-300/40"
            />

            {/* Floating Crystalline Water Droplets */}
            {[
              { x: '18%', y: '28%', delay: 0 },
              { x: '82%', y: '32%', delay: 0.5 },
              { x: '24%', y: '70%', delay: 1.0 },
              { x: '78%', y: '68%', delay: 1.5 },
            ].map((drop, idx) => (
              <motion.div
                key={idx}
                animate={{
                  y: ['-12px', '12px', '-12px'],
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.85, 0.4],
                }}
                transition={{
                  duration: 3.8 + idx * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: drop.delay,
                }}
                className="absolute w-3.5 h-3.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)] backdrop-blur-xs border border-white"
                style={{ left: drop.x, top: drop.y }}
              />
            ))}
          </div>
        )}

        {/* SUNSCREEN ANIMATION: Soft golden sunlight rays & gentle solar aura shield */}
        {currentItem.animationType === 'sunscreen' && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Rotating Warm Sunlight Rays */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[460px] h-[460px] rounded-full pointer-events-none opacity-40"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(255,230,150,0.3) 0deg, transparent 35deg, rgba(255,230,150,0.3) 70deg, transparent 105deg, rgba(255,230,150,0.3) 140deg, transparent 175deg, rgba(255,230,150,0.3) 210deg, transparent 245deg, rgba(255,230,150,0.3) 280deg, transparent 315deg, rgba(255,230,150,0.3) 360deg)',
                filter: 'blur(16px)',
              }}
            />

            {/* Protective Solar Shield Pulse */}
            <motion.div
              animate={{
                scale: [0.96, 1.06, 0.96],
                opacity: [0.4, 0.75, 0.4],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-72 h-72 rounded-full border-2 border-amber-300/40 shadow-[0_0_35px_rgba(245,215,120,0.3)] pointer-events-none"
            />
          </div>
        )}
      </div>

      {/* 3. 3D TILT CONTAINER HOLDING THE PRODUCT IMAGE */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.06 : 1,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-72 sm:h-88 lg:h-[420px] flex items-center justify-center animate-float-bottle"
          >
            {/* Product Bottle Shadow */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-8 rounded-full bg-black/15 blur-xl transform transition-all duration-300"
              style={{
                transform: `translateX(calc(-50% - ${tilt.y * 1.5}px)) scale(${isHovered ? 0.9 : 1})`,
              }}
            />

            {/* Main Product Cutout Image */}
            <img
              src={currentItem.image}
              alt={currentProduct.name}
              className="max-h-full max-w-[85%] sm:max-w-[80%] object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)] transition-all duration-500"
            />

            {/* Specular Light Reflection Sweep across Bottle on Hover */}
            {isHovered && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: [0, 0.5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 w-32 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] pointer-events-none"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 4. INTERACTIVE PRODUCT DETAILS OVERLAY CARD (Revealed on hover or mobile tap) */}
      <AnimatePresence>
        {(isHovered || isMobileDetailsOpen) && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(currentProduct.id);
            }}
            className="absolute bottom-4 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-sm z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-[#E8BEC5] space-y-2.5 transition-all group"
          >
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#701A33]">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-[#D4A359]" />
                <span>{currentProduct.category}</span>
                {currentProduct.tag && (
                  <span className="text-gray-400 font-normal">• {currentProduct.tag}</span>
                )}
              </span>
              <span className="text-[#D4A359] flex items-center space-x-0.5">
                <Star className="w-3 h-3 fill-current inline" />
                <span>{currentProduct.rating}</span>
              </span>
            </div>

            {/* Title & Short Description */}
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#1E0A12] leading-snug group-hover:text-[#701A33] transition-colors line-clamp-1">
                {currentProduct.name}
              </h4>
              <p className="text-xs text-[#7A646E] line-clamp-2 mt-0.5 leading-relaxed">
                {currentProduct.shortDescription || currentProduct.subTitle}
              </p>
            </div>

            {/* Price & View Product Button */}
            <div className="pt-2 border-t border-[#F7E6EB] flex items-center justify-between">
              <div>
                <span className="text-base font-bold text-[#1E0A12]">
                  ${currentProduct.price}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-xs text-gray-400 line-through ml-1.5">
                    ${currentProduct.originalPrice}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail(currentProduct.id);
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <span>View Product</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. SLIDER CONTROLS & PAGINATION PILLS */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-white/70 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-[#E8BEC5]/70 shadow-2xs">
        <button
          onClick={handlePrev}
          className="p-1 rounded-full text-[#701A33] hover:bg-white transition-colors"
          title="Previous Product"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-1 px-1">
          {SHOWCASE_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-5 bg-[#701A33]'
                  : 'w-1.5 bg-[#D48D9E]/50 hover:bg-[#D48D9E]'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-1 rounded-full text-[#701A33] hover:bg-white transition-colors"
          title="Next Product"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6. Mobile Tap Hint (visible briefly on touch screens) */}
      <div className="sm:hidden absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md text-[10px] font-medium text-[#701A33] border border-[#E8BEC5]/50 flex items-center space-x-1">
        <Eye className="w-3 h-3" />
        <span>Tap for details</span>
      </div>
    </div>
  );
};
