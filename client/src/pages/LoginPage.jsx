import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/login', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input className="w-full border p-2 rounded" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full border p-2 rounded" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      <p className="text-sm">No account? <Link className="text-blue-600" to="/signup">Signup</Link></p>
    </form>
  );
}
