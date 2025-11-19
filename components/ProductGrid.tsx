import React from 'react';
import { Product, CartItem } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onUpdateQuantity, cartItems }) => {
  if (products.length === 0) {
    return <div className="text-center text-text-secondary py-10">No products found. Try a different search!</div>;
  }
  
  const getCartItemQuantity = (productId: number) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
          onUpdateQuantity={onUpdateQuantity}
          cartQuantity={getCartItemQuantity(product.id)}
          animationDelay={index * 100}
        />
      ))}
    </div>
  );
};

export default ProductGrid;