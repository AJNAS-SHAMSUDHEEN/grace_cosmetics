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
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    skinType: 'Combination',
    concern: 'Acne & Blemishes',
    subject: 'Skincare Consultation Inquiry',
    message: '',
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: 'Are Lumière Beauty products dermatologist-tested and non-comedogenic?',
      a: 'Yes, 100% of our clinical formulations undergo rigorous independent clinical patch testing and dermatologist verification. All formulas are formulated without pore-clogging mineral oils, parabens, synthetic fragrances, or aggressive sulfates.',
    },
    {
      q: 'How does the "Find Your Solution" condition search engine work?',
      a: 'Our symptom-to-formulation engine matches user-reported dermatological concerns (such as acne vulgaris, melasma, barrier erythema, or seasonal xerosis) with the exact biomimetic active compounds (e.g. Centella Asiatica, 10% Niacinamide, Multi-Weight Hyaluronic Acid) scientifically proven to treat them.',
    },
    {
      q: 'What is your complimentary shipping and returns policy?',
      a: 'We offer complimentary express carbon-neutral delivery on all orders over $60. If any formulation does not agree with your skin, our 30-day clinical satisfaction guarantee allows for seamless returns and full refunds or exchanges.',
    },
    {
      q: 'Can I book a personalized one-on-one virtual skin concierge session?',
      a: 'Absolutely. Submit the consultation form above selecting your skin type and specific concerns. Our licensed dermatological advisors will prepare a personalized routine analysis and follow up within 24 business hours.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <nav className="text-xs text-[#8A859E] mb-2 flex items-center space-x-2">
          <Link to="/" className="hover:text-lumiere-purple transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Customer Care & Concierge</span>
        </nav>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] tracking-tight">
          Skin Concierge & Inquiries
        </h1>
        <p className="text-sm text-[#666666] mt-1 max-w-2xl">
          Connect with our dermatological advisory board, inquire about specific clinical formulations, or request order assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left Form: Inquiries & Consultations (col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EFEBF7] p-6 sm:p-10 shadow-xs">
          <div className="flex items-center space-x-2 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#EAE2F8] text-lumiere-purple flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                Send an Inquiry or Book a Consult
              </h2>
              <p className="text-xs text-[#8A859E]">Our clinical concierge responds within 24 hours.</p>
            </div>
          </div>

          {formSubmitted ? (
            <div className="p-8 text-center bg-[#FAF9F7] rounded-2xl border border-[#EAE2F8] space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Inquiry Received</h3>
              <p className="text-xs text-[#666666] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. A licensed Lumière Beauty skin specialist has received your inquiry regarding <em>{formData.concern}</em> and will follow up at <strong>{formData.email}</strong> with personalized clinical recommendations.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-full bg-lumiere-purple text-white text-xs font-semibold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jane Harper"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] focus:outline-none focus:border-lumiere-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] focus:outline-none focus:border-lumiere-purple"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Your Skin Type</label>
                  <select
                    value={formData.skinType}
                    onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] focus:outline-none focus:border-lumiere-purple cursor-pointer"
                  >
                    <option value="Normal">Normal Skin</option>
                    <option value="Dry">Dry / Dehydrated</option>
                    <option value="Oily">Oily / Congested</option>
                    <option value="Combination">Combination</option>
                    <option value="Sensitive">Sensitive / Reactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Primary Skin Concern</label>
                  <select
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] focus:outline-none focus:border-lumiere-purple cursor-pointer"
                  >
                    <option value="Acne & Blemishes">Acne & Blemishes</option>
                    <option value="Hyperpigmentation & Melasma">Hyperpigmentation & Melasma</option>
                    <option value="Dullness & Uneven Tone">Dullness & Uneven Tone</option>
                    <option value="Barrier Sensitivity & Redness">Barrier Sensitivity & Redness</option>
                    <option value="Fine Lines & Collagen Loss">Fine Lines & Collagen Loss</option>
                    <option value="Product Advisory / Ingredients">Product Advisory / Ingredients</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Inquiry Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] focus:outline-none focus:border-lumiere-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Your Message or Detailed Skin History</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your current routine, allergies, or questions about specific actives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8DEF5] text-xs text-[#1A1A1A] focus:outline-none focus:border-lumiere-purple"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#131124] hover:bg-lumiere-purple text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Clinical Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Contact Information & Global Labs (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick info card */}
          <div className="bg-[#FAF9F7] rounded-3xl border border-[#EFEBF7] p-6 sm:p-8 space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Direct Assistance
            </h3>

            <div className="space-y-4 text-xs text-[#555555]">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-lumiere-purple shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1A1A1A] block">Email Advisory</span>
                  <a href="mailto:concierge@lumierebeauty.com" className="hover:text-lumiere-purple">
                    concierge@lumierebeauty.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-lumiere-purple shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1A1A1A] block">Concierge Hotline</span>
                  <span>+1 (800) 492-LUMI (5864)</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-lumiere-purple shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1A1A1A] block">Operating Hours</span>
                  <span>Monday - Saturday: 8:00 AM - 8:00 PM EST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Research Innovation Centers */}
          <div className="bg-white rounded-3xl border border-[#EFEBF7] p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Flagship Innovation Labs
            </h3>

            <div className="space-y-3 text-xs text-[#555555]">
              <div className="pb-3 border-b border-[#F2EDFA]">
                <strong className="text-[#1A1A1A] block">Paris Formulation Center</strong>
                <span>14 Rue Saint-Honoré, 75001 Paris, France</span>
              </div>
              <div className="pb-3 border-b border-[#F2EDFA]">
                <strong className="text-[#1A1A1A] block">Seoul Bio-Cellular Lab</strong>
                <span>Gangnam-gu, Teheran-ro 152, Seoul, South Korea</span>
              </div>
              <div>
                <strong className="text-[#1A1A1A] block">New York Clinical Studio</strong>
                <span>5th Avenue, Suite 1200, New York, NY 10022</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-[#EFEBF7] p-6 sm:p-10 shadow-xs">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <HelpCircle className="w-6 h-6 text-lumiere-purple mx-auto mb-2" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Answers to common questions regarding ingredients, dermatological safety, and shipping.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#EFEBF7] rounded-2xl overflow-hidden bg-[#FAF9F7]"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:text-lumiere-purple transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-lumiere-purple ml-2" /> : <ChevronDown className="w-4 h-4 shrink-0 text-gray-400 ml-2" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#666666] leading-relaxed border-t border-[#F0EBF7] pt-3">
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
