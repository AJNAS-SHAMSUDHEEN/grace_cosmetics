import React, { useState } from 'react';
import { ArrowRight, Sparkles, Shield, Leaf, Droplets, Globe, Check } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenProductDetail: (productId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD ($)');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-luxury-espresso border-t border-luxury-gold/20 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Sustainable & Formulation Quality Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm text-luxury-ivory font-semibold">100% Bio-Dynamic</h5>
              <p className="text-[11px] text-white/50">Alpine wild-harvested actives</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm text-luxury-ivory font-semibold">Zero Microplastics</h5>
              <p className="text-[11px] text-white/50">100% biodegradable polymers</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm text-luxury-ivory font-semibold">Leaping Bunny Certified</h5>
              <p className="text-[11px] text-white/50">Strict zero animal testing policy</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm text-luxury-ivory font-semibold">Infinite Glass Vessels</h5>
              <p className="text-[11px] text-white/50">Heavy UV-blocking apothecary glass</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Col 1 & 2: Brand Identity & Manifesto */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-display text-2xl tracking-[0.25em] text-luxury-ivory block font-light">
                AURAELIA
              </span>
              <span className="text-[9px] tracking-[0.35em] text-luxury-gold uppercase font-mono block mt-1">
                Haute Cellular Botanique
              </span>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Transcending the boundary between dermatological cellular science and sensory luxury.
              Engineered with cryogenic bio-vectors, micro-crystallized peptides, and rare alpine flora.
            </p>

            {/* Newsletter input */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase font-mono tracking-widest text-luxury-champagne block">
                Join The Sovereign Circle
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your VIP email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-l-xl px-4 py-2.5 text-xs text-luxury-ivory placeholder:text-white/30 focus:outline-none focus:border-luxury-gold"
                />
                <button
                  type="submit"
                  className="bg-luxury-gold text-luxury-dark px-4 rounded-r-xl text-xs font-mono uppercase tracking-wider font-semibold hover:bg-luxury-lightGold transition-all flex items-center space-x-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-mono flex items-center space-x-1 mt-1">
                  <Check className="w-3 h-3" />
                  <span>Welcome to the Sovereign Circle. Check your inbox for your 20% privilege code.</span>
                </p>
              )}
            </div>
          </div>

          {/* Col 3: Collections */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-luxury-ivory tracking-wider uppercase">Collections</h4>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider text-white/60">
              <li>
                <button onClick={() => onNavigateSection('collections')} className="hover:text-luxury-gold transition-colors">
                  Triskin Cellular Line
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collections')} className="hover:text-luxury-gold transition-colors">
                  Bio-Active Serums
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collections')} className="hover:text-luxury-gold transition-colors">
                  Peptide Infusion Creams
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collections')} className="hover:text-luxury-gold transition-colors">
                  Mineral UV Veils SPF 50+
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collections')} className="hover:text-luxury-gold transition-colors">
                  Nocturne Cryo Masks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collections')} className="hover:text-luxury-gold transition-colors">
                  Sculpting Wands & Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Cellular Science */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-luxury-ivory tracking-wider uppercase">Scientific Science</h4>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider text-white/60">
              <li>
                <button onClick={() => onNavigateSection('science')} className="hover:text-luxury-gold transition-colors">
                  Tri-Molecular Hyaluronic Acid
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('science')} className="hover:text-luxury-gold transition-colors">
                  Lipid THD Vitamin C
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('science')} className="hover:text-luxury-gold transition-colors">
                  99.4% Pure Niacinamide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('science')} className="hover:text-luxury-gold transition-colors">
                  Micro-Encapsulated Retinal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('showcase')} className="hover:text-luxury-gold transition-colors">
                  3D Interactive Laboratory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('story')} className="hover:text-luxury-gold transition-colors">
                  Bio-Fermentation Chambers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Client Services & Currency */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-luxury-ivory tracking-wider uppercase">Client Sanctuaries</h4>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider text-white/60">
              <li>
                <a href="#consult" className="hover:text-luxury-gold transition-colors">
                  Cellular Skin Consultation
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-luxury-gold transition-colors">
                  Complimentary Courier Dispatch
                </a>
              </li>
              <li>
                <a href="#tracking" className="hover:text-luxury-gold transition-colors">
                  Cold-Chain Order Verification
                </a>
              </li>
              <li>
                <a href="#refill" className="hover:text-luxury-gold transition-colors">
                  Vessel Refill Programme
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-luxury-gold transition-colors">
                  Privacy & Data Sovereignty
                </a>
              </li>
            </ul>

            {/* Currency Selector */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-1.5 flex items-center space-x-1">
                <Globe className="w-3 h-3 text-luxury-gold" />
                <span>Regional Currency</span>
              </span>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-luxury-champagne focus:outline-none focus:border-luxury-gold"
              >
                <option value="USD ($)" className="bg-luxury-dark text-white">USD ($) United States</option>
                <option value="EUR (€)" className="bg-luxury-dark text-white">EUR (€) European Union</option>
                <option value="GBP (£)" className="bg-luxury-dark text-white">GBP (£) United Kingdom</option>
                <option value="CHF" className="bg-luxury-dark text-white">CHF Swiss Francs</option>
                <option value="JPY (¥)" className="bg-luxury-dark text-white">JPY (¥) Japan</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 space-y-4 sm:space-y-0">
        <p>© 2026 AURAELIA HAUTE CELLULAR LABS. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6">
          <a href="#terms" className="hover:text-luxury-gold transition-colors">Terms of Elegance</a>
          <a href="#privacy" className="hover:text-luxury-gold transition-colors">Biometric Privacy</a>
          <a href="#sustainability" className="hover:text-luxury-gold transition-colors">Carbon Ledger</a>
        </div>
      </div>
    </footer>
  );
};
