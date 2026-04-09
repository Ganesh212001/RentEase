import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <img
        src={`http://localhost:5000${property.images?.[0] || ''}`}
        alt={property.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{property.title}</h3>
        <p className="text-sm text-gray-600">{property.city}, {property.state}</p>
        <p className="mt-2 font-bold">₹{property.rentPrice}/{property.rentCycle}</p>
        <Link to={`/properties/${property._id}`} className="inline-block mt-3 text-blue-600">View details</Link>
      </div>
    </div>
  );
}
