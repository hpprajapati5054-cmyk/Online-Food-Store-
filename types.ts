export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
  deliveryTime: number; // in minutes
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  items: CartItem[];
  bill: {
    itemTotal: number;
    deliveryFee: number;
    taxes: number;
    totalPrice: number;
  };
  estimatedTime: number;
  orderDate: string; // ISO string
}
