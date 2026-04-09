import { useEffect, useState } from 'react';
import api from '../api';
import PropertyCard from '../components/PropertyCard';

export default function PropertyListPage() {
  const [list, setList] = useState([]);
  const [filters, setFilters] = useState({ state: '', city: '', pincode: '', landmark: '', type: '', priceMin: '', priceMax: '' });

  const fetchData = async () => {
    const { data } = await api.get('/properties', { params: filters });
    setList(data);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-3">Property Listing</h2>
      <div className="grid md:grid-cols-4 gap-2 bg-white p-3 rounded-lg shadow">
        {['state', 'city', 'pincode', 'landmark', 'priceMin', 'priceMax'].map((key) => (
          <input key={key} className="border p-2 rounded" placeholder={key} onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))} />
        ))}
        <select className="border p-2 rounded" onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))}>
          <option value="">Type</option><option>House</option><option>Farmhouse</option><option>Villa</option>
        </select>
        <button className="bg-blue-600 text-white rounded px-3" onClick={fetchData}>Apply Filters</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {list.map((property) => <PropertyCard key={property._id} property={property} />)}
      </div>
    </div>
  );
}
