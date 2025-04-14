import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  image: string;
  location: string;
}

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  getBooking: (id: string) => Booking | undefined;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) => {
        set((state) => ({
          bookings: [...state.bookings, booking],
        }));
      },
      updateBooking: (id, updates) => {
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, ...updates } : booking
          ),
        }));
      },
      deleteBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== id),
        }));
      },
      getBooking: (id) => {
        return get().bookings.find((booking) => booking.id === id);
      },
    }),
    {
      name: 'booking-storage',
    }
  )
);