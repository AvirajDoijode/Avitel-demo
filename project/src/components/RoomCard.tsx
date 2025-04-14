import { Bed, Users, Check } from 'lucide-react';

interface RoomProps {
  room: {
    id: string;
    name: string;
    price: number;
    capacity: number;
    amenities: string[];
  };
  onSelect: (roomId: string) => void;
  selected: boolean;
}

export default function RoomCard({ room, onSelect, selected }: RoomProps) {
  return (
    <div 
      className={`border rounded-lg p-4 ${
        selected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{room.name}</h3>
          <div className="flex items-center mt-1 text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>Up to {room.capacity} guests</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-indigo-600">${room.price}</div>
          <div className="text-sm text-gray-500">per night</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {room.amenities.map((amenity) => (
          <div key={amenity} className="flex items-center text-gray-600">
            <Check className="w-4 h-4 mr-2 text-green-500" />
            <span>{amenity}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(room.id)}
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          selected
            ? 'bg-indigo-600 text-white'
            : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
        }`}
      >
        {selected ? 'Selected' : 'Select Room'}
      </button>
    </div>
  );
}