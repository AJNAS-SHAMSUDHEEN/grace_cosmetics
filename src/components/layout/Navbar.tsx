import React, { useState } from 'react';
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EFEBF7] transition-all">
      {/* Top Banner Bar */}
      <div className="bg-[#FAF9F7] border-b border-[#F2EDFA] text-center py-1.5 px-4 text-[11px] text-[#5B4296] font-medium flex items-center justify-center space-x-2">
        <Sparkles className="w-3 h-3 text-lumiere-purple" />
        <span>Complimentary Express Delivery on Orders Over $60 • 100% Dermatologist Verified</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Name & Main Links */}
        <div className="flex items-center space-x-10">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center group cursor-pointer"
          >
            <span className="font-serif text-2xl sm:text-[26px] tracking-tight font-semibold text-[#1A1A1A] group-hover:text-lumiere-purple transition-colors">
              Lumière Beauty
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#4A4A4A]">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 transition-colors ${
                    active
                      ? 'text-lumiere-purple font-semibold'
                      : 'hover:text-lumiere-purple text-[#4A4A4A]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lumiere-purple rounded-full" />
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
            className="p-2 text-[#4A4A4A] hover:text-lumiere-purple transition-colors"
            aria-label="Search"
            title="Search formulations"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#4A4A4A] hover:text-lumiere-purple transition-colors relative"
            aria-label="Wishlist"
            title="Saved Items"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlistIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-lumiere-purple text-white text-[10px] font-semibold flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="p-2 text-[#4A4A4A] hover:text-lumiere-purple transition-colors relative"
            aria-label="Shopping Bag"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#131124] text-white text-[10px] font-semibold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#4A4A4A] hover:text-lumiere-purple md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#EFEBF7] px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#F3EEFA] text-lumiere-purple font-semibold'
                    : 'text-[#4A4A4A] hover:bg-[#FAF9F7]'
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
