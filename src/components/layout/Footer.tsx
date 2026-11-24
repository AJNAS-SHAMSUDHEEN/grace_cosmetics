import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, Heart, Sparkles, Truck, CheckCircle } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

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
    <footer id="footer" className="bg-white border-t border-[#EED9DF] pt-16 pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F7E6EB]">
          {/* Brand & Client IG Profile */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/logo/grace_logo.PNG"
                alt="Grace Beauty Store"
                className="h-12 w-12 rounded-full object-cover border-2 border-[#E8BEC5] shadow-xs group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="font-serif text-2xl font-bold text-[#1E0A12] tracking-tight block group-hover:text-[#701A33] transition-colors">
                  Grace Beauty Store
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#8B2C47] font-semibold">
                  G.B.S • 100% Original Products
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#6B5861] leading-relaxed max-w-sm">
              Authentic Makeup • Skincare • Haircare. Fast same-day delivery with 100% genuine guaranteed K-Beauty and global dermatological brands.
            </p>

            {/* Instagram Profile Badge */}
            <div className="pt-1">
              <a
                href="https://instagram.com/gracecosmetics._"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#FCEEF1] hover:bg-[#F8E9EE] border border-[#E8BEC5] text-xs font-semibold text-[#701A33] transition-colors group"
              >
                <InstagramIcon className="w-4 h-4 text-[#8B2C47] group-hover:scale-110 transition-transform" />
                <span>Follow @gracecosmetics._</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#701A33] block mb-2">
                Join our VIP Beauty Club
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#FDFBFA] border border-[#EED9DF] rounded-l-full px-4 py-2 text-xs text-[#1E0A12] placeholder:text-gray-400 focus:outline-none focus:border-[#701A33]"
                />
                <button
                  type="submit"
                  className="bg-[#701A33] hover:bg-[#520B1E] text-white px-5 rounded-r-full text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Join
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-600 flex items-center space-x-1 mt-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>Thank you! Your 15% VIP welcome code is GRACE15.</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#1E0A12] uppercase tracking-wider">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs text-[#6B5861]">
              <li>
                <Link to="/" className="hover:text-[#701A33] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-[#701A33] transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#701A33] transition-colors">
                  Beauty Categories
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#701A33] transition-colors">
                  Targeted Solutions
                </Link>
              </li>
              <li>
                <Link to="/rituals" className="hover:text-[#701A33] transition-colors">
                  Skincare Rituals
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#701A33] transition-colors">
                  Skin Concierge & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Brands */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#1E0A12] uppercase tracking-wider">
              Featured Brands
            </h4>
            <ul className="space-y-2 text-xs text-[#6B5861]">
              <li>
                <Link to="/catalog?search=Abib" className="hover:text-[#701A33] transition-colors">
                  Abib (Glutathiosome & Heartleaf)
                </Link>
              </li>
              <li>
                <Link to="/catalog?search=Anua" className="hover:text-[#701A33] transition-colors">
                  Anua (Azelaic Acid & Heartleaf 77%)
                </Link>
              </li>
              <li>
                <Link to="/catalog?search=COSRX" className="hover:text-[#701A33] transition-colors">
                  COSRX (Advanced Snail 96 Mucin)
                </Link>
              </li>
              <li>
                <Link to="/catalog?search=Beauty of Joseon" className="hover:text-[#701A33] transition-colors">
                  Beauty of Joseon (Relief Sun)
                </Link>
              </li>
              <li>
                <Link to="/catalog?search=The Ordinary" className="hover:text-[#701A33] transition-colors">
                  The Ordinary (Niacinamide 10%)
                </Link>
              </li>
              <li>
                <Link to="/catalog?search=Medicube" className="hover:text-[#701A33] transition-colors">
                  Medicube (Zero Pore Pad)
                </Link>
              </li>
              <li>
                <Link to="/catalog?search=Bioderma" className="hover:text-[#701A33] transition-colors">
                  Bioderma Sensibio H2O
                </Link>
              </li>
              <li>
                <Link to="/catalog?search=Laneige" className="hover:text-[#701A33] transition-colors">
                  Laneige Lip Sleeping Mask
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Guarantees */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#1E0A12] uppercase tracking-wider">
              Customer Guarantees
            </h4>
            <ul className="space-y-2 text-xs text-[#6B5861]">
              <li className="flex items-center space-x-1.5 text-emerald-700 font-medium">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>100% Authentic Guaranteed</span>
              </li>
              <li className="flex items-center space-x-1.5 text-[#701A33] font-medium">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span>Same Day Express Delivery</span>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#701A33] transition-colors">
                  Order via Instagram / WhatsApp
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#701A33] transition-colors">
                  Skin Concern Consultation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#701A33] transition-colors">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E7A83] gap-4">
          <p>© 2026 Grace Beauty Store (G.B.S). All rights reserved. 100% Original Products.</p>
          <div className="flex items-center space-x-6">
            <Link to="/contact" className="hover:text-[#701A33] transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-[#701A33] transition-colors">Authenticity Guarantee</Link>
            <Link to="/contact" className="hover:text-[#701A33] transition-colors">Delivery Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
