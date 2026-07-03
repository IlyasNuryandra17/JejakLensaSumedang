import React from 'react';
import { useNavigate } from 'react-router-dom';

const SpotCard = ({ spot }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/spot/${spot.id}`);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/600x400/2F4156/FFFFFF?text=SpotFinder';
  };

  return (
    <div className="spot-card" onClick={handleClick}>
      <div className="spot-img">
        <img
          src={spot.image}
          alt={spot.name}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="spot-img-overlay"></div>
        <span className="spot-tag">{spot.category}</span>
        <div className="spot-rating">
          <i className="fas fa-star"></i>
          {spot.rating}
        </div>
      </div>

      <div className="spot-body">
        <h3>{spot.name}</h3>
        <div className="spot-loc">
          <i className="fas fa-map-marker-alt"></i>
          {spot.location}
        </div>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          marginBottom: '12px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {spot.description}
        </p>
        <div className="spot-foot">
          <span className="spot-price">
            Tiket <b>{spot.price}</b>
          </span>
          <div className="spot-arrow">
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;