
import React from 'react';

const DineoutSection: React.FC = () => {
  const restaurants = [
    { name: "Mooch Marod", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop", offer: "Flat 20% OFF" },
    { name: "The Golden Spoon", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop", offer: "Complimentary Drink" },
  ];

  return (
    <div className="my-10 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-5 tracking-tight">Discover best restaurants on Dineout</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 custom-scrollbar">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="flex-shrink-0 w-80 md:w-96 rounded-2xl overflow-hidden relative group cursor-pointer">
            <div className="h-48 md:h-56 w-full overflow-hidden">
                <img 
                    src={restaurant.img} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
              <h3 className="text-white font-bold text-xl">{restaurant.name}</h3>
              <span className="inline-block mt-1 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                {restaurant.offer}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DineoutSection;
