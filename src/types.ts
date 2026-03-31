export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Chinese' | 'Indian' | 'Combos' | 'Snacks' | 'Desserts' | 'Beverages';
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface RestaurantInfo {
  name: string;
  rating: number;
  reviewsCount: number;
  category: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  socials: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
}
