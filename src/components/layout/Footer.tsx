import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
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
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-[#1A1A1A] tracking-tight block hover:text-lumiere-purple transition-colors">
                Lumière Beauty
              </span>
            </Link>
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
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <Link to="/" className="hover:text-lumiere-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-lumiere-purple transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-lumiere-purple transition-colors">
                  Beauty Categories
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-lumiere-purple transition-colors">
                  Targeted Solutions
                </Link>
              </li>
              <li>
                <Link to="/rituals" className="hover:text-lumiere-purple transition-colors">
                  Skincare Rituals
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lumiere-purple transition-colors">
                  Skin Concierge & Contact
                </Link>
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
                <Link to="/categories?cat=skincare" className="hover:text-lumiere-purple transition-colors">
                  Skincare
                </Link>
              </li>
              <li>
                <Link to="/categories?cat=cosmetics" className="hover:text-lumiere-purple transition-colors">
                  Cosmetics
                </Link>
              </li>
              <li>
                <Link to="/categories?cat=eye" className="hover:text-lumiere-purple transition-colors">
                  Eye Care
                </Link>
              </li>
              <li>
                <Link to="/categories?cat=hair" className="hover:text-lumiere-purple transition-colors">
                  Hair & Scalp
                </Link>
              </li>
              <li>
                <Link to="/categories?cat=machines" className="hover:text-lumiere-purple transition-colors">
                  Machines & Devices
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Triskin" className="hover:text-lumiere-purple transition-colors">
                  Triskin Cellular Line
                </Link>
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
                <Link to="/contact" className="hover:text-lumiere-purple transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lumiere-purple transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lumiere-purple transition-colors">
                  Clinical Consultation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lumiere-purple transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <span className="text-[#8A859E]">Paris • Seoul • New York</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A859E] gap-4">
          <p>© 2026 Lumière Beauty. All rights reserved. Zero human models — pure formulation science.</p>
          <div className="flex items-center space-x-6">
            <Link to="/contact" className="hover:text-lumiere-purple transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-lumiere-purple transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-lumiere-purple transition-colors">Clinical Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
