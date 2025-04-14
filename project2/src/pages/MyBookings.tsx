import { Calendar, MapPin, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { useBookingStore } from '../store/bookingStore';

export default function MyBookings() {
  const { bookings, updateBooking, deleteBooking } = useBookingStore();
  const [editingBooking, setEditingBooking] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const handleEdit = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      setEditForm({
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
      });
      setEditingBooking(bookingId);
    }
  };

  const handleSave = (bookingId: string) => {
    updateBooking(bookingId, {
      ...editForm,
      status: 'confirmed',
    });
    setEditingBooking(null);
  };

  const handleCancel = (bookingId: string) => {
    updateBooking(bookingId, { status: 'cancelled' });
  };

  const handleDelete = (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(bookingId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
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
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                {editingBooking === booking.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600">Check-in</label>
                        <input
                          type="date"
                          value={editForm.checkIn}
                          onChange={(e) => setEditForm({ ...editForm, checkIn: e.target.value })}
                          className="mt-1 w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Check-out</label>
                        <input
                          type="date"
                          value={editForm.checkOut}
                          onChange={(e) => setEditForm({ ...editForm, checkOut: e.target.value })}
                          className="mt-1 w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Guests</label>
                        <input
                          type="number"
                          min="1"
                          value={editForm.guests}
                          onChange={(e) => setEditForm({ ...editForm, guests: parseInt(e.target.value) })}
                          className="mt-1 w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleSave(booking.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingBooking(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
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
                      {booking.status !== 'cancelled' && (
                        <>
                          <button
                            onClick={() => handleEdit(booking.id)}
                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit Booking
                          </button>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
                          >
                            Cancel Booking
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}