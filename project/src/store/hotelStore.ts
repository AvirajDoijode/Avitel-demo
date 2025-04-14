import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
  rooms: Room[];
}

interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  amenities: string[];
}

interface HotelStore {
  favorites: string[];
  addToFavorites: (hotelId: string) => void;
  removeFromFavorites: (hotelId: string) => void;
  isFavorite: (hotelId: string) => boolean;
}

export const useHotelStore = create<HotelStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (hotelId) => {
        set((state) => ({
          favorites: [...state.favorites, hotelId],
        }));
      },
      removeFromFavorites: (hotelId) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== hotelId),
        }));
      },
      isFavorite: (hotelId) => {
        return get().favorites.includes(hotelId);
      },
    }),
    {
      name: 'hotel-storage',
    }
  )
);