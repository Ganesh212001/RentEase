import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function CustomerDashboard() {
  const [wishlist, setWishlist] = useState([]);
  const [bookings, setBookings] = useState([]);

  const loadData = async () => {
    const [wishRes, bookingRes] = await Promise.all([api.get('/wishlist'), api.get('/bookings/me')]);
    setWishlist(wishRes.data);
    setBookings(bookingRes.data);
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Customer Dashboard</h2>

      <h3 className="text-xl font-semibold mt-5">Wishlist</h3>
      <div className="space-y-2 mt-2">
        {wishlist.map((item) => (
          <div key={item._id} className="bg-white p-3 rounded shadow">
            <Link className="text-blue-600" to={`/properties/${item.property?._id}`}>{item.property?.title}</Link>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-5">Booking Requests</h3>
      <div className="space-y-2 mt-2">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white p-3 rounded shadow">
            {b.property?.title} - <span className="font-semibold">{b.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
