import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LumiereHero } from '../components/hero/LumiereHero';
import { BeautyCategories } from '../components/categories/BeautyCategories';
import { TargetedSolutions } from '../components/solutions/TargetedSolutions';
import { SkinConcerns } from '../components/concerns/SkinConcerns';
import { SkincareRituals } from '../components/rituals/SkincareRituals';
import { LumiereProducts } from '../components/products/LumiereProducts';

interface HomePageProps {
  onOpenDetailModal: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDetailModal }) => {
  const navigate = useNavigate();

  const handleSelectCategory = (categoryName: string) => {
    navigate(`/catalog?category=${encodeURIComponent(categoryName)}`);
  };

  const handleSelectConcern = (concernName: string) => {
    navigate(`/catalog?concern=${encodeURIComponent(concernName)}`);
  };

  const handleSelectRitual = (ritualCategory: string) => {
    navigate(`/rituals?step=${encodeURIComponent(ritualCategory)}`);
  };

  return (
    <div className="space-y-4">
      {/* 1. Hero: "GLOW WITH HEALTHY SKIN" + Modern Search "Find Your Solution" + 3D Pastel Bottles */}
      <LumiereHero
        onShopNow={() => navigate('/catalog')}
        onOpenDetail={(id) => navigate(`/product/${id}`)}
      />

      {/* 2. Explore Beauty Categories */}
      <BeautyCategories onSelectCategory={handleSelectCategory} />

      {/* 3. Targeted Solutions */}
      <TargetedSolutions onShopCollection={() => navigate('/solutions')} />

      {/* 4. Find the Right Care for Your Skin (Skin Concerns) */}
      <SkinConcerns
        selectedConcern={null}
        onSelectConcern={handleSelectConcern}
      />

      {/* 5. Skincare Rituals */}
      <SkincareRituals onSelectStep={handleSelectRitual} />

      {/* 6. Products Showcase Preview */}
      <LumiereProducts
        onOpenDetail={(id) => navigate(`/product/${id}`)}
      />
    </div>
  );
};
