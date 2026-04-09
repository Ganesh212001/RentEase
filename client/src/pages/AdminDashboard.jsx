import { useEffect, useState } from 'react';
import api from '../api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState([]);

  const loadData = async () => {
    const [usersRes, pendingRes] = await Promise.all([
      api.get('/admin/users'),
      api.get('/admin/properties/pending')
    ]);
    setUsers(usersRes.data);
    setPending(pendingRes.data);
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <h3 className="text-xl font-semibold mt-4">Manage Users</h3>
      <div className="space-y-2 mt-2">
        {users.map((u) => (
          <div key={u._id} className="bg-white p-3 rounded shadow flex justify-between">
            <span>{u.name} ({u.role}) - {u.email}</span>
            <button className="text-red-600" onClick={async () => { await api.delete(`/admin/users/${u._id}`); loadData(); }}>Remove</button>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-5">Approve Listings</h3>
      <div className="space-y-2 mt-2">
        {pending.map((p) => (
          <div key={p._id} className="bg-white p-3 rounded shadow flex justify-between">
            <span>{p.title} by {p.owner?.name}</span>
            <div className="space-x-2">
              <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={async () => { await api.put(`/admin/properties/${p._id}/approve`); loadData(); }}>Approve</button>
              <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={async () => { await api.delete(`/admin/properties/${p._id}`); loadData(); }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
