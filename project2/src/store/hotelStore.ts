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
  description: string;
  cancellationPolicy: string;
}

interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  amenities: string[];
  description: string;
  availability: number;
}

interface SearchParams {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}

// Enhanced mock hotel data
const MOCK_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    location: 'New York',
    price: 299,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', '24/7 Room Service', 'Fitness Center'],
    description: 'Experience luxury at its finest in the heart of Manhattan. Featuring spectacular city views and world-class amenities.',
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in. After that, first night charge applies.',
    rooms: [
      {
        id: 'room1',
        name: 'Deluxe Room',
        price: 299,
        capacity: 2,
        amenities: ['King Bed', 'City View', 'Mini Bar', 'Free WiFi', 'Smart TV'],
        description: 'Modern room with city views and premium amenities',
        availability: 5
      },
      {
        id: 'room2',
        name: 'Executive Suite',
        price: 499,
        capacity: 3,
        amenities: ['King Bed', 'Living Room', 'Bathtub', 'City View', 'Mini Bar', 'Free WiFi', 'Work Desk'],
        description: 'Spacious suite with separate living area and premium amenities',
        availability: 3
      },
    ],
  },
  {
    id: '2',
    name: 'Seaside Resort',
    location: 'Miami',
    price: 399,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    amenities: ['Beach Access', 'Pool', 'Restaurant', 'Bar', 'Spa', 'Water Sports'],
    description: 'Luxurious beachfront resort offering stunning ocean views and world-class amenities.',
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in. After that, 50% charge applies.',
    rooms: [
      {
        id: 'room3',
        name: 'Ocean View Room',
        price: 399,
        capacity: 2,
        amenities: ['Queen Bed', 'Ocean View', 'Balcony', 'Free WiFi', 'Mini Bar'],
        description: 'Comfortable room with private balcony and ocean views',
        availability: 4
      },
      {
        id: 'room4',
        name: 'Beach Suite',
        price: 599,
        capacity: 4,
        amenities: ['2 Queen Beds', 'Ocean View', 'Kitchen', 'Balcony', 'Free WiFi', 'Living Room'],
        description: 'Luxurious suite perfect for families or longer stays',
        availability: 2
      },
    ],
  },
  {
    id: '3',
    name: 'Mountain Lodge Resort',
    location: 'Aspen',
    price: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1520643187271-06df1162815e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    amenities: ['Ski-in/Ski-out', 'Spa', 'Restaurant', 'Bar', 'Fitness Center', 'Hot Tub'],
    description: 'Premium mountain resort offering direct ski access and breathtaking alpine views.',
    cancellationPolicy: 'Free cancellation up to 72 hours before check-in. After that, full charge applies.',
    rooms: [
      {
        id: 'room5',
        name: 'Mountain View Room',
        price: 599,
        capacity: 2,
        amenities: ['King Bed', 'Mountain View', 'Fireplace', 'Free WiFi', 'Mini Bar'],
        description: 'Cozy room with stunning mountain views and fireplace',
        availability: 3
      },
      {
        id: 'room6',
        name: 'Alpine Suite',
        price: 899,
        capacity: 4,
        amenities: ['2 King Beds', 'Mountain View', 'Kitchen', 'Fireplace', 'Private Hot Tub'],
        description: 'Luxury suite with private hot tub and panoramic mountain views',
        availability: 1
      },
    ],
  },
  {
    id: '4',
    name: 'Desert Oasis Resort',
    location: 'Dubai',
    price: 799,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Pool', 'Spa', 'Desert Tours', '24/7 Butler', 'Helipad', 'Fine Dining'],
    description: 'Exclusive desert resort offering ultimate luxury and privacy in the Arabian desert.',
    cancellationPolicy: 'Free cancellation up to 7 days before check-in. After that, 75% charge applies.',
    rooms: [
      {
        id: 'room7',
        name: 'Desert View Villa',
        price: 799,
        capacity: 2,
        amenities: ['King Bed', 'Private Pool', 'Desert View', 'Butler Service', 'Mini Bar'],
        description: 'Private villa with personal pool and desert views',
        availability: 2
      },
      {
        id: 'room8',
        name: 'Royal Desert Suite',
        price: 1299,
        capacity: 4,
        amenities: ['2 King Beds', 'Private Pool', 'Kitchen', 'Butler Service', 'Private Garden'],
        description: 'Ultimate luxury suite with private pool and garden',
        availability: 1
      },
    ],
  },
];

interface HotelStore {
  hotels: Hotel[];
  favorites: string[];
  loading: boolean;
  addToFavorites: (hotelId: string) => void;
  removeFromFavorites: (hotelId: string) => void;
  isFavorite: (hotelId: string) => boolean;
  searchHotels: (params: SearchParams) => Promise<Hotel[]>;
  getHotel: (id: string) => Hotel | undefined;
  updateRoomAvailability: (hotelId: string, roomId: string, change: number) => void;
}

export const useHotelStore = create<HotelStore>()(
  persist(
    (set, get) => ({
      hotels: MOCK_HOTELS,
      favorites: [],
      loading: false,
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
      searchHotels: async (params) => {
        set({ loading: true });
        try {
          let filteredHotels = [...MOCK_HOTELS];

          if (params.location) {
            filteredHotels = filteredHotels.filter((hotel) =>
              hotel.location.toLowerCase().includes(params.location!.toLowerCase())
            );
          }

          if (params.minPrice) {
            filteredHotels = filteredHotels.filter((hotel) => hotel.price >= params.minPrice!);
          }

          if (params.maxPrice) {
            filteredHotels = filteredHotels.filter((hotel) => hotel.price <= params.maxPrice!);
          }

          if (params.amenities && params.amenities.length > 0) {
            filteredHotels = filteredHotels.filter((hotel) =>
              params.amenities!.every((amenity) => hotel.amenities.includes(amenity))
            );
          }

          if (params.guests) {
            filteredHotels = filteredHotels.filter((hotel) =>
              hotel.rooms.some((room) => room.capacity >= params.guests!)
            );
          }

          return filteredHotels;
        } catch (error) {
          console.error('Error searching hotels:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },
      getHotel: (id) => {
        return get().hotels.find((hotel) => hotel.id === id);
      },
      updateRoomAvailability: (hotelId, roomId, change) => {
        set((state) => ({
          hotels: state.hotels.map((hotel) => {
            if (hotel.id === hotelId) {
              return {
                ...hotel,
                rooms: hotel.rooms.map((room) => {
                  if (room.id === roomId) {
                    return {
                      ...room,
                      availability: room.availability + change,
                    };
                  }
                  return room;
                }),
              };
            }
            return hotel;
          }),
        }));
      },
    }),
    {
      name: 'hotel-storage',
    }
  )
);