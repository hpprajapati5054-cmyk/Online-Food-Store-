import React from 'react';
import { Order } from '../types';
import Logo from './Logo';
import { ArrowLeftIcon } from './Icons';

interface OrdersPageProps {
  pastOrders: Order[];
  onBackToHome: () => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ pastOrders, onBackToHome }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-surface shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="h-9 text-primary-dark" />
          <button onClick={onBackToHome} className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text-primary mb-6 animate-fade-in">Your Past Orders</h1>
        {pastOrders.length === 0 ? (
          <div className="text-center bg-surface p-10 rounded-lg shadow animate-fade-in">
            <p className="text-text-secondary text-lg">You haven't placed any orders yet.</p>
            <p className="text-text-muted mt-2">Start exploring our menu to find your next favorite meal!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pastOrders.map((order, index) => (
              <div 
                key={index} 
                className="bg-surface rounded-lg shadow-md p-6 animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 mb-4">
                  <div>
                    <p className="font-bold text-lg text-text-primary">Order Placed</p>
                    <p className="text-sm text-text-secondary">{formatDate(order.orderDate)}</p>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="text-sm text-text-secondary">TOTAL</p>
                    <p className="font-bold text-lg text-text-primary">${order.bill.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                      <div className="flex-grow">
                        <p className="font-semibold text-text-primary">{item.name}</p>
                        <p className="text-sm text-text-muted">{item.quantity} x ${item.price.toFixed(2)}</p>
                      </div>
                      <p className="font-semibold text-text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Delivered
                    </span>
                    <button className="font-semibold text-primary border border-gray-300 rounded-md px-4 py-1.5 hover:bg-primary hover:text-white transition-all duration-200 active:scale-95">
                        Reorder
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;