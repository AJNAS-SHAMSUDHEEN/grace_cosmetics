import React, { useState } from 'react';
import { INGREDIENTS } from '../../data/ingredients';
import { Sparkles, Atom, Droplets, ShieldCheck, ArrowRight, Dna } from 'lucide-react';

interface IngredientsScienceProps {
  onSearchIngredient: (name: string) => void;
}

export const IngredientsScience: React.FC<IngredientsScienceProps> = ({ onSearchIngredient }) => {
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>(INGREDIENTS[0].id);

  const activeIngredient = INGREDIENTS.find((ing) => ing.id === selectedIngredientId) || INGREDIENTS[0];

  return (
    <section id="science" className="py-24 relative bg-luxury-dark border-t border-luxury-gold/15 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-10 w-[550px] h-[550px] bg-luxury-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.25em] text-luxury-gold">
              <Dna className="w-3.5 h-3.5" />
              <span>Bio-Molecular Pharmacopeia</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-luxury-ivory tracking-tight">
              Ingredients & Cellular Science
            </h2>
            <p className="text-sm font-sans text-white/60 max-w-xl">
              We engineer our elixirs around biocompatible, clinically validated active compounds that mirror cellular membranes for maximum trans-dermal bioavailability.
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs font-mono uppercase tracking-widest text-luxury-champagne block">
              100% Phyto-Identical
            </span>
            <span className="text-[11px] text-white/40 font-mono">Zero Synthetics & Silicones</span>
          </div>
        </div>

        {/* Interactive Ingredients Tabs */}
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {INGREDIENTS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedIngredientId(item.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-300 flex items-center space-x-2 ${
                selectedIngredientId === item.id
                  ? 'bg-luxury-gold text-luxury-dark font-semibold shadow-lg shadow-luxury-gold/25'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Highlighted Deep-Dive Ingredient Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-card rounded-3xl p-6 sm:p-10 border border-luxury-gold/25 shadow-2xl items-center">
          {/* LEFT: Abstract Botanical / Liquid Texture Imagery (NO HUMANS) */}
          <div className="lg:col-span-5 relative h-80 sm:h-[440px] rounded-2xl overflow-hidden border border-white/10 bg-black/50">
            <img
              src={activeIngredient.image}
              alt={activeIngredient.name}
              className="w-full h-full object-cover transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-transparent opacity-80" />

            {/* Molecular Formula Floating Tag */}
            <div className="absolute top-4 left-4 bg-luxury-dark/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-luxury-gold/30 text-xs font-mono text-luxury-champagne shadow-lg">
              <span className="text-luxury-gold font-bold mr-1">Formula:</span>
              <span>{activeIngredient.molecularFormula}</span>
            </div>

            {/* Botanical Origin Pill */}
            <div className="absolute bottom-4 left-4 right-4 bg-luxury-dark/90 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-xs font-mono">
              <span className="text-[10px] text-white/40 uppercase tracking-widest block">
                Source of Extraction
              </span>
              <p className="text-luxury-ivory font-serif text-sm mt-0.5 font-medium">
                {activeIngredient.origin}
              </p>
            </div>
          </div>

          {/* RIGHT: Molecular Specifications & Efficacy Data (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-luxury-gold uppercase tracking-widest mb-1.5">
                <Atom className="w-3.5 h-3.5" />
                <span>{activeIngredient.category}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-luxury-ivory font-light">
                {activeIngredient.name}
              </h3>
              <p className="text-xs font-mono text-white/50 tracking-wider mt-1">
                {activeIngredient.chemicalName}
              </p>
            </div>

            <p className="text-sm font-sans text-white/70 leading-relaxed">
              {activeIngredient.description}
            </p>

            {/* Scientific Claims Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex items-center space-x-2 text-luxury-gold text-xs font-mono uppercase tracking-wider">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Cellular Mechanism</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-sans">
                  {activeIngredient.cellularAction}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-luxury-espresso/60 border border-luxury-gold/20 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Clinical Efficacy</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  {activeIngredient.clinicalResults}
                </p>
              </div>
            </div>

            {/* Action to find matching formulations in store */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-xs font-mono text-white/50">
                Ready to experience this active in our formulations?
              </span>
              <button
                onClick={() => onSearchIngredient(activeIngredient.name.split(' ')[0])}
                className="px-5 py-2.5 rounded-full bg-luxury-gold/20 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-dark border border-luxury-gold/40 text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center space-x-2"
              >
                <span>Find Formulations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
