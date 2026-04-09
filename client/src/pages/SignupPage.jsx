import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer', phone: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/register', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold">Signup</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input className="w-full border p-2 rounded" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="w-full border p-2 rounded" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full border p-2 rounded" placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input className="w-full border p-2 rounded" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select className="w-full border p-2 rounded" onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="customer">Customer (Rent lene wala)</option>
        <option value="owner">Property Owner (Rent dene wala)</option>
      </select>
      <button className="w-full bg-blue-600 text-white p-2 rounded">Create Account</button>
    </form>
  );
}
