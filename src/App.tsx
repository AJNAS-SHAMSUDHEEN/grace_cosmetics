import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { Navbar } from './components/layout/Navbar';
import { LumiereHero } from './components/hero/LumiereHero';
import { BeautyCategories } from './components/categories/BeautyCategories';
import { TargetedSolutions } from './components/solutions/TargetedSolutions';
import { SkinConcerns } from './components/concerns/SkinConcerns';
import { SkincareRituals } from './components/rituals/SkincareRituals';
import { LumiereProducts } from './components/products/LumiereProducts';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { WishlistDrawer } from './components/layout/WishlistDrawer';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { CheckoutModal } from './components/common/CheckoutModal';
import { Check, X } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { isCartOpen, setIsCartOpen, notificationMessage, dismissNotification } = useCart();
  const { isWishlistOpen, setIsWishlistOpen } = useWishlist();

  const [activeDetailProductId, setActiveDetailProductId] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedConcern(null);
    scrollToSection('products');
  };

  const handleSelectConcern = (concernName: string) => {
    setSelectedConcern(concernName ? concernName : null);
    scrollToSection('products');
  };

  const handleSelectRitual = (ritualCategory: string) => {
    setSelectedCategory(ritualCategory);
    setSelectedConcern(null);
    scrollToSection('products');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1A1A] font-sans selection:bg-[#D8CEF0] selection:text-[#3B2568]">
      {/* 1. Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Floating Notification Toast */}
      {notificationMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131124] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs animate-fade-in border border-[#E8DEF5]">
          <div className="w-5 h-5 rounded-full bg-lumiere-purple text-white flex items-center justify-center font-bold">
            <Check className="w-3 h-3" />
          </div>
          <span>{notificationMessage}</span>
          <button onClick={dismissNotification} className="text-gray-400 hover:text-white p-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Hero Section: "GLOW WITH HEALTHY SKIN" + 3D Pastel Cosmetic Bottles */}
      <LumiereHero onShopNow={() => scrollToSection('products')} />

      {/* 3. Section: "Explore Beauty Categories" (Cosmetics, Skincare, Eye, Hair, Machines) */}
      <BeautyCategories onSelectCategory={handleSelectCategory} />

      {/* 4. Section: "Targeted Solutions" (Influencers' Favourites, Trusted Care, Korean Glow) */}
      <TargetedSolutions onShopCollection={handleSelectCategory} />

      {/* 5. Section: "Find the Right Care for Your Skin" (Acne, Pigmentation, Dullness, Tan, Dryness, Wrinkles) */}
      <SkinConcerns
        selectedConcern={selectedConcern}
        onSelectConcern={handleSelectConcern}
      />

      {/* 6. Section: "Skincare Rituals" (Cleanser, Sunscreen, Serum, Toner, Face Moisturizer, Night Cream) */}
      <SkincareRituals onSelectStep={handleSelectRitual} />

      {/* 7. Section: "Products" (Catalog with functional search, categories, and quick add) */}
      <LumiereProducts
        onOpenDetail={(id) => setActiveDetailProductId(id)}
        selectedCategoryFromParent={selectedCategory}
        selectedConcernFromParent={selectedConcern}
      />

      {/* 8. Footer */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Drawers & Modals */}
      <CartDrawer
        onOpenCheckoutModal={() => setIsCheckoutModalOpen(true)}
        onExploreProducts={() => scrollToSection('products')}
      />

      <WishlistDrawer
        onOpenProductDetail={(id) => setActiveDetailProductId(id)}
        onExploreProducts={() => scrollToSection('products')}
      />

      <ProductDetailModal
        productId={activeDetailProductId}
        onClose={() => setActiveDetailProductId(null)}
        onOpenAnotherProduct={(id) => setActiveDetailProductId(id)}
      />

      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={(id) => setActiveDetailProductId(id)}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <MainAppContent />
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
