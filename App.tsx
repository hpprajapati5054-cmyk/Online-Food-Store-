
import React, { useState, useEffect, useCallback } from 'react';
import { Product, CartItem, Order } from './types';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import AIGenerator from './components/AIGenerator';
import { useMockProducts } from './hooks/useMockProducts';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import CategoryFilter from './components/CategoryFilter';
import GrocerySection from './components/GrocerySection';
import DineoutSection from './components/DineoutSection';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import OrdersPage from './components/OrdersPage';
import ProfilePage from './components/ProfilePage';

// Updated to match screenshot categories
const categoryImageMap: Record<string, string> = {
    "Burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
    "Pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop",
    "Biryani": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400&auto=format&fit=crop",
    "North Indian": "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=400&auto=format&fit=crop",
    "Pasta": "https://images.unsplash.com/photo-1621996346565-e326e20f545c?q=80&w=400&auto=format&fit=crop",
    "Rolls": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=400&auto=format&fit=crop",
    "Dosa": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400&auto=format&fit=crop",
    "Momo": "https://images.unsplash.com/photo-1625223007374-ee213c724a89?q=80&w=400&auto=format&fit=crop",
};

type View = 'login' | 'home' | 'checkout' | 'confirmation' | 'orders' | 'profile';

const App: React.FC = () => {
  const { products, loading: productsLoading } = useMockProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<View>('login');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [latestOrderDetails, setLatestOrderDetails] = useState<Order | null>(null);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('foodStoreOrders');
    if (storedOrders) {
      setPastOrders(JSON.parse(storedOrders));
    }
  }, []);

  // Manually defining category order to match the screenshot vibe
  const categories = React.useMemo(() => {
    const desiredOrder = ["Burger", "Pizza", "Biryani", "North Indian", "Pasta", "Rolls", "Dosa", "Momo"];
    
    return desiredOrder.map(name => ({
        name,
        imageUrl: categoryImageMap[name] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop'
    }));
  }, []);

  useEffect(() => {
    if (!productsLoading) {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = products.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(lowercasedFilter) ||
                              product.category.toLowerCase().includes(lowercasedFilter);
        return matchesCategory && matchesSearch;
      });
      setFilteredProducts(filtered);
    }
  }, [searchTerm, selectedCategory, products, productsLoading]);
  
  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === product.id);
      if (itemIndex > -1) {
        const newItems = [...prevItems];
        newItems[itemIndex].quantity += 1;
        return newItems;
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const billDetails = React.useMemo(() => {
    const itemTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = itemTotal > 0 ? 5.00 : 0;
    const taxes = itemTotal * 0.1;
    const totalPrice = itemTotal + deliveryFee + taxes;
    return { itemTotal, deliveryFee, taxes, totalPrice };
  }, [cartItems]);
  
  const estimatedDeliveryTime = React.useMemo(() => {
    if (cartItems.length === 0) return 0;
    return Math.max(...cartItems.map(item => item.deliveryTime));
  }, [cartItems]);

  const cartTotalQuantity = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const handleLoginSuccess = () => setView('home');
  const handleLogout = () => {
    setView('login');
    setCartItems([]);
    setPastOrders([]);
    localStorage.removeItem('foodStoreOrders');
  };
  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
  };
  
  const handlePlaceOrder = () => {
    const newOrder: Order = {
      items: cartItems,
      bill: billDetails,
      estimatedTime: estimatedDeliveryTime,
      orderDate: new Date().toISOString(),
    };
    setLatestOrderDetails(newOrder);
    const updatedOrders = [newOrder, ...pastOrders];
    setPastOrders(updatedOrders);
    localStorage.setItem('foodStoreOrders', JSON.stringify(updatedOrders));
    setCartItems([]);
    setView('confirmation');
  };

  const handleBackToHome = () => setView('home');
  const handleViewOrders = () => setView('orders');
  const handleViewProfile = () => setView('profile');

  if (view === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }
  
  if (view === 'checkout') {
      return <CheckoutPage 
          cartItems={cartItems} 
          billDetails={billDetails}
          estimatedDeliveryTime={estimatedDeliveryTime}
          onPlaceOrder={handlePlaceOrder}
          onBackToShopping={handleBackToHome}
      />;
  }
  
  if (view === 'confirmation') {
      return <OrderConfirmationPage 
          orderDetails={latestOrderDetails}
          onBackToHome={handleBackToHome}
      />;
  }
  
  if (view === 'orders') {
      return <OrdersPage pastOrders={pastOrders} onBackToHome={handleBackToHome} />;
  }
  
  if (view === 'profile') {
      return <ProfilePage 
        onBackToHome={handleBackToHome}
        onViewOrders={handleViewOrders}
        onLogout={handleLogout}
      />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        cartItemCount={cartTotalQuantity}
        onCartClick={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={e => setSearchTerm(e.target.value)}
        onLogout={handleLogout}
        onViewOrders={handleViewOrders}
        onViewProfile={handleViewProfile}
      />
      <main className="container mx-auto px-4 pt-4 pb-12 flex-grow space-y-8">
        
        {/* Section 1: Food Categories (The Carousel) */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Section 2: Groceries (Instamart) */}
        {selectedCategory === 'All' && !searchTerm && <GrocerySection />}

        {/* Section 3: Dineout */}
        {selectedCategory === 'All' && !searchTerm && <DineoutSection />}
        
        {/* Divider for AI Chef */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* AI Generator - The "Customized" aspect */}
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Customize Your Meal</h2>
            <AIGenerator onAddToCart={handleAddToCart} />
        </div>

        {/* Main Product Feed */}
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">
                {selectedCategory === 'All' 
                    ? 'Restaurants with online food delivery' 
                    : `Best ${selectedCategory} near you`
                }
            </h2>
            
            {productsLoading ? (
                <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-text-secondary">Loading delicious food...</p>
                </div>
            ) : (
                <ProductGrid 
                products={filteredProducts}
                cartItems={cartItems}
                onAddToCart={handleAddToCart} 
                onUpdateQuantity={handleUpdateQuantity}
                />
            )}
        </div>
      </main>
      <Footer />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        billDetails={billDetails}
      />
    </div>
  );
};

export default App;
