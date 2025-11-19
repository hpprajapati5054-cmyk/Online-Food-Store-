import React from 'react';
import { CartItem } from '../types';
import { XIcon, PlusIcon, MinusIcon } from './Icons';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onCheckout: () => void;
  billDetails: {
    itemTotal: number;
    deliveryFee: number;
    taxes: number;
    totalPrice: number;
  }
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, onRemoveFromCart, onUpdateQuantity, onCheckout, billDetails }) => {
  const { itemTotal, deliveryFee, taxes, totalPrice } = billDetails;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b bg-surface">
            <h2 className="text-xl font-bold text-text-primary">Your Cart</h2>
            <button onClick={onClose} className="text-text-secondary hover:text-text-primary" aria-label="Close cart">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="flex-grow flex items-center justify-center animate-fade-in">
              <div className='text-center'>
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="Empty Cart" className="w-64 h-64 mx-auto"/>
                <h3 className='mt-4 text-lg font-bold'>Your cart is empty</h3>
                <p className="text-text-secondary text-sm">You can go to home page to view more restaurants</p>
              </div>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-4 bg-surface">
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex items-start py-4 border-b last:border-b-0 space-x-4 animate-slide-in-up"
                  style={{ animationDelay: `${index * 75}ms`, opacity: 0 }}
                >
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-text-primary text-md mb-1">{item.name}</h3>
                    <div className="flex items-center mt-2 space-x-3">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded-md hover:bg-gray-100 transition-colors active:scale-90"><MinusIcon className="h-4 w-4"/></button>
                        <span className="px-3 font-bold text-primary">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded-md hover:bg-gray-100 transition-colors active:scale-90"><PlusIcon className="h-4 w-4"/></button>
                    </div>
                  </div>
                  <div className='text-right flex-shrink-0'>
                    <p className="font-semibold text-text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => onRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700 transition-colors text-xs mt-2" aria-label={`Remove ${item.name}`}>
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="p-4 bg-surface border-t-2 mt-auto animate-fade-in">
              <h4 className="font-bold mb-2 text-text-primary">Bill Details</h4>
              <div className="space-y-1 text-sm text-text-secondary">
                <div className="flex justify-between"><span>Item Total</span> <span>${itemTotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Delivery Fee</span> <span>${deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Taxes and Charges</span> <span>${taxes.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-text-primary text-base pt-2"><span>TO PAY</span> <span>${totalPrice.toFixed(2)}</span></div>
              </div>

              <button 
                onClick={onCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-primary-dark text-white py-3 mt-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95">
                PROCEED TO CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;