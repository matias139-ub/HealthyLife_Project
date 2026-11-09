import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Konfirmasi password tidak sama');
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name, email: form.email, password: form.password,
      });
      login(data);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
    }
  };

  return (
    <form onSubmit={submit} className="page">
      <Link to="/login" className="back">←</Link>
      <h1>Create Account</h1>
      <input placeholder="Full Name" value={form.name} onChange={change('name')} required />
      <input type="email" placeholder="Email" value={form.email} onChange={change('email')} required />
      <input type="password" placeholder="Password" value={form.password} onChange={change('password')} required />
      <input type="password" placeholder="Confirm Password" value={form.confirm} onChange={change('confirm')} required />
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit">REGISTER</button>
      <p className="center-text">Already have an account? <Link className="link" to="/login">Login</Link></p>
    </form>
  );
}