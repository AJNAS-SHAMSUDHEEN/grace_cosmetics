import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, User, Shield, Package, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

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
  const { user, isAdmin, openLoginModal, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

        {/* Center: Frosted Glassy Pill Menu */}
        <nav className="hidden md:flex items-center p-1 rounded-full bg-[#1E0A12]/[0.06] backdrop-blur-md border border-white/70 shadow-inner space-x-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const isContact = link.path === '/contact';

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

        {/* Right: Search, Wishlist, User Profile, Cart & Mobile Menu */}
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
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

          {/* User Profile / Auth Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-1 p-1 sm:px-2.5 sm:py-1 rounded-full bg-white/80 border border-[#EED9DF] hover:border-[#701A33] transition-all cursor-pointer shadow-2xs"
                title="Account"
              >
                <div className="w-6 h-6 rounded-full bg-[#701A33] text-white text-[11px] font-bold flex items-center justify-center">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
                <ChevronDown className="w-3 h-3 text-[#7A646E] hidden sm:inline" />
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="p-2 rounded-full text-[#4A3C42] hover:text-[#701A33] hover:bg-white/80 transition-all cursor-pointer"
                aria-label="Sign In"
                title="Sign In / Register"
              >
                <User className="w-4 h-4 stroke-[1.8]" />
              </button>
            )}

            {/* Dropdown Menu */}
            {user && userDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl border border-[#EED9DF] p-2 shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-[#F2E1E6] mb-1">
                  <span className="font-bold text-[#1E0A12] block truncate">
                    {user.displayName}
                  </span>
                  <span className="text-[11px] text-[#7A646E] block truncate">
                    {user.email}
                  </span>
                  {isAdmin && (
                    <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                      Store Administrator
                    </span>
                  )}
                </div>

                <Link
                  to="/profile"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-[#55424B] hover:text-[#701A33] hover:bg-[#FDF7F8] transition-colors"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>My Profile & Orders</span>
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl text-amber-900 bg-amber-50/70 hover:bg-amber-100/70 transition-colors font-semibold"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-700" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                <div className="pt-1 mt-1 border-t border-[#F2E1E6]">
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      navigate('/');
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-rose-700 hover:bg-rose-50 transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

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

      {/* Mobile Drawer Dropdown Card */}
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

          {/* Mobile User Links */}
          <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-4 rounded-full text-xs text-[#701A33] bg-[#FCEEF1] font-semibold"
                >
                  My Orders & Profile ({user.displayName})
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-4 rounded-full text-xs text-amber-900 bg-amber-50 font-bold"
                  >
                    👑 Admin Operations Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-4 rounded-full text-xs text-rose-700 hover:bg-rose-50 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full text-center py-2.5 px-4 rounded-full text-xs text-white bg-[#701A33] font-semibold shadow-xs"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
