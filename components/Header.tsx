import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBagIcon, SearchIcon, LogoutIcon, ChevronDownIcon, OfferIcon, UserIcon, LifeBuoyIcon, ReceiptIcon } from './Icons';
import Logo from './Logo';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogout: () => void;
  onViewOrders: () => void;
  onViewProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, searchTerm, onSearchChange, onLogout, onViewOrders, onViewProfile }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevCartItemCount = useRef(cartItemCount);

  useEffect(() => {
    if (cartItemCount > prevCartItemCount.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600); // Animation duration
      return () => clearTimeout(timer);
    }
    prevCartItemCount.current = cartItemCount;
  }, [cartItemCount]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`bg-surface sticky top-0 z-40 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#"><Logo className="h-9 text-primary-dark" /></a>
          <div className="hidden md:flex items-center space-x-2 cursor-pointer group">
            <span className="font-semibold text-text-primary border-b-2 border-transparent group-hover:border-text-primary transition-colors">Mumbai</span>
            <p className="text-text-secondary truncate max-w-[200px]">Maharashtra, India</p>
            <ChevronDownIcon className="h-5 w-5 text-primary"/>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-text-muted" />
                </div>
                <input
                    type="search"
                    placeholder="Search for food..."
                    value={searchTerm}
                    onChange={onSearchChange}
                    className="w-64 bg-background border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300"
                    aria-label="Search for food"
                />
            </div>
            <a href="#" className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors font-medium">
                <OfferIcon className="h-5 w-5" />
                <span>Offers</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors font-medium">
                <LifeBuoyIcon className="h-5 w-5" />
                <span>Help</span>
            </a>
             <button onClick={onViewProfile} className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors font-medium">
                <UserIcon className="h-5 w-5" />
                <span>Profile</span>
            </button>
            <button onClick={onViewOrders} className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors font-medium">
                <ReceiptIcon className="h-5 w-5" />
                <span>Orders</span>
            </button>
          </nav>

          <button 
            onClick={onCartClick}
            className={`relative flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors font-medium ${isAnimating ? 'animate-bounce-short' : ''}`}
            aria-label="Open shopping cart"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
           <button
            onClick={onLogout}
            className="hidden md:flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors font-medium"
            aria-label="Logout"
          >
            <LogoutIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;