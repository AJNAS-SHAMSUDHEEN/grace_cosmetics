import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LumiereHero } from '../components/hero/LumiereHero';
import { BeautyCategories } from '../components/categories/BeautyCategories';
import { TargetedSolutions } from '../components/solutions/TargetedSolutions';
import { LumiereProducts } from '../components/products/LumiereProducts';
import { LuxuryAnimatedBackground } from '../components/common/LuxuryAnimatedBackground';

interface HomePageProps {
  onOpenDetailModal: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDetailModal }) => {
  const navigate = useNavigate();

  const handleSelectCategory = (categoryName: string) => {
    navigate(`/catalog?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="relative min-h-screen space-y-8 sm:space-y-12">
      {/* Dynamic Animated Ambient Background */}
      <LuxuryAnimatedBackground />

      {/* 1. Hero: Find Your Solution + Interactive 3D Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <LumiereHero
          onShopNow={() => navigate('/catalog')}
          onOpenDetail={(id) => navigate(`/product/${id}`)}
        />
      </motion.div>

      {/* 2. Explore Beauty Categories */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <BeautyCategories onSelectCategory={handleSelectCategory} />
      </motion.div>

      {/* 3. Targeted Solutions (Auto-scrolling on Mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <TargetedSolutions onShopCollection={() => navigate('/solutions')} />
      </motion.div>

      {/* 4. Products Showcase Preview (Curated Featured Selection) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <LumiereProducts
          limit={4}
          onOpenDetail={(id) => navigate(`/product/${id}`)}
        />
      </motion.div>
    </div>
  );
};
