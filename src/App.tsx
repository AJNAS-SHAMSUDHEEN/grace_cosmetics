import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { FeaturedCollections } from './components/collections/FeaturedCollections';
import { CinematicScrollJourney } from './components/scroll/CinematicScrollJourney';
import { FeaturedProducts } from './components/products/FeaturedProducts';
import { InteractiveDiscovery } from './components/discovery/InteractiveDiscovery';
import { ProductShowcase3D } from './components/showcase/ProductShowcase3D';
import { IngredientsScience } from './components/science/IngredientsScience';
import { BestSellers } from './components/products/BestSellers';
import { BrandStory } from './components/story/BrandStory';
import { Newsletter } from './components/newsletter/Newsletter';
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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCollection = (collectionName: string) => {
    setSelectedCategory(collectionName);
    scrollToSection('products');
  };

  const handleSearchIngredient = (ingredientName: string) => {
    scrollToSection('discovery');
  };

  return (
    <div className="min-h-screen bg-luxury-dark text-luxury-ivory font-sans selection:bg-luxury-gold selection:text-luxury-dark">
      {/* 1. Global Navigation Bar */}
      <Navbar
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Floating Notification Toast */}
      {notificationMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-luxury-dark/95 border border-luxury-gold/40 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 backdrop-blur-xl animate-fade-in">
          <div className="w-6 h-6 rounded-full bg-luxury-gold text-luxury-dark flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono text-luxury-champagne">{notificationMessage}</span>
          <button
            onClick={dismissNotification}
            className="p-1 text-white/40 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Section A: Hero Experience (WOW 3D Bottle & Editorial Typography) */}
      <HeroSection
        onExploreClick={() => scrollToSection('collections')}
        onDiscoverWorldClick={() => scrollToSection('story')}
        onQuickViewBottle={() => setActiveDetailProductId('triskin-cellular-renewal-elixir')}
      />

      {/* 3. Section B: Featured Collections */}
      <FeaturedCollections onSelectCollection={handleSelectCollection} />

      {/* 4. Cinematic 3D Scroll Journey Chapter (Phases of Cellular Beauty) */}
      <CinematicScrollJourney
        onExploreProducts={() => {
          setSelectedCategory('Triskin');
          scrollToSection('products');
        }}
      />

      {/* 5. Section C: Featured Products Catalog */}
      <FeaturedProducts
        onOpenDetail={(id) => setActiveDetailProductId(id)}
        selectedCategoryFromParent={selectedCategory}
      />

      {/* 6. Section D: Interactive Product Discovery & Search (Triskin Search Engine) */}
      <InteractiveDiscovery onOpenDetail={(id) => setActiveDetailProductId(id)} />

      {/* 7. Section E: 3D Product Showcase & Vessel Customizer */}
      <ProductShowcase3D onOpenDetail={(id) => setActiveDetailProductId(id)} />

      {/* 8. Section F: Ingredients & Cellular Science */}
      <IngredientsScience onSearchIngredient={handleSearchIngredient} />

      {/* 9. Section H: Best Sellers Carousel */}
      <BestSellers onOpenDetail={(id) => setActiveDetailProductId(id)} />

      {/* 10. Section G: Brand Story & Haute Manifesto */}
      <BrandStory onExploreCollection={() => scrollToSection('products')} />

      {/* 11. Section I: Newsletter Subscription */}
      <Newsletter />

      {/* 12. Section J: Global Luxury Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenProductDetail={(id) => setActiveDetailProductId(id)}
      />

      {/* DRAWERS & MODALS */}
      {/* Cart Drawer */}
      <CartDrawer
        onOpenCheckoutModal={() => setIsCheckoutModalOpen(true)}
        onExploreProducts={() => scrollToSection('products')}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        onOpenProductDetail={(id) => setActiveDetailProductId(id)}
        onExploreProducts={() => scrollToSection('products')}
      />

      {/* Product Deep-Dive Detail Modal */}
      <ProductDetailModal
        productId={activeDetailProductId}
        onClose={() => setActiveDetailProductId(null)}
        onOpenAnotherProduct={(id) => setActiveDetailProductId(id)}
        onOpen3dStudio={() => scrollToSection('showcase')}
      />

      {/* Global Search / Command-K Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={(id) => setActiveDetailProductId(id)}
      />

      {/* Checkout Simulation Modal */}
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
