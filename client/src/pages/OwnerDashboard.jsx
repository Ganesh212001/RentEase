import { useEffect, useState } from 'react';
import api from '../api';

const initialForm = {
  title: '', description: '', propertyType: 'House', address: '', state: '', city: '', pincode: '', landmark: '', rentPrice: '', rentCycle: 'month'
};

export default function OwnerDashboard() {
  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [data, setData] = useState({ properties: [], bookings: [] });

  const loadDashboard = async () => {
    const res = await api.get('/properties/owner/dashboard/me');
    setData(res.data);
  };

  useEffect(() => { loadDashboard(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    [...images].forEach((img) => payload.append('images', img));
    await api.post('/properties', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
    setForm(initialForm);
    loadDashboard();
  };

  const removeProperty = async (id) => {
    await api.delete(`/properties/${id}`);
    loadDashboard();
  };

  const updateBooking = async (id, status) => {
    await api.put(`/bookings/${id}/status`, { status });
    loadDashboard();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Owner Dashboard</h2>
      <form onSubmit={handleSubmit} className="bg-white mt-4 p-4 rounded-xl shadow grid md:grid-cols-2 gap-3">
        {Object.keys(initialForm).map((key) => (
          key === 'propertyType' ? (
            <select key={key} className="border p-2 rounded" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}>
              <option>House</option><option>Farmhouse</option><option>Villa</option>
            </select>
          ) : (
            <input key={key} className="border p-2 rounded" placeholder={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={['title', 'description', 'address', 'state', 'city', 'pincode', 'rentPrice'].includes(key)} />
          )
        ))}
        <input type="file" multiple className="border p-2 rounded" onChange={(e) => setImages(e.target.files)} />
        <button className="bg-blue-600 text-white p-2 rounded">Add Property</button>
      </form>

      <h3 className="text-xl font-semibold mt-6">Your Properties</h3>
      <div className="space-y-3 mt-2">
        {data.properties.map((p) => (
          <div key={p._id} className="bg-white p-3 rounded shadow flex justify-between">
            <div>{p.title} - {p.city} - ₹{p.rentPrice} ({p.isApproved ? 'Approved' : 'Pending'})</div>
            <button className="text-red-600" onClick={() => removeProperty(p._id)}>Delete</button>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-6">Inquiries / Bookings</h3>
      <div className="space-y-3 mt-2">
        {data.bookings.map((b) => (
          <div key={b._id} className="bg-white p-3 rounded shadow">
            <p><b>{b.property?.title}</b> by {b.customer?.name} ({b.customer?.email})</p>
            <p className="text-sm">Message: {b.message}</p>
            <p className="text-sm">Status: {b.status}</p>
            <div className="space-x-2 mt-2">
              <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => updateBooking(b._id, 'accepted')}>Accept</button>
              <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => updateBooking(b._id, 'rejected')}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
