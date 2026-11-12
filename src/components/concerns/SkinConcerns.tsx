import React from 'react';

interface SkinConcernsProps {
  selectedConcern: string | null;
  onSelectConcern: (concernName: string) => void;
}

export const SkinConcerns: React.FC<SkinConcernsProps> = ({
  selectedConcern,
  onSelectConcern,
}) => {
  const concerns = [
    {
      id: 'acne',
      name: 'Acne',
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'pigmentation',
      name: 'Pigmentation & dark spots',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dullness',
      name: 'Dull skin',
      image: 'https://images.unsplash.com/photo-1512290900672-1f4175655557?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tan',
      name: 'Tan',
      image: 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dryness',
      name: 'Dryness',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'wrinkles',
      name: 'Wrinkles',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section id="concerns" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="space-y-1.5 mb-10">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A] tracking-tight">
          Find the Right Care for Your Skin
        </h2>
        <p className="text-sm text-[#666666] font-sans">
          From acne and dark spots to dullness, tan and dryness, explore skincare solutions designed for your skin's needs.
        </p>
      </div>

      {/* 6 Circular Concerns Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-4 text-center">
        {concerns.map((c) => {
          const isSelected = selectedConcern === c.name;
          return (
            <div
              key={c.id}
              onClick={() => onSelectConcern(isSelected ? '' : c.name)}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Circular Image Container with Soft Lavender Disc */}
              <div
                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 transition-all duration-300 ${
                  isSelected
                    ? 'ring-3 ring-lumiere-purple scale-105 shadow-md'
                    : 'group-hover:scale-105 group-hover:shadow-md'
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-[#EFEBF7] border border-[#E0D8ED]">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Concern Name */}
              <span
                className={`text-xs font-medium mt-3 transition-colors ${
                  isSelected
                    ? 'text-lumiere-purple font-semibold'
                    : 'text-[#4A4A4A] group-hover:text-lumiere-purple'
                }`}
              >
                {c.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

