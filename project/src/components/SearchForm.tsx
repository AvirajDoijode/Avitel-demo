import { Calendar, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams as any);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="date"
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              value={searchParams.checkIn}
              onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="date"
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              value={searchParams.checkOut}
              onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="number"
              min="1"
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              value={searchParams.guests}
              onChange={(e) => setSearchParams({ ...searchParams, guests: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Search Hotels
      </button>
    </form>
  );
}