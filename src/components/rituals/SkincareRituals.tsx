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
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'serum',
      stepNumber: '03',
      title: 'SERUM',
      category: 'Serums',
      image: '/products/abib-glutathiosome-dark-spot-serum.jpg',
    },
    {
      id: 'toner',
      stepNumber: '04',
      title: 'TONER / PAD',
      category: 'Skincare',
      image: '/products/abib-glutathiosome-dark-spot-pad.jpg',
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
      title: 'LIP & NIGHT CARE',
      category: 'Beauty Essentials',
      image: 'https://images.unsplash.com/photo-1512290900672-1f4175655557?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="rituals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="space-y-1.5 mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E0A12] tracking-tight">
          Skincare Rituals
        </h2>
        <p className="text-sm text-[#7A646E] font-sans">
          Elevate your daily regimen with authentic K-Beauty & dermatological steps.
        </p>
      </div>

      {/* 6 Step Cards in a row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {rituals.map((r) => (
          <div
            key={r.id}
            onClick={() => onSelectStep(r.category)}
            className="group rounded-2xl overflow-hidden bg-[#FDF7F8] border border-[#EED9DF] p-3 text-center cursor-pointer hover:border-[#701A33] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Pill Step Label */}
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#701A33] border border-[#E8BEC5] shadow-xs">
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
