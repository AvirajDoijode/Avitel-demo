import { Hotel, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuthStore();

  return (
    <>
      <nav className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Hotel className="w-8 h-8" />
              <span className="text-2xl font-bold">Avitel</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/search" className="flex items-center space-x-1 hover:text-indigo-200">
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Link>
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 hover:text-indigo-200">
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link
                      to="/my-bookings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center space-x-1 hover:text-indigo-200"
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}