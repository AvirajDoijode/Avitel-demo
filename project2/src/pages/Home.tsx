import { ArrowRight, Coffee, Wifi, Utensils } from 'lucide-react';
import SearchForm from '../components/SearchForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-indigo-900 mb-6">
            Find Your Perfect Stay with Avitel
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Discover amazing hotels at the best prices, with instant confirmation and 24/7 support
          </p>
          
          <SearchForm />

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Avitel?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Coffee className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Best Amenities</h3>
                <p className="text-gray-600">Enjoy top-notch facilities and services at all our partner hotels</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Wifi className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Connected Stays</h3>
                <p className="text-gray-600">Stay connected with high-speed internet at all properties</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Utensils className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Dining Excellence</h3>
                <p className="text-gray-600">Experience world-class dining options at our hotels</p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Hotel"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}