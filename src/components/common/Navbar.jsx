import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Cek apakah user adalah developer (bisa diatur via localStorage)
  const isDeveloper = localStorage.getItem('isDeveloper') === 'true';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    if (query && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsMenuOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 20l6-11 4 7 3-5 5 9H3z"/>
            </svg>
          </div>
          <div className="logo-text">JejakLensa<span>.</span> <span>Sumedang</span></div>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Beranda</Link>
          <Link to="/search" className={`nav-link ${isActive('/search')}`}>Jelajahi</Link>
          <Link to="/review" className={`nav-link ${isActive('/review')}`}>Ulasan</Link>
          {isDeveloper && (
            <Link to="/manage" className={`nav-link ${isActive('/manage')}`}>
              <i className="fas fa-cog"></i> Kelola Spot
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="navbar-search">
          <input
            type="text"
            name="search"
            placeholder="Cari spot foto..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </form>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={toggleMenu}>
            <i className="fas fa-home"></i> Beranda
          </Link>
          <Link to="/search" className="mobile-link" onClick={toggleMenu}>
            <i className="fas fa-compass"></i> Jelajahi
          </Link>
          <Link to="/review" className="mobile-link" onClick={toggleMenu}>
            <i className="fas fa-star"></i> Ulasan
          </Link>
          {isDeveloper && (
            <Link to="/manage" className="mobile-link" onClick={toggleMenu}>
              <i className="fas fa-cog"></i> Kelola Spot
            </Link>
          )}
          <form onSubmit={handleSearch} className="mobile-search">
            <input
              type="text"
              name="search"
              placeholder="Cari spot foto..."
              className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-btn">
              <i className="fas fa-search"></i> Cari
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;