import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isDeveloper = localStorage.getItem('isDeveloper') === 'true';

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Logo & Description */}
          <div>
            <div className="footer-logo">
              <div className="logo-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20l6-11 4 7 3-5 5 9H3z"/>
                </svg>
              </div>
              <div className="footer-logo-text">JejakLensa Sumedang</div>
            </div>
            <p className="footer-description">
              Platform pencarian dan eksplorasi tempat spot foto terbaik di Kabupaten Sumedang.
              Temukan hidden gems, spot populer, dan rekomendasi menarik lainnya.
            </p>
          </div>

          {/* Links */}
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Jelajah</h4>
              <Link to="/">Beranda</Link>
              <Link to="/search">Jelajahi</Link>
              <Link to="/review">Ulasan</Link>
            </div>
            <div className="footer-col">
              <h4>Kategori</h4>
              <Link to="/search?category=wisata-alam">Wisata Alam</Link>
              <Link to="/search?category=wisata-sejarah">Wisata Sejarah</Link>
              <Link to="/search?category=kuliner">Kuliner</Link>
              <Link to="/search?category=budaya">Budaya & Seni</Link>
              <Link to="/search?category=religi">Wisata Religi</Link>
            </div>
            <div className="footer-col">
              <h4>Tentang</h4>
              <Link to="/about">Tentang Kami</Link>
              <Link to="/contact">Kontak</Link>
              {isDeveloper && (
                <Link to="/manage">
                  <i className="fas fa-cog"></i> Kelola Spot
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {currentYear} JejakLensa Sumedang. All rights reserved.</span>
        <span>Dibangun dengan React &amp; Vite</span>
      </div>
    </footer>
  );
};

export default Footer;