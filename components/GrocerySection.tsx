
import React from 'react';

const GrocerySection: React.FC = () => {
  const groceryItems = [
    { name: "Fresh Vegetables", img: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=300&auto=format&fit=crop" },
    { name: "Fresh Fruits", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=300&auto=format&fit=crop" },
    { name: "Dairy, Bread and Eggs", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=300&auto=format&fit=crop" },
    { name: "Rice, Atta and Dals", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300&auto=format&fit=crop" },
    { name: "Masalas", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop" },
  ];

  return (
    <div className="my-10 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-5 tracking-tight">Shop groceries on Instamart</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {groceryItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center group cursor-pointer">
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 shadow-sm relative">
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
            </div>
            <span className="mt-3 text-center text-sm md:text-base font-semibold text-text-secondary group-hover:text-primary transition-colors px-2 leading-tight">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrocerySection;
