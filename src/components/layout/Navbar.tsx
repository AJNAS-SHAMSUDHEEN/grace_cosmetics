import React from 'react';
import { Search, User, ShoppingBag, Heart, Menu, X } from 'lucide-react';
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
  const { totalItems } = useCart();
  const { wishlistIds } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#EFEBF7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Name & Main Links */}
        <div className="flex items-center space-x-10">
          {/* Brand Logo */}
          <div
            onClick={() => onNavigateSection('hero')}
            className="cursor-pointer flex items-center"
          >
            <span className="font-serif text-2xl sm:text-[26px] tracking-tight font-semibold text-[#1A1A1A] hover:text-lumiere-purple transition-colors">
              Lumière Beauty
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#4A4A4A]">
            <button
              onClick={() => onNavigateSection('hero')}
              className="hover:text-lumiere-purple transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateSection('products')}
              className="hover:text-lumiere-purple transition-colors"
            >
              Catalog
            </button>
            <button
              onClick={() => onNavigateSection('categories')}
              className="hover:text-lumiere-purple transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => onNavigateSection('solutions')}
              className="hover:text-lumiere-purple transition-colors"
            >
              Solutions
            </button>
            <button
              onClick={() => onNavigateSection('rituals')}
              className="hover:text-lumiere-purple transition-colors"
            >
              Rituals
            </button>
            <button
              onClick={() => onNavigateSection('footer')}
              className="hover:text-lumiere-purple transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Right Action Icons: Search, User, Bag */}
        <div className="flex items-center space-x-5">
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

          {/* User Account / Profile Icon */}
          <button
            onClick={() => onNavigateSection('solutions')}
            className="p-2 text-[#4A4A4A] hover:text-lumiere-purple transition-colors hidden sm:block"
            aria-label="Account"
            title="My Account"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Shopping Bag */}
          <button
            onClick={onOpenCart}
            className="p-2 text-[#4A4A4A] hover:text-lumiere-purple transition-colors relative"
            aria-label="Cart"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-lumiere-purple text-white text-[10px] font-semibold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-[#4A4A4A] hover:text-lumiere-purple"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#EFEBF7] px-6 py-5 space-y-4">
          <button
            onClick={() => {
              onNavigateSection('hero');
              setMobileMenuOpen(false);
            }}
            className="block text-left w-full font-medium text-[#1A1A1A] py-1"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigateSection('products');
              setMobileMenuOpen(false);
            }}
            className="block text-left w-full font-medium text-[#1A1A1A] py-1"
          >
            Catalog
          </button>
          <button
            onClick={() => {
              onNavigateSection('categories');
              setMobileMenuOpen(false);
            }}
            className="block text-left w-full font-medium text-[#1A1A1A] py-1"
          >
            Categories
          </button>
          <button
            onClick={() => {
              onNavigateSection('solutions');
              setMobileMenuOpen(false);
            }}
            className="block text-left w-full font-medium text-[#1A1A1A] py-1"
          >
            Targeted Solutions
          </button>
          <button
            onClick={() => {
              onNavigateSection('rituals');
              setMobileMenuOpen(false);
            }}
            className="block text-left w-full font-medium text-[#1A1A1A] py-1"
          >
            Skincare Rituals
          </button>
          <button
            onClick={() => {
              onNavigateSection('footer');
              setMobileMenuOpen(false);
            }}
            className="block text-left w-full font-medium text-[#1A1A1A] py-1"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};
