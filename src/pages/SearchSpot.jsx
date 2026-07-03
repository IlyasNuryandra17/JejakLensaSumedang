import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchSpot = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
      <div style={{ 
        maxWidth: '500px', 
        margin: '0 auto',
        padding: '40px',
        background: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--sky-blue)'
      }}>
        <i className="fas fa-search" style={{ 
          fontSize: '64px', 
          color: 'var(--teal)',
          marginBottom: '20px'
        }}></i>
        <h2 style={{ marginBottom: '12px' }}>Halaman Pencarian</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Fitur pencarian spot wisata akan segera hadir.
        </p>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/')}
        >
          <i className="fas fa-arrow-left"></i> Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default SearchSpot;