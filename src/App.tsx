import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { WishlistDrawer } from './components/layout/WishlistDrawer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { CheckoutModal } from './components/common/CheckoutModal';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { AuthModal } from './components/auth/AuthModal';

// Dedicated Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { RitualsPage } from './pages/RitualsPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';

import { Check, X } from 'lucide-react';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { isCartOpen, setIsCartOpen, notificationMessage, dismissNotification } = useCart();
  const { isWishlistOpen, setIsWishlistOpen } = useWishlist();

  const [activeQuickDetailProductId, setActiveQuickDetailProductId] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBFA] text-[#1E0A12] font-sans selection:bg-[#FCEEF1] selection:text-[#701A33] flex flex-col justify-between">
      {/* Scroll to top on every route transition */}
      <ScrollToTop />

      {/* Main Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating Notification Toast */}
      {notificationMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E0A12] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs animate-fade-in border border-[#E8BEC5]">
          <div className="w-5 h-5 rounded-full bg-[#701A33] text-white flex items-center justify-center font-bold">
            <Check className="w-3 h-3" />
          </div>
          <span>{notificationMessage}</span>
          <button onClick={dismissNotification} className="text-gray-400 hover:text-white p-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Dedicated Page Router with Breathing Room for Floating Glassy Navbar */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenDetailModal={(id) => navigate(`/product/${id}`)} />}
          />
          <Route path="/catalog" element={<div className="pt-20 sm:pt-24"><CatalogPage /></div>} />
          <Route
            path="/product/:id"
            element={<div className="pt-20 sm:pt-24"><ProductDetailPage onOpenCheckoutModal={() => navigate('/checkout')} /></div>}
          />
          <Route path="/categories" element={<div className="pt-20 sm:pt-24"><CategoriesPage /></div>} />
          <Route path="/solutions" element={<div className="pt-20 sm:pt-24"><SolutionsPage /></div>} />
          <Route path="/rituals" element={<div className="pt-20 sm:pt-24"><RitualsPage /></div>} />
          <Route path="/contact" element={<div className="pt-20 sm:pt-24"><ContactPage /></div>} />
          
          {/* Real E-Commerce Core Routes */}
          <Route path="/checkout" element={<div className="pt-20 sm:pt-24"><CheckoutPage /></div>} />
          <Route path="/order-confirmation/:orderId" element={<div className="pt-20 sm:pt-24"><OrderConfirmationPage /></div>} />
          <Route path="/profile" element={<div className="pt-20 sm:pt-24"><ProfilePage /></div>} />
          <Route path="/admin" element={<div className="pt-20 sm:pt-24"><AdminPage /></div>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Global Interactive Drawers & Overlays */}
      <CartDrawer
        onOpenCheckoutModal={() => navigate('/checkout')}
        onExploreProducts={() => {
          setIsCartOpen(false);
          navigate('/catalog');
        }}
      />

      <WishlistDrawer
        onOpenProductDetail={(id) => {
          setIsWishlistOpen(false);
          navigate(`/product/${id}`);
        }}
        onExploreProducts={() => {
          setIsWishlistOpen(false);
          navigate('/catalog');
        }}
      />

      {/* Quick View Modal if triggered */}
      <ProductDetailModal
        productId={activeQuickDetailProductId}
        onClose={() => setActiveQuickDetailProductId(null)}
        onOpenAnotherProduct={(id) => {
          setActiveQuickDetailProductId(null);
          navigate(`/product/${id}`);
        }}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={(id) => {
          setIsSearchModalOpen(false);
          navigate(`/product/${id}`);
        }}
      />

      {/* Checkout Modal (kept for legacy popups, redirects to checkout page) */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />

      {/* Global Auth Modal for Login & Registration */}
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShopProvider>
          <CartProvider>
            <WishlistProvider>
              <AppRoutes />
            </WishlistProvider>
          </CartProvider>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
