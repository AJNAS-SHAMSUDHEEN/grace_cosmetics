import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 20);
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
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#EED9DF]'
          : 'bg-transparent border-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo & Main Links */}
        <div className="flex items-center space-x-8 lg:space-x-10">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="relative">
              <img
                src="/logo/grace_logo.PNG"
                alt="Grace Beauty Store"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-[#E8BEC5] shadow-xs group-hover:scale-105 transition-all duration-300"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Authentic Store" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-[23px] font-bold tracking-tight text-[#1E0A12] group-hover:text-[#701A33] transition-colors leading-tight">
                Grace Beauty Store
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#8B2C47] font-semibold flex items-center space-x-1">
                <span>G.B.S</span>
                <span>•</span>
                <span className="text-[#D4A359]">100% Original</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8 text-sm font-medium text-[#4A3C42]">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 transition-colors ${
                    active
                      ? 'text-[#701A33] font-bold'
                      : 'hover:text-[#701A33] text-[#55424B]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#701A33] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Icons: Search, Wishlist, Cart, Mobile Toggle */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#4A3C42] hover:text-[#701A33] transition-colors"
            aria-label="Search"
            title="Search products and concerns"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#4A3C42] hover:text-[#701A33] transition-colors relative"
            aria-label="Wishlist"
            title="Saved Items"
          >
            <Heart className="w-5 h-5 stroke-[1.8]" />
            {wishlistIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#701A33] text-white text-[10px] font-semibold flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="p-2 text-[#4A3C42] hover:text-[#701A33] transition-colors relative"
            aria-label="Shopping Bag"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#701A33] text-white text-[10px] font-semibold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#4A3C42] hover:text-[#701A33] md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-4 my-2 bg-white/95 backdrop-blur-md rounded-2xl border border-[#EED9DF] p-4 space-y-2 shadow-xl animate-fade-in">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#FCEEF1] text-[#701A33] font-semibold'
                    : 'text-[#4A3C42] hover:bg-[#FDF7F8]'
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
