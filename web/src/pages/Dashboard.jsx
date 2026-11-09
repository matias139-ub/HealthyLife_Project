import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const menus = [
  { key: 'article', label: 'Articles', icon: '📰' },
  { key: 'workout', label: 'Workout Guides', icon: '🏋️' },
  { key: 'video', label: 'Video Education', icon: '▶️' },
  { key: 'nutrition', label: 'Nutrition Info', icon: '🍎' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    const { data } = await api.get('/activities');
    setActivities(data);
  };
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await api.post('/activities', { title });
    setTitle('');
    load();
  };

  const remove = async (id) => {
    await api.delete(`/activities/${id}`);
    load();
  };

  return (
    <div className="page">
      <div className="row">
        <h1>Welcome, {user.name}!</h1>
        <button className="small" onClick={logout}>Logout</button>
      </div>

      <div className="grid">
        {menus.map((m) => (
          <Link key={m.key} to={`/list/${m.key}`} className="card">
            <div className="icon">{m.icon}</div>
            <span>{m.label}</span>
          </Link>
        ))}
      </div>

      <Link to="/list/favorites" className="fav-link">❤️ Artikel Favorit Saya</Link>

      <h3>Recent Activity</h3>
      <form onSubmit={add} className="row">
        <input placeholder="Catat aktivitas (mis. Lari 30 menit)" value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <button className="fab" type="submit">+</button>
      </form>

      {activities.length === 0 && <p className="muted">Belum ada aktivitas.</p>}
      {activities.map((a) => (
        <div key={a._id} className="activity">
          <div className="dot" />
          <div className="grow">
            <b>{a.title}</b>
            <small>{new Date(a.createdAt).toLocaleString('id-ID')}</small>
          </div>
          <button className="small" onClick={() => remove(a._id)}>✕</button>
        </div>
      ))}
    </div>
  );
}