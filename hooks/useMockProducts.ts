
import { useState, useEffect } from 'react';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Gourmet Truffle Burger",
    price: 18.50,
    description: "Angus beef patty, truffle aioli, aged cheddar, and crispy onions on a brioche bun.",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    category: "Burger",
    rating: 4.7,
    deliveryTime: 30,
  },
  {
    id: 2,
    name: "Hyderabadi Chicken Biryani",
    price: 15.00,
    description: "Aromatic basmati rice cooked with tender chicken and authentic spices.",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop",
    category: "Biryani",
    rating: 4.8,
    deliveryTime: 45,
  },
  {
    id: 3,
    name: "Spicy Rigatoni Vodka",
    price: 22.50,
    description: "Perfectly cooked rigatoni in a creamy, spicy tomato vodka sauce.",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e326e20f545c?q=80&w=800&auto=format&fit=crop",
    category: "Pasta",
    rating: 4.8,
    deliveryTime: 25,
  },
  {
    id: 4,
    name: "Butter Chicken & Naan",
    price: 18.00,
    description: "Rich and creamy tomato curry served with garlic butter naan.",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=800&auto=format&fit=crop",
    category: "North Indian",
    rating: 4.9,
    deliveryTime: 40,
  },
  {
    id: 5,
    name: "Chicken Kathi Roll",
    price: 9.00,
    description: "Grilled chicken wrapped in a paratha with onions, peppers, and mint chutney.",
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop",
    category: "Rolls",
    rating: 4.5,
    deliveryTime: 20,
  },
  {
    id: 6,
    name: "Masala Dosa",
    price: 8.50,
    description: "Crispy rice crepe filled with spiced potato masala, served with sambar and chutney.",
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
    category: "Dosa",
    rating: 4.7,
    deliveryTime: 25,
  },
  {
    id: 7,
    name: "Steamed Chicken Momos",
    price: 10.00,
    description: "Tibetan style dumplings filled with minced chicken and spices.",
    imageUrl: "https://images.unsplash.com/photo-1625223007374-ee213c724a89?q=80&w=800&auto=format&fit=crop",
    category: "Momo",
    rating: 4.6,
    deliveryTime: 30,
  },
  {
    id: 8,
    name: "Neapolitan Margherita Pizza",
    price: 16.00,
    description: "Classic pizza with San Marzano tomato sauce, fresh mozzarella, and basil.",
    imageUrl: "https://images.unsplash.com/photo-1598021680133-eb8a25c15a3b?q=80&w=800&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.5,
    deliveryTime: 35,
  }
];

export const useMockProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { products, loading };
};
