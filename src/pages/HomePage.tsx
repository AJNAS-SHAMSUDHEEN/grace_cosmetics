import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LumiereHero } from '../components/hero/LumiereHero';
import { BeautyCategories } from '../components/categories/BeautyCategories';
import { TargetedSolutions } from '../components/solutions/TargetedSolutions';
import { LumiereProducts } from '../components/products/LumiereProducts';

interface HomePageProps {
  onOpenDetailModal: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDetailModal }) => {
  const navigate = useNavigate();

  const handleSelectCategory = (categoryName: string) => {
    navigate(`/catalog?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero: Modern Search "Find Your Solution" + 3D Pastel Bottles */}
      <LumiereHero
        onShopNow={() => navigate('/catalog')}
        onOpenDetail={(id) => navigate(`/product/${id}`)}
      />

      {/* 2. Explore Beauty Categories */}
      <BeautyCategories onSelectCategory={handleSelectCategory} />

      {/* 3. Targeted Solutions */}
      <TargetedSolutions onShopCollection={() => navigate('/solutions')} />

      {/* 4. Products Showcase Preview */}
      <LumiereProducts
        onOpenDetail={(id) => navigate(`/product/${id}`)}
      />
    </div>
  );
};

