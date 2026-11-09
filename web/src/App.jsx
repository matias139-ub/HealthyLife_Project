import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ContentList from './pages/ContentList';
import Detail from './pages/Detail';

function Private({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <div className="phone">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Private><Dashboard /></Private>} />
        <Route path="/list/:category" element={<Private><ContentList /></Private>} />
        <Route path="/content/:id" element={<Private><Detail /></Private>} />
      </Routes>
    </div>
  );
}