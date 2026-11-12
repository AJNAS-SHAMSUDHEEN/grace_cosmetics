import React from 'react';

interface BeautyCategoriesProps {
  onSelectCategory: (categoryKey: string) => void;
}

export const BeautyCategories: React.FC<BeautyCategoriesProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'cosmetics',
      name: 'COSMETICS',
      filterCategory: 'Beauty Essentials',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'skincare',
      name: 'SKINCARE',
      filterCategory: 'Skincare',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'eye',
      name: 'EYE',
      filterCategory: 'Beauty Essentials',
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'hair',
      name: 'HAIR',
      filterCategory: 'Serums',
      image: 'https://images.unsplash.com/photo-1608248597359-00f722955f19?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'machines',
      name: 'MACHINES',
      filterCategory: 'Beauty Essentials',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="space-y-1.5 mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A] tracking-tight">
          Explore Beauty Categories
        </h2>
        <p className="text-sm text-[#666666] font-sans">
          Find everything you need, from everyday essentials to professional beauty favourites, all in one place.
        </p>
      </div>

      {/* 5 Rounded Category Cards in Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.filterCategory)}
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
            />
            {/* Soft gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

            {/* Bottom Centered All-Caps Label */}
            <div className="absolute bottom-4 left-0 right-0 text-center px-2">
              <span className="font-serif text-sm sm:text-base font-bold tracking-[0.15em] text-white drop-shadow-md">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

