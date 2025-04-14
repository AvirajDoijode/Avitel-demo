import { Star, MapPin, Heart } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import { useHotelStore } from '../store/hotelStore';

const MOCK_HOTELS = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    location: 'New York',
    price: 299,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
  },
  {
    id: '2',
    name: 'Seaside Resort',
    location: 'Miami',
    price: 399,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    amenities: ['Beach Access', 'Pool', 'Restaurant', 'Bar'],
  },
  {
    id: '3',
    name: 'Mountain View Lodge',
    location: 'Denver',
    price: 249,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    amenities: ['Free WiFi', 'Spa', 'Restaurant', 'Parking'],
  },
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const [filteredHotels, setFilteredHotels] = useState(MOCK_HOTELS);
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useHotelStore();

  const handleFilterChange = (filters: any) => {
    const filtered = MOCK_HOTELS.filter((hotel) => {
      const matchesPrice = hotel.price <= filters.priceRange[1];
      const matchesRating = filters.rating === 0 || hotel.rating >= filters.rating;
      const matchesAmenities =
        filters.amenities.length === 0 ||
        filters.amenities.every((amenity: string) =>
          hotel.amenities.includes(amenity)
        );

      return matchesPrice && matchesRating && matchesAmenities;
    });

    setFilteredHotels(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>

      <div className="flex gap-8">
        <FilterSidebar onFilterChange={handleFilterChange} />
        
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                  <button
                    onClick={() =>
                      isFavorite(hotel.id)
                        ? removeFromFavorites(hotel.id)
                        : addToFavorites(hotel.id)
                    }
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite(hotel.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>

                <Link
                  to={`/hotel/${hotel.id}?${searchParams.toString()}`}
                  className="block p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{hotel.name}</h2>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{hotel.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{hotel.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity) => (
                      <span 
                        key={amenity}
                        className="px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-indigo-600">${hotel.price}</div>
                    <span className="text-gray-500">per night</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}