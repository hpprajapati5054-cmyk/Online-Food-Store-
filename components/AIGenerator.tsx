import React, { useState, useCallback } from 'react';
import { generateDishOfTheDay } from '../services/geminiService';
import { Product } from '../types';
import { SparklesIcon, PlusIcon } from './Icons';

interface AIGeneratorProps {
    onAddToCart: (product: Product) => void;
}

interface GeneratedDish {
    dishName: string;
    description: string;
    ingredients: string[];
    price: number;
    category: string;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ onAddToCart }) => {
  const [generatedDish, setGeneratedDish] = useState<GeneratedDish | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preference, setPreference] = useState('');

  const handleGenerateDish = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedDish(null);
    try {
      const dish = await generateDishOfTheDay(preference);
      setGeneratedDish(dish);
    } catch (e) {
      setError('Sorry, we couldn\'t create a dish right now. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [preference]);

  const handleAddToCart = () => {
    if (generatedDish) {
        const product: Product = {
            id: Math.floor(Math.random() * 10000) + 1000, // temp ID
            name: generatedDish.dishName,
            price: generatedDish.price,
            description: generatedDish.description,
            imageUrl: `https://source.unsplash.com/400x300/?${generatedDish.dishName.split(' ').join(',')}`,
            category: generatedDish.category,
            rating: Math.random() * (5 - 4) + 4, // Random rating between 4.0 and 5.0
            deliveryTime: Math.floor(Math.random() * (45 - 20 + 1)) + 20, // Random time between 20-45 mins
        };
        onAddToCart(product);
    }
  }

  return (
    <div className="bg-gradient-to-br from-primary-dark to-orange-400 rounded-xl p-6 md:p-8 text-white text-center shadow-2xl my-8 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-serif mb-4">Chef's AI Surprise</h2>
      <p className="max-w-2xl mx-auto mb-6 text-orange-100">Let our AI chef create a unique, delicious dish just for you! Add a preference to guide the chef.</p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="Any preferences? (e.g., 'spicy', 'vegan')"
          className="w-full sm:w-72 bg-white/20 border border-white/30 rounded-full py-3 px-6 text-white placeholder-orange-100 focus:outline-none focus:ring-2 focus:ring-white transition-all"
          aria-label="Dish preference"
        />
        <button 
          onClick={handleGenerateDish} 
          disabled={isLoading}
          className="bg-white text-primary-dark font-bold py-3 px-8 rounded-full inline-flex items-center space-x-2 hover:bg-orange-50 transition-transform duration-200 transform hover:scale-105 disabled:bg-gray-300 disabled:text-gray-500 disabled:scale-100 flex-shrink-0 active:scale-95"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-dark"></div>
              <span>Creating...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="h-6 w-6" />
              <span>Generate Dish</span>
            </>
          )}
        </button>
      </div>

      {error && <p className="mt-4 text-red-200">{error}</p>}

      {generatedDish && (
        <div className="mt-8 text-left bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start">
                <div>
                    <h3 className="text-2xl font-serif">{generatedDish.dishName}</h3>
                    <span className="text-sm font-semibold px-2 py-1 bg-secondary rounded-full mt-1 inline-block">{generatedDish.category}</span>
                    <p className="mt-2 max-w-prose text-orange-50">{generatedDish.description}</p>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6 text-center">
                    <p className="text-3xl font-bold">${generatedDish.price.toFixed(2)}</p>
                    <button onClick={handleAddToCart} className="mt-2 bg-secondary text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-emerald-600 transition-colors active:scale-95">
                        <PlusIcon className="h-5 w-5"/>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
          <h4 className="font-semibold mt-4 mb-2">Key Ingredients:</h4>
          <div className="flex flex-wrap gap-2">
            {generatedDish.ingredients.map((ing, i) => (
              <span key={i} className="text-sm bg-white text-primary-dark font-medium px-3 py-1 rounded-full">{ing}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGenerator;