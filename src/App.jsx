import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import SearchSpot from './pages/SearchSpot';
import SpotDetail from './pages/SpotDetail';
import ManageSpot from './pages/ManageSpot';
import Review from './pages/Review';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchSpot />} />
          <Route path="/spot/:id" element={<SpotDetail />} />
          <Route path="/manage" element={<ManageSpot />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;