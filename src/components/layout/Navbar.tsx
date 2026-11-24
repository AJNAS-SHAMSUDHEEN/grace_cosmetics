import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
}) => {
  const { totalItems } = useCart();
  const { wishlistIds } = useWishlist();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Catalog', path: '/catalog' },
    { label: 'Categories', path: '/categories' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Rituals', path: '/rituals' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Centered Floating Glassy Dock */}
      <div
        className={`w-full max-w-5xl mx-auto flex items-center justify-between rounded-full px-4 sm:px-6 py-2 transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(112,26,51,0.12)]'
            : 'bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
        }`}
      >
        {/* Left: Brand Logo & Title */}
        <Link
          to="/"
          className="flex items-center space-x-2.5 group cursor-pointer shrink-0"
        >
          <div className="relative">
            <img
              src="/logo/grace_logo.PNG"
              alt="Grace Beauty Store"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-[#E8BEC5] shadow-2xs group-hover:scale-105 transition-all duration-300"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-serif text-base sm:text-[17px] font-bold tracking-tight text-[#1E0A12] group-hover:text-[#701A33] transition-colors leading-tight">
              Grace Beauty Store
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#8B2C47] font-semibold">
              G.B.S • 100% Original
            </span>
          </div>
        </Link>

        {/* Center: Frosted Glassy Pill Menu (matching user image) */}
        <nav className="hidden md:flex items-center p-1 rounded-full bg-[#1E0A12]/[0.06] backdrop-blur-md border border-white/70 shadow-inner space-x-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const isContact = link.path === '/contact';

            // Distinct highlighted pill for Contact (as shown on the right end of the user screenshot)
            if (isContact) {
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    active
                      ? 'bg-[#701A33] text-white shadow-xs'
                      : 'bg-[#1E0A12] hover:bg-[#701A33] text-white shadow-xs'
                  }`}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-300 ${
                  active
                    ? 'bg-white text-[#701A33] font-bold shadow-xs'
                    : 'text-[#4A3C42] hover:text-[#1E0A12] font-medium'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search, Wishlist, Cart & Mobile Menu */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full text-[#4A3C42] hover:text-[#701A33] hover:bg-white/80 transition-all"
            aria-label="Search"
            title="Search products and concerns"
          >
            <Search className="w-4 h-4 stroke-[1.8]" />
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="p-2 rounded-full text-[#4A3C42] hover:text-[#701A33] hover:bg-white/80 transition-all relative"
            aria-label="Wishlist"
            title="Saved Items"
          >
            <Heart className="w-4 h-4 stroke-[1.8]" />
            {wishlistIds.length > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#701A33] text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="p-2 rounded-full text-[#4A3C42] hover:text-[#701A33] hover:bg-white/80 transition-all relative"
            aria-label="Shopping Bag"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#701A33] text-white text-[9px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-[#4A3C42] hover:text-[#701A33] hover:bg-white/80 md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Card (Glassy) */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 w-full max-w-sm mx-auto bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/90 p-4 space-y-1.5 shadow-2xl animate-fade-in pointer-events-auto">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const isContact = link.path === '/contact';

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-full text-xs transition-all ${
                  isContact
                    ? 'bg-[#701A33] text-white font-semibold uppercase text-center mt-2'
                    : active
                    ? 'bg-[#FCEEF1] text-[#701A33] font-bold'
                    : 'text-[#4A3C42] hover:bg-white/70 font-medium'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
