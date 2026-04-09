import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [message, setMessage] = useState('Interested in booking this property.');
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/properties/${id}`).then((res) => setProperty(res.data));
  }, [id]);

  const saveProperty = async () => {
    await api.post('/wishlist', { propertyId: id });
    alert('Saved to wishlist');
  };

  const sendBooking = async () => {
    await api.post('/bookings', { propertyId: id, message });
    alert('Booking request sent');
  };

  if (!property) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid grid-cols-2 gap-2">
          {property.images?.map((img) => (
            <img key={img} src={`http://localhost:5000${img}`} className="rounded h-44 w-full object-cover" />
          ))}
        </div>
        <div className="bg-white rounded-xl p-5 shadow">
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <p className="text-gray-600 mt-2">{property.description}</p>
          <p className="mt-2">{property.address}, {property.city}, {property.state} - {property.pincode}</p>
          <p className="mt-2 font-semibold">Landmark: {property.landmark || 'N/A'}</p>
          <p className="mt-3 text-xl font-bold">₹{property.rentPrice}/{property.rentCycle}</p>
          <p className="mt-2">Owner: {property.owner?.name} ({property.owner?.email})</p>

          {user?.role === 'customer' && (
            <div className="mt-4 space-y-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded mr-2" onClick={saveProperty}>Save Property</button>
              <textarea className="w-full border p-2 rounded" value={message} onChange={(e) => setMessage(e.target.value)} />
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={sendBooking}>Send Booking Request</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
