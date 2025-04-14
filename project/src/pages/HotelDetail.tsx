import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Coffee, Wifi, School as Pool, Utensils, Heart } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import { useHotelStore } from '../store/hotelStore';

const MOCK_HOTEL = {
  id: '1',
  name: 'Grand Plaza Hotel',
  location: 'New York',
  price: 299,
  rating: 4.5,
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
  description: 'Experience luxury at its finest in the heart of the city. Our hotel offers spectacular views, world-class amenities, and unparalleled service.',
  rooms: [
    {
      id: 'room1',
      name: 'Deluxe Room',
      price: 299,
      capacity: 2,
      amenities: ['King Bed', 'City View', 'Mini Bar', 'Free WiFi'],
    },
    {
      id: 'room2',
      name: 'Executive Suite',
      price: 499,
      capacity: 3,
      amenities: ['King Bed', 'Living Room', 'Bathtub', 'City View', 'Mini Bar', 'Free WiFi'],
    },
    {
      id: 'room3',
      name: 'Presidential Suite',
      price: 899,
      capacity: 4,
      amenities: ['2 King Beds', 'Living Room', 'Private Terrace', 'Bathtub', 'City View', 'Mini Bar', 'Free WiFi'],
    },
  ],
};

export default function HotelDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useHotelStore();

  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || '1';

  const handleBook = () => {
    if (!selectedRoom) return;

    const selectedRoomDetails = MOCK_HOTEL.rooms.find(
      (room) => room.id === selectedRoom
    );

    setIsBooking(true);
    navigate('/checkout', {
      state: {
        hotel: MOCK_HOTEL,
        room: selectedRoomDetails,
        checkIn,
        checkOut,
        guests: parseInt(guests),
        totalPrice: selectedRoomDetails ? selectedRoomDetails.price : MOCK_HOTEL.price,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative">
            <img
              src={MOCK_HOTEL.image}
              alt={MOCK_HOTEL.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <button
              onClick={() =>
                isFavorite(MOCK_HOTEL.id)
                  ? removeFromFavorites(MOCK_HOTEL.id)
                  : addToFavorites(MOCK_HOTEL.id)
              }
              className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite(MOCK_HOTEL.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Wifi className="w-5 h-5 text-indigo-600" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Pool className="w-5 h-5 text-indigo-600" />
                <span>Swimming Pool</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee className="w-5 h-5 text-indigo-600" />
                <span>Coffee Shop</span>
              </div>
              <div className="flex items-center space-x-2">
                <Utensils className="w-5 h-5 text-indigo-600" />
                <span>Restaurant</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{MOCK_HOTEL.name}</h1>
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="ml-1 text-xl">{MOCK_HOTEL.rating}</span>
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{MOCK_HOTEL.location}</span>
            </div>

            <p className="text-gray-600 mb-6">{MOCK_HOTEL.description}</p>

            <div className="border-t border-gray-200 py-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Check-in</span>
                <span className="font-semibold">{checkIn}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Check-out</span>
                <span className="font-semibold">{checkOut}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Guests</span>
                <span className="font-semibold">{guests}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Select Your Room</h2>
              {MOCK_HOTEL.rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  selected={selectedRoom === room.id}
                  onSelect={setSelectedRoom}
                />
              ))}
            </div>

            <button
              onClick={handleBook}
              disabled={!selectedRoom || isBooking}
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
            >
              {isBooking ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}