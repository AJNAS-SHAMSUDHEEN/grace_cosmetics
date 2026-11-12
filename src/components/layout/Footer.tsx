import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="footer" className="bg-white border-t border-[#EFEBF7] pt-16 pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F0EBF7]">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold text-[#1A1A1A] tracking-tight block">
              Lumière Beauty
            </span>
            <p className="text-sm text-[#666666] leading-relaxed max-w-sm">
              Science-backed formulations curated for everyday radiance, healthy barrier hydration, and glowing skin.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5B4296] block mb-2">
                Join our Beauty Community
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#FAF9F7] border border-[#E8DEF5] rounded-l-full px-4 py-2 text-xs text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:border-lumiere-purple"
                />
                <button
                  type="submit"
                  className="bg-[#131124] hover:bg-lumiere-purple text-white px-5 rounded-r-full text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Join
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-600 flex items-center space-x-1 mt-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>Thank you! Your 15% welcome code is LUMIERE15.</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <button onClick={() => onNavigateSection('hero')} className="hover:text-lumiere-purple">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('products')} className="hover:text-lumiere-purple">
                  Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('categories')} className="hover:text-lumiere-purple">
                  Beauty Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('solutions')} className="hover:text-lumiere-purple">
                  Targeted Solutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('rituals')} className="hover:text-lumiere-purple">
                  Skincare Rituals
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <button onClick={() => onNavigateSection('products')} className="hover:text-lumiere-purple">
                  Cleansers & Toners
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('products')} className="hover:text-lumiere-purple">
                  Glow Serums
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('products')} className="hover:text-lumiere-purple">
                  Face Moisturizers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('products')} className="hover:text-lumiere-purple">
                  Mineral Sunscreen
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('products')} className="hover:text-lumiere-purple">
                  Night Creams
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <a href="#shipping" className="hover:text-lumiere-purple">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-lumiere-purple">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-lumiere-purple">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-lumiere-purple">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-lumiere-purple">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E8E93] gap-4">
          <p>© 2026 Lumière Beauty. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Cruelty-Free</span>
            <span>•</span>
            <span>Dermatologist Approved</span>
            <span>•</span>
            <span>Fast Worldwide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
