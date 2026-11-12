import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Key } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 relative bg-gradient-to-b from-luxury-dark via-luxury-espresso/80 to-luxury-dark border-t border-luxury-gold/15 overflow-hidden">
      {/* Background ambient gold ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-luxury-gold/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-luxury-espresso border border-luxury-gold/30 text-[10px] font-mono uppercase tracking-[0.25em] text-luxury-gold shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sovereign Private Salon</span>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-luxury-ivory tracking-tight">
            Reserve Your Private Invitation.
          </h2>
          <p className="text-sm font-sans text-white/60 max-w-lg mx-auto">
            Receive private allocations of limited batch cellular elixirs, seasonal botanical monographs, and private access to our master chemist consults.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-md mx-auto p-6 rounded-3xl glass-card border border-luxury-gold/40 text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/20 border border-luxury-gold flex items-center justify-center mx-auto text-luxury-gold">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl text-luxury-ivory">Allocation Confirmed.</h4>
            <p className="text-xs text-white/60">
              Your sovereign dossier and 20% privilege code have been dispatched to{' '}
              <strong className="text-luxury-champagne font-mono">{email}</strong>.
            </p>
            <div className="p-2.5 rounded-xl bg-luxury-dark/90 border border-luxury-gold/20 flex items-center justify-center space-x-2 text-xs font-mono text-luxury-gold mt-2">
              <Key className="w-3.5 h-3.5" />
              <span>Privilege Pass: AURA20</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your confidential email..."
                className="flex-1 bg-luxury-dark/90 border border-luxury-gold/30 rounded-2xl px-5 py-4 text-xs font-sans text-luxury-ivory placeholder:text-white/30 focus:outline-none focus:border-luxury-gold shadow-inner"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-lightGold text-luxury-dark font-mono text-xs uppercase tracking-widest font-bold shadow-lg shadow-luxury-gold/20 hover:brightness-110 transition-all flex items-center justify-center space-x-2 shrink-0"
              >
                <span>Request Entry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] font-mono text-white/40">
              Strictly non-solicitous. Unsubscribe at any cycle with one click.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

