import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between">
        <Link to="/" className="font-bold text-xl text-blue-600">RentEase</Link>
        <div className="flex gap-4 items-center text-sm">
          <Link to="/properties">Properties</Link>
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
