import { useState } from 'react';
import { Star, DollarSign } from 'lucide-react';

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
  });

  const amenitiesList = [
    'Free WiFi',
    'Pool',
    'Spa',
    'Restaurant',
    'Gym',
    'Bar',
    'Room Service',
    'Parking',
  ];

  const handleFilterChange = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterChange({
                  priceRange: [0, parseInt(e.target.value)],
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Rating</h3>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleFilterChange({ rating })}
                className={`p-2 rounded ${
                  filters.rating === rating
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Star
                  className={`w-5 h-5 ${
                    filters.rating === rating ? 'fill-current' : ''
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Amenities</h3>
          <div className="space-y-2">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={(e) => {
                    const newAmenities = e.target.checked
                      ? [...filters.amenities, amenity]
                      : filters.amenities.filter((a: string) => a !== amenity);
                    handleFilterChange({ amenities: newAmenities });
                  }}
                  className="mr-2"
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}