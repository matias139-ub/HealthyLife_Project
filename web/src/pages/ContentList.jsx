import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

const titles = {
  article: 'Articles', workout: 'Workout Guides', video: 'Video Education',
  nutrition: 'Nutrition Info', favorites: 'Favorit Saya',
};

export default function ContentList() {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const url = category === 'favorites' ? '/favorites' : `/contents?category=${category}`;
    api.get(url).then(({ data }) => setItems(data));
  }, [category]);

  return (
    <div className="page">
      <Link to="/" className="back">←</Link>
      <h1>{titles[category]}</h1>
      {items.length === 0 && <p className="muted">Belum ada data.</p>}
      {items.map((it) => (
        <Link key={it._id} to={`/content/${it._id}`} className="list-item">
          <img src={it.imageUrl} alt={it.title} />
          <div>
            <b>{it.title}</b>
            <small>{it.summary}</small>
          </div>
        </Link>
      ))}
    </div>
  );
}