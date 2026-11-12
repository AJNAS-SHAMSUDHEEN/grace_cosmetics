import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlistIds } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collections', sectionId: 'collections' },
    { label: 'Formulations', sectionId: 'products' },
    { label: 'Triskin Science', sectionId: 'science' },
    { label: '3D Studio', sectionId: 'showcase' },
    { label: 'Discovery', sectionId: 'discovery' },
    { label: 'Story', sectionId: 'story' },
  ];

  const handleLinkClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-luxury-espresso border-b border-luxury-gold/15 py-1.5 px-4 text-center text-[10px] md:text-[11px] tracking-widest text-luxury-champagne font-mono uppercase flex items-center justify-center space-x-2">
        <Sparkles className="w-3 h-3 text-luxury-gold inline-block animate-pulse" />
        <span>Complimentary Express Courier on Orders Over $150 • Code: <strong className="text-luxury-ivory font-semibold">AURA20</strong> for 20% Off</span>
        <Sparkles className="w-3 h-3 text-luxury-gold inline-block animate-pulse" />
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-luxury-dark/90 backdrop-blur-md border-luxury-gold/20 py-3.5 shadow-2xl'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-luxury-ivory hover:text-luxury-gold transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Nav Links Left */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 3).map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.sectionId)}
                className="text-[12px] uppercase tracking-widest text-luxury-ivory/80 hover:text-luxury-gold transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Center Brand Identity */}
          <div className="text-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-display text-2xl sm:text-3xl tracking-[0.28em] text-luxury-ivory font-light block hover:text-luxury-champagne transition-colors">
              AURAELIA
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-luxury-gold uppercase font-mono block -mt-0.5">
              Haute Cellular Botanique
            </span>
          </div>

          {/* Desktop Nav Links Right */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(3).map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.sectionId)}
                className="text-[12px] uppercase tracking-widest text-luxury-ivory/80 hover:text-luxury-gold transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right Action Icons (Search, Wishlist, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-luxury-ivory/90 hover:text-luxury-gold transition-colors relative flex items-center space-x-1"
              aria-label="Search Catalog"
              title="Search Catalog (⌘K)"
            >
              <Search className="w-5 h-5" />
              <span className="hidden xl:inline text-[10px] font-mono border border-luxury-gold/30 rounded px-1 text-luxury-gold/80">
                ⌘K
              </span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-luxury-ivory/90 hover:text-luxury-gold transition-colors relative"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-luxury-gold text-luxury-dark text-[9px] font-bold flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              onClick={onOpenCart}
              className="p-2 text-luxury-ivory/90 hover:text-luxury-gold transition-colors relative flex items-center space-x-1.5"
              aria-label="Shopping Bag"
              title="View Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-luxury-gold text-luxury-dark text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-luxury-dark/95 backdrop-blur-xl border-b border-luxury-gold/20 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.sectionId)}
                className="block w-full text-left text-sm uppercase tracking-widest text-luxury-ivory py-2 border-b border-white/5 hover:text-luxury-gold"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs text-luxury-champagne font-mono">
              <span>Haute Skincare Consult</span>
              <span>Available 24/7</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
