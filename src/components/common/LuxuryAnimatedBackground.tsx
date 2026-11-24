import React from 'react';
import { motion } from 'framer-motion';

export const LuxuryAnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Fluid Ambient Gradient Orbs (Grace Palette) */}
      
      {/* Orb 1: Soft Rose Gold / Blush (Top Left) */}
      <div
        className="absolute -top-24 -left-28 w-[580px] h-[580px] rounded-full blur-[115px] opacity-70 animate-blob-1"
        style={{
          background: 'radial-gradient(circle, rgba(232, 190, 197, 0.75) 0%, rgba(252, 238, 241, 0.45) 55%, transparent 80%)',
        }}
      />

      {/* Orb 2: Warm Champagne Gold (Top Right & Center) */}
      <div
        className="absolute top-1/4 -right-24 w-[520px] h-[520px] rounded-full blur-[110px] opacity-60 animate-blob-2"
        style={{
          background: 'radial-gradient(circle, rgba(229, 194, 135, 0.65) 0%, rgba(253, 246, 226, 0.4) 55%, transparent 80%)',
        }}
      />

      {/* Orb 3: Deep Burgundy & Wine Bloom (Mid-page & Bottom) */}
      <div
        className="absolute top-2/3 left-1/4 w-[620px] h-[620px] rounded-full blur-[130px] opacity-35 animate-blob-3"
        style={{
          background: 'radial-gradient(circle, rgba(112, 26, 51, 0.35) 0%, rgba(212, 141, 158, 0.25) 50%, transparent 75%)',
        }}
      />

      {/* Orb 4: Subtle Blush Porcelain (Bottom Right) */}
      <div
        className="absolute -bottom-32 right-10 w-[550px] h-[550px] rounded-full blur-[120px] opacity-50 animate-blob-1"
        style={{
          background: 'radial-gradient(circle, rgba(248, 233, 238, 0.8) 0%, rgba(232, 190, 197, 0.35) 60%, transparent 80%)',
        }}
      />

      {/* 2. Delicate Luminous Floating Cosmetic Micro-Particles */}
      {[
        { x: '12%', y: '18%', size: 4, delay: 0, duration: 7 },
        { x: '88%', y: '22%', size: 5, delay: 1.5, duration: 8.5 },
        { x: '45%', y: '35%', size: 3, delay: 3, duration: 6.5 },
        { x: '15%', y: '58%', size: 6, delay: 2, duration: 9 },
        { x: '82%', y: '65%', size: 4, delay: 0.8, duration: 7.2 },
        { x: '35%', y: '82%', size: 5, delay: 2.5, duration: 8 },
        { x: '70%', y: '88%', size: 3, delay: 1.2, duration: 6 },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: ['0px', '-45px', '0px'],
            x: ['0px', '18px', '0px'],
            opacity: [0.15, 0.65, 0.15],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, #FFFFFF 0%, #E5C287 60%, #D48D9E 100%)',
            boxShadow: '0 0 10px rgba(229, 194, 135, 0.6)',
          }}
        />
      ))}

      {/* 3. Subtle Ultra-Fine Cosmetic Silk Contours */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};
