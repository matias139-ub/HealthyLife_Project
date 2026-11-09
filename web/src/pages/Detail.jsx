import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

export default function Detail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    api.get(`/contents/${id}`).then(({ data }) => setItem(data));
    api.get('/favorites').then(({ data }) => setFav(data.some((f) => f._id === id)));
  }, [id]);

  const toggle = async () => {
    const { data } = await api.post(`/favorites/${id}`);
    setFav(data.favorited);
  };

  if (!item) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <Link to={-1} className="back">←</Link>
      <img className="hero" src={item.imageUrl} alt={item.title} />
      <h1>{item.title}</h1>
      <p>{item.body}</p>
      {item.videoUrl && (
        <a className="link" href={item.videoUrl} target="_blank" rel="noreferrer">▶ Tonton Video</a>
      )}
      <button className="fav-btn" onClick={toggle}>
        {fav ? '❤️ Tersimpan di Favorit' : '🤍 Save to Favorites'}
      </button>
    </div>
  );
}