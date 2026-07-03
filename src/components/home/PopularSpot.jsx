import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpotCard from '../spot/SpotCard';

// Data Popular Spots - Hardcode langsung
const popularSpotsData = [
  {
    id: 1,
    name: 'Gunung Kunci',
    category: 'Alam',
    location: 'Kec. Sumedang Selatan',
    rating: 4.8,
    reviews: 120,
    price: 'Rp5.000',
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&h=400&fit=crop',
    description: 'Spot favorit dengan pemandangan indah dari ketinggian'
  },
  {
    id: 2,
    name: 'Cadas Pangeran',
    category: 'Sejarah',
    location: 'Kec. Sumedang Utara',
    rating: 4.6,
    reviews: 85,
    price: 'Gratis',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop',
    description: 'Situs bersejarah dengan nilai budaya yang tinggi'
  },
  {
    id: 3,
    name: 'Curug Cinulang',
    category: 'Alam',
    location: 'Kec. Cimanggung',
    rating: 4.7,
    reviews: 70,
    price: 'Rp15.000',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop',
    description: 'Air terjun indah dengan suasana yang sejuk dan asri'
  }
];

const PopularSpot = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/search');
  };

  return (
    <section id="populer" className="popular-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">Paling ramai dikunjungi</span>
            <h2>Spot populer di Sumedang</h2>
            <p>Tempat-tempat yang paling banyak dicari dan diberi ulasan.</p>
          </div>
          <button className="see-all" onClick={handleViewAll}>
            Lihat semua <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        <div className="spot-grid">
          {popularSpotsData.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSpot;