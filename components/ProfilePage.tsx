import React from 'react';
import { UserIcon, ReceiptIcon, LifeBuoyIcon, LogoutIcon, ArrowLeftIcon } from './Icons';
import Logo from './Logo';

interface ProfilePageProps {
  onBackToHome: () => void;
  onViewOrders: () => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBackToHome, onViewOrders, onLogout }) => {
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

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-surface rounded-lg shadow-md p-6 sm:p-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
            <div className="relative mb-4 sm:mb-0">
              <img
                className="h-24 w-24 rounded-full object-cover ring-4 ring-primary"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                alt="User profile"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-text-primary">Foodie Allen</h1>
              <p className="text-text-secondary">foodie.allen@example.com</p>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Account Settings</h2>
            <div className="space-y-2">
              <button
                onClick={onViewOrders}
                className="w-full flex items-center p-4 rounded-lg text-left text-text-primary hover:bg-gray-100 transition-colors active:bg-gray-200"
              >
                <ReceiptIcon className="h-6 w-6 mr-4 text-primary" />
                <span className="font-medium">My Orders</span>
              </button>
              <a
                href="#"
                className="w-full flex items-center p-4 rounded-lg text-left text-text-primary hover:bg-gray-100 transition-colors active:bg-gray-200"
              >
                <LifeBuoyIcon className="h-6 w-6 mr-4 text-primary" />
                <span className="font-medium">Help & Support</span>
              </a>
              <button
                onClick={onLogout}
                className="w-full flex items-center p-4 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors active:bg-red-100"
              >
                <LogoutIcon className="h-6 w-6 mr-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;