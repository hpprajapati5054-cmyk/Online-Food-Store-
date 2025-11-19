
import React from 'react';

interface Category {
  name: string;
  imageUrl: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  // We filter out "All" for the visual carousel to match the screenshot style, but keep logic if needed
  const displayCategories = categories.filter(c => c.name !== 'All');

  return (
    <div className="my-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">Order our best food options</h2>
      </div>
      
      <div className="flex space-x-6 overflow-x-auto pb-6 custom-scrollbar">
        {displayCategories.map(({ name, imageUrl }, index) => (
          <button
            key={name}
            onClick={() => onSelectCategory(name === selectedCategory ? 'All' : name)}
            className={`flex-shrink-0 flex flex-col items-center space-y-2 group focus:outline-none animate-slide-in-up`}
            style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
            aria-label={`Filter by ${name}`}
          >
            <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105 ${selectedCategory === name ? 'ring-4 ring-primary ring-offset-2' : ''}`}>
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            </div>
            <span className={`text-sm md:text-base font-medium whitespace-nowrap ${selectedCategory === name ? 'text-primary font-bold' : 'text-text-secondary'}`}>
                {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
