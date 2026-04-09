import { useAuth } from '../context/AuthContext';
import OwnerDashboard from './OwnerDashboard';
import CustomerDashboard from './CustomerDashboard';
import AdminDashboard from './AdminDashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  if (user?.role === 'owner') return <OwnerDashboard />;
  if (user?.role === 'admin') return <AdminDashboard />;
  return <CustomerDashboard />;
}
