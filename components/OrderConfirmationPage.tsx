import React from 'react';
import { CheckCircleIcon } from './Icons';

interface OrderConfirmationPageProps {
  orderDetails: any;
  onBackToHome: () => void;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderDetails, onBackToHome }) => {
  if (!orderDetails) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Something went wrong.</h2>
            <p className="text-text-secondary mb-6">We couldn't find your order details.</p>
            <button
            onClick={onBackToHome}
            className="bg-primary-dark text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors"
            >
                Back to Home
            </button>
        </div>
    )
  }

  const { estimatedTime, bill } = orderDetails;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4 animate-fade-in">
        <CheckCircleIcon className="w-24 h-24 text-secondary mb-4 animate-pop-in"/>
        <h1 className="text-4xl font-bold font-serif text-text-primary mb-2 animate-slide-in-up" style={{ animationDelay: '150ms', opacity: 0 }}>Order Placed Successfully!</h1>
        <p className="text-lg text-text-secondary max-w-md mb-6 animate-slide-in-up" style={{ animationDelay: '250ms', opacity: 0 }}>
            Thank you for your order. Your delicious food is being prepared and will be delivered to your doorstep.
        </p>

        <div className="bg-surface rounded-lg shadow-lg p-6 w-full max-w-sm mb-8 animate-slide-in-up" style={{ animationDelay: '350ms', opacity: 0 }}>
            <h3 className="font-bold text-lg text-text-primary mb-4 border-b pb-2">Order Summary</h3>
            <div className="space-y-2 text-left">
                <p className="flex justify-between text-text-secondary">
                    <span>Total Amount Paid:</span>
                    <span className="font-semibold text-text-primary">${bill.totalPrice.toFixed(2)}</span>
                </p>
                 <p className="flex justify-between text-text-secondary">
                    <span>Estimated Delivery:</span>
                    <span className="font-semibold text-text-primary">{estimatedTime} mins</span>
                </p>
            </div>
        </div>

        <button
            onClick={onBackToHome}
            className="bg-primary-dark text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors animate-slide-in-up active:scale-95"
            style={{ animationDelay: '450ms', opacity: 0 }}
        >
            Continue Shopping
        </button>
    </div>
  );
};

export default OrderConfirmationPage;