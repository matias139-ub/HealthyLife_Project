import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <form onSubmit={submit} className="page center">
      <div className="logo">🍃</div>
      <h1 className="brand">Healthy<span>Life</span></h1>
      <h2 className="left">Login</h2>
      <input type="email" placeholder="Email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit">LOGIN</button>
      <Link className="link" to="/register">Register New Account</Link>
    </form>
  );
}