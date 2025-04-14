export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  image_url: string;
  amenities: string[];
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  hotel_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Booking {
  id: string;
  hotel_id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface SearchParams {
  location: string;
  check_in: string;
  check_out: string;
  guests: number;
  min_price?: number;
  max_price?: number;
  amenities?: string[];
}