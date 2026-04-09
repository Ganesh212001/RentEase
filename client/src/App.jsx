import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/properties" element={<PropertyListPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}
