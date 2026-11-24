import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
  Truck,
  Check,
} from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    instagramHandle: '',
    skinType: 'Combination',
    concern: 'Acne & Blemishes',
    subject: 'Order & Skincare Consultation Inquiry',
    message: '',
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: 'Are all products at Grace Beauty Store 100% authentic and original?',
      a: 'Yes, absolutely 100%. Grace Beauty Store (G.B.S) guarantees 100% genuine, original products sourced directly from authorized Korean and global dermatological manufacturers and distributors. Every product comes with manufacturer seals and original batch codes.',
    },
    {
      q: 'How does Same Day Delivery work?',
      a: 'We offer express Same Day Delivery on orders placed before 3:00 PM. Our local courier partners will deliver your package directly to your doorstep in secure, tamper-proof temperature-shielded packaging.',
    },
    {
      q: 'Can I order directly through Instagram or WhatsApp?',
      a: 'Yes! You can DM us anytime on Instagram at @gracecosmetics._ or message our WhatsApp concierge for immediate order placement, stock availability checks, and payment links.',
    },
    {
      q: 'How do I choose the right product for my skin concern?',
      a: 'Use our "Find Your Solution" symptom matcher on the home page, or submit the consultation form on this page with details about your skin type, current routine, and concerns. Our certified skincare advisors will prepare a personalized product recommendation.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <nav className="text-xs text-[#7A646E] mb-2 flex items-center space-x-2">
          <Link to="/" className="hover:text-[#701A33] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1E0A12] font-medium">Customer Care & Concierge</span>
        </nav>
        <div className="flex items-center space-x-3 mb-2">
          <img
            src="/logo/grace_logo.PNG"
            alt="Grace Beauty Store"
            className="h-10 w-10 rounded-full object-cover border border-[#E8BEC5]"
          />
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B2C47]">
            Grace Beauty Store (G.B.S)
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E0A12] tracking-tight">
          Skin Concierge & Customer Care
        </h1>
        <p className="text-sm text-[#7A646E] mt-1 max-w-2xl">
          Connect with our skincare concierge, inquire about specific authentic K-Beauty formulations, or arrange same-day delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left Form: Inquiries & Consultations (col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EED9DF] p-6 sm:p-10 shadow-xs">
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-[#FCEEF1] text-[#701A33] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1E0A12]">
                Send an Inquiry or Request a Consultation
              </h2>
              <p className="text-xs text-[#7A646E]">Our beauty advisors respond promptly within business hours.</p>
            </div>
          </div>

          {formSubmitted ? (
            <div className="p-8 text-center bg-[#FDF7F8] rounded-2xl border border-[#E8BEC5] space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1E0A12]">Consultation Request Received</h3>
              <p className="text-xs text-[#7A646E] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. A Grace Beauty Store advisor has received your request regarding <em>{formData.concern}</em> and will reach out to you at <strong>{formData.email}</strong> with personalized recommendations.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-full bg-[#701A33] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E0A12] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBFA] border border-[#EED9DF] text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E0A12] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBFA] border border-[#EED9DF] text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E0A12] mb-1.5">Your Skin Type</label>
                  <select
                    value={formData.skinType}
                    onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBFA] border border-[#EED9DF] text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33] cursor-pointer"
                  >
                    <option value="Normal">Normal Skin</option>
                    <option value="Dry">Dry / Dehydrated</option>
                    <option value="Oily">Oily / Congested</option>
                    <option value="Combination">Combination</option>
                    <option value="Sensitive">Sensitive / Reactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E0A12] mb-1.5">Primary Skin Concern</label>
                  <select
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBFA] border border-[#EED9DF] text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33] cursor-pointer"
                  >
                    <option value="Acne & Blemishes">Acne & Blemishes</option>
                    <option value="Hyperpigmentation & Melasma">Hyperpigmentation & Melasma (Dark Spots)</option>
                    <option value="Dullness & Uneven Tone">Dullness & Uneven Glass Glow</option>
                    <option value="Barrier Sensitivity & Redness">Barrier Sensitivity & Redness (Rosacea)</option>
                    <option value="Fine Lines & Collagen Loss">Fine Lines & Collagen Loss</option>
                    <option value="Product Advisory / Ingredients">Product Advisory & Authentic Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E0A12] mb-1.5">Instagram Handle (Optional)</label>
                <input
                  type="text"
                  placeholder="@yourusername"
                  value={formData.instagramHandle}
                  onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBFA] border border-[#EED9DF] text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E0A12] mb-1.5">Inquiry Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBFA] border border-[#EED9DF] text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E0A12] mb-1.5">Your Message or Detailed Skin History</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your current skin routine, products you're interested in, or delivery inquiries..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBFA] border border-[#EED9DF] text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Contact Information & Client Profile (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Instagram Official Card */}
          <div className="bg-gradient-to-br from-[#FDF7F8] to-[#FCEEF1] rounded-3xl border border-[#E8BEC5] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center space-x-3">
              <img
                src="/logo/grace_logo.PNG"
                alt="Grace Beauty Store"
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1E0A12]">
                  Grace Beauty Store
                </h3>
                <p className="text-xs font-semibold text-[#701A33]">@gracecosmetics._</p>
                <span className="text-[10px] text-emerald-700 font-medium">100% Original Products</span>
              </div>
            </div>

            <p className="text-xs text-[#6B5861] leading-relaxed">
              Order directly via Instagram DM or browse our stories for daily arrivals, verified client reviews, and flash promotions.
            </p>

            <a
              href="https://instagram.com/gracecosmetics._"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Visit @gracecosmetics._</span>
            </a>
          </div>

          {/* Quick info card */}
          <div className="bg-[#FDFBFA] rounded-3xl border border-[#EED9DF] p-6 sm:p-8 space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#1E0A12]">
              Customer Service & Ordering
            </h3>

            <div className="space-y-4 text-xs text-[#55424B]">
              <div className="flex items-start space-x-3">
                <Truck className="w-4 h-4 text-[#701A33] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E0A12] block">Same Day Express Delivery</span>
                  <span>Orders placed before 3 PM dispatched immediately</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#701A33] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E0A12] block">Email Support</span>
                  <a href="mailto:info@gracebeautystore.com" className="hover:text-[#701A33]">
                    info@gracebeautystore.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#701A33] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E0A12] block">Operating Hours</span>
                  <span>Monday - Saturday: 9:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Brands Card */}
          <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 sm:p-8 space-y-3">
            <h3 className="font-serif text-base font-bold text-[#1E0A12] uppercase tracking-wider">
              Guaranteed Authentic Brands
            </h3>
            <p className="text-xs text-[#7A646E] leading-relaxed">
              We carry 100% authentic inventory from top Korean & international dermatological brands:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Abib', 'Anua', 'COSRX', 'The Ordinary', 'Beauty of Joseon', 'Medicube', 'Bioderma', 'Laneige'].map((brand) => (
                <span
                  key={brand}
                  className="px-2.5 py-1 rounded-full bg-[#FDF7F8] border border-[#E8BEC5] text-[11px] font-medium text-[#701A33]"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-[#EED9DF] p-6 sm:p-10 shadow-xs">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <HelpCircle className="w-6 h-6 text-[#701A33] mx-auto mb-2" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E0A12]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#7A646E] mt-1">
            Common questions about authenticity, same day delivery, and product sourcing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#EED9DF] rounded-2xl overflow-hidden bg-[#FDFBFA]"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1E0A12] hover:text-[#701A33] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-[#701A33] ml-2" /> : <ChevronDown className="w-4 h-4 shrink-0 text-gray-400 ml-2" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#6B5861] leading-relaxed border-t border-[#F7E6EB] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
