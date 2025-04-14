import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, User } from 'lucide-react';
import { useState } from 'react';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, checkIn, checkOut, guests, totalPrice } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      navigate('/my-bookings');
    }, 2000);
  };

  if (!hotel) {
    return <div>Invalid checkout session</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="font-medium">{hotel.name}</p>
                  <p className="text-sm text-gray-600">
                    {checkIn} - {checkOut}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <p>{guests} Guests</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
            >
              {isProcessing ? 'Processing...' : `Pay $${totalPrice}`}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Price Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Room Charges</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span>${Math.round(totalPrice * 0.1)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total Amount</span>
              <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}