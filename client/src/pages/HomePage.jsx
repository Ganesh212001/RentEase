import { useEffect, useState } from 'react';
import api from '../api';
import PropertyCard from '../components/PropertyCard';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [filters, setFilters] = useState({ state: '', city: '', type: '' });

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await api.get('/properties', { params: filters });
      setFeatured(data.slice(0, 6));
    };
    fetchFeatured();
  }, [filters]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Find Houses, Farmhouses & Villas Across India</h1>
      <div className="grid md:grid-cols-3 gap-3 bg-white p-4 rounded-xl shadow">
        <input className="border p-2 rounded" placeholder="State" onChange={(e) => setFilters({ ...filters, state: e.target.value })} />
        <input className="border p-2 rounded" placeholder="City" onChange={(e) => setFilters({ ...filters, city: e.target.value })} />
        <select className="border p-2 rounded" onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">Property Type</option>
          <option>House</option>
          <option>Farmhouse</option>
          <option>Villa</option>
        </select>
      </div>
      <h2 className="text-xl font-semibold mt-8 mb-3">Featured Properties</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((property) => <PropertyCard key={property._id} property={property} />)}
      </div>
    </div>
  );
}
