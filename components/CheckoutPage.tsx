import React, { useState } from 'react';
import { CartItem } from '../types';
import Logo from './Logo';
import { ArrowLeftIcon, CreditCardIcon, CashIcon, UpiIcon } from './Icons';

interface CheckoutPageProps {
  cartItems: CartItem[];
  billDetails: {
    itemTotal: number;
    deliveryFee: number;
    taxes: number;
    totalPrice: number;
  };
  estimatedDeliveryTime: number;
  onPlaceOrder: () => void;
  onBackToShopping: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, billDetails, estimatedDeliveryTime, onPlaceOrder, onBackToShopping }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePlaceOrder = () => {
    if (paymentMethod) {
      onPlaceOrder();
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-surface shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="h-9 text-primary-dark" />
          <button onClick={onBackToShopping} className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Shopping</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left/Main Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Address */}
            <div className="bg-surface rounded-lg shadow p-6 animate-slide-in-up" style={{ animationDelay: '100ms', opacity: 0 }}>
              <h2 className="text-xl font-bold text-text-primary mb-4">Delivery Address</h2>
              <div className="p-4 border rounded-md bg-orange-50/50">
                <p className="font-semibold text-text-primary">Home</p>
                <p className="text-text-secondary">123 Foodie Lane, Flavor Town, 400053, Maharashtra, India</p>
                <button className="text-primary font-semibold mt-2 text-sm hover:underline">Change Address</button>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-surface rounded-lg shadow p-6 animate-slide-in-up" style={{ animationDelay: '200ms', opacity: 0 }}>
              <h2 className="text-xl font-bold text-text-primary mb-4">Choose Payment Method</h2>
              <div className="space-y-4">
                <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${paymentMethod === 'card' ? 'ring-2 ring-primary bg-orange-50/50' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value)} className="h-4 w-4 text-primary focus:ring-primary"/>
                  <CreditCardIcon className="h-6 w-6 mx-4 text-text-secondary" />
                  <span className="font-semibold text-text-primary">Credit/Debit Card</span>
                </label>
                <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${paymentMethod === 'upi' ? 'ring-2 ring-primary bg-orange-50/50' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={e => setPaymentMethod(e.target.value)} className="h-4 w-4 text-primary focus:ring-primary"/>
                  <UpiIcon className="h-6 w-6 mx-4 text-text-secondary" />
                  <span className="font-semibold text-text-primary">UPI</span>
                </label>
                <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${paymentMethod === 'cod' ? 'ring-2 ring-primary bg-orange-50/50' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={e => setPaymentMethod(e.target.value)} className="h-4 w-4 text-primary focus:ring-primary"/>
                  <CashIcon className="h-6 w-6 mx-4 text-text-secondary" />
                  <span className="font-semibold text-text-primary">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right/Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-lg shadow p-6 sticky top-24 animate-slide-in-up" style={{ animationDelay: '300ms', opacity: 0 }}>
              <h2 className="text-xl font-bold text-text-primary mb-4">Your Order</h2>
              <div className="max-h-64 overflow-y-auto pr-2 space-y-3">
                {cartItems.map(item => (
                   <div key={item.id} className="flex justify-between items-center text-sm">
                      <span className="text-text-primary truncate pr-4">{item.quantity} x {item.name}</span>
                      <span className="font-semibold text-text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                   </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                  <h4 className="font-bold mb-2 text-text-primary">Bill Details</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <div className="flex justify-between"><span>Item Total</span> <span>${billDetails.itemTotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Delivery Fee</span> <span>${billDetails.deliveryFee.toFixed(2)}</span></div>
                    <div className="flex justify-between border-b pb-2"><span>Taxes and Charges</span> <span>${billDetails.taxes.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-text-primary text-base pt-2"><span>TO PAY</span> <span>${billDetails.totalPrice.toFixed(2)}</span></div>
                  </div>
              </div>
              
              <div className="mt-4 text-center bg-green-100 text-green-800 p-2 rounded-md text-sm font-semibold">
                Estimated Delivery Time: {estimatedDeliveryTime} minutes
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={!paymentMethod}
                className="w-full bg-primary-dark text-white py-3 mt-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95">
                Place Order & Pay
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;