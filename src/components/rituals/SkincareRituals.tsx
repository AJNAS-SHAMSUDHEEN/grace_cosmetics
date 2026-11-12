import React from 'react';

interface SkincareRitualsProps {
  onSelectStep: (stepName: string) => void;
}

export const SkincareRituals: React.FC<SkincareRitualsProps> = ({ onSelectStep }) => {
  const rituals = [
    {
      id: 'cleanser',
      stepNumber: '01',
      title: 'CLEANSER',
      category: 'Cleansers',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'sunscreen',
      stepNumber: '02',
      title: 'SUNSCREEN',
      category: 'Sunscreen',
      image: 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'serum',
      stepNumber: '03',
      title: 'SERUM',
      category: 'Serums',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'toner',
      stepNumber: '04',
      title: 'TONER',
      category: 'Skincare',
      image: 'https://images.unsplash.com/photo-1608248597359-00f722955f19?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'moisturizer',
      stepNumber: '05',
      title: 'FACE MOISTURIZER',
      category: 'Moisturizers',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'nightcream',
      stepNumber: '06',
      title: 'NIGHT CREAM',
      category: 'Face Masks',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="rituals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="space-y-1.5 mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A] tracking-tight">
          Skincare Rituals
        </h2>
        <p className="text-sm text-[#666666] font-sans">
          Elevate your daily regimen with high-performance transformative formulas.
        </p>
      </div>

      {/* 6 Step Cards in a row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {rituals.map((r) => (
          <div
            key={r.id}
            onClick={() => onSelectStep(r.category)}
            className="group rounded-2xl overflow-hidden bg-[#F3EEFA] border border-[#E4D9F5] p-3 text-center cursor-pointer hover:border-lumiere-purple hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Pill Step Label */}
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5B4296] border border-[#E2D6F5] shadow-xs">
                {r.title}
              </span>
            </div>

            {/* Product Image on Pedestal */}
            <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden bg-white/70 p-2 flex items-center justify-center">
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-full object-cover rounded-lg transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
