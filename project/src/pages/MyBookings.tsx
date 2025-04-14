import { Calendar, MapPin } from 'lucide-react';

const MOCK_BOOKINGS = [
  {
    id: '1',
    hotelName: 'Grand Plaza Hotel',
    location: 'New York',
    checkIn: '2024-03-20',
    checkOut: '2024-03-25',
    guests: 2,
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    hotelName: 'Seaside Resort',
    location: 'Miami',
    checkIn: '2024-04-15',
    checkOut: '2024-04-20',
    guests: 3,
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export default function MyBookings() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      <div className="space-y-6">
        {MOCK_BOOKINGS.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={booking.image} 
                  alt={booking.hotelName} 
                  className="h-48 w-full object-cover md:h-full"
                />
              </div>
              
              <div className="p-6 md:w-2/3">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{booking.hotelName}</h2>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-gray-600">Check-in</label>
                    <div className="flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      <span>{booking.checkIn}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Check-out</label>
                    <div className="flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      <span>{booking.checkOut}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Guests</label>
                    <p className="mt-1">{booking.guests} Guests</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    View Details
                  </button>
                  {booking.status === 'pending' && (
                    <button className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}