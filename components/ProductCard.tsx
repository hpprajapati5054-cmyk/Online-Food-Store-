import React from 'react';
import { Product } from '../types';
import { PlusIcon, MinusIcon, StarIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  animationDelay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, cartQuantity, onAddToCart, onUpdateQuantity, animationDelay = 0 }) => {
  return (
    <div 
      className="bg-surface rounded-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-in-up"
      style={{ animationDelay: `${animationDelay}ms`, opacity: 0 }}
    >
      <div className="relative w-full overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text-primary mb-1 truncate">{product.name}</h3>
        <p className="text-sm text-text-secondary flex-grow mb-3">{product.category}</p>
        
        <div className="flex items-center text-sm text-text-secondary font-medium mb-4">
            <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-md ${product.rating >= 4 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                <StarIcon className="h-4 w-4" />
                <span>{product.rating.toFixed(1)}</span>
            </div>
            <span className="mx-2">•</span>
            <span>{product.deliveryTime} MINS</span>
        </div>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <p className="text-xl font-bold text-text-primary">${product.price.toFixed(2)}</p>
          
          <div className="flex items-center">
            {cartQuantity === 0 ? (
              <button 
                onClick={() => onAddToCart(product)}
                className="font-bold text-primary border border-gray-300 rounded-md px-8 py-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
                aria-label={`Add ${product.name} to cart`}
              >
                ADD
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                 <button 
                  onClick={() => onUpdateQuantity(product.id, cartQuantity - 1)} 
                  className="font-bold text-primary border border-gray-300 rounded-md p-2 hover:bg-primary hover:text-white transition-colors duration-200 active:scale-95"
                  aria-label="Decrease quantity"
                  >
                      <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="font-bold text-lg text-primary w-8 text-center">{cartQuantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(product.id, cartQuantity + 1)}
                    className="font-bold text-primary border border-gray-300 rounded-md p-2 hover:bg-primary hover:text-white transition-colors duration-200 active:scale-95"
                    aria-label="Increase quantity"
                  >
                      <PlusIcon className="h-4 w-4" />
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;