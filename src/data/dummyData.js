// Data awal untuk diisi ke local storage oleh developer
export const initialSpots = [
  // ===== SPOT POPULER (Rating Tinggi) =====
  {
    id: 1,
    name: 'Gunung Kunci',
    category: 'Alam',
    location: 'Kec. Sumedang Selatan',
    rating: 4.8,
    reviews: 120,
    price: 'Rp5.000',
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&h=400&fit=crop',
    description: 'Spot favorit dengan pemandangan indah dari ketinggian',
    createdAt: new Date().toISOString()
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
    description: 'Situs bersejarah dengan nilai budaya yang tinggi',
    createdAt: new Date().toISOString()
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
    description: 'Air terjun indah dengan suasana yang sejuk dan asri',
    createdAt: new Date().toISOString()
  },

  // ===== HIDDEN GEMS (Rating Rendah / Belum Banyak Review) =====
  {
    id: 4,
    name: 'Bukit Cinta Sumedang',
    category: 'Alam',
    location: 'Kec. Tanjungsari',
    rating: 3.8,
    reviews: 12,
    price: 'Gratis',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
    description: 'Titik pandang matahari terbenam yang romantis dan masih sepi pengunjung',
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Curug Ciputrawangi',
    category: 'Alam',
    location: 'Kec. Buahdua',
    rating: 3.5,
    reviews: 8,
    price: 'Rp10.000',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=400&fit=crop',
    description: 'Air terjun kecil di tengah hutan pinus, cocok untuk healing dan meditasi',
    createdAt: new Date().toISOString()
  },
  {
    id: 6,
    name: 'Situ Talaga Herang',
    category: 'Alam',
    location: 'Kec. Buahdua',
    rating: 3.2,
    reviews: 5,
    price: 'Rp5.000',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
    description: 'Danau tenang berwarna hijau tosca yang masih alami dan jarang dikunjungi',
    createdAt: new Date().toISOString()
  },
  {
    id: 7,
    name: 'Kebun Teh Cigugur',
    category: 'Alam',
    location: 'Kec. Cigugur',
    rating: 2.8,
    reviews: 3,
    price: 'Rp5.000',
    image: 'https://images.unsplash.com/photo-1572624784951-8d8fb7f218e3?w=600&h=400&fit=crop',
    description: 'Perkebunan teh yang masih alami dengan pemandangan hijau menenangkan',
    createdAt: new Date().toISOString()
  },
  {
    id: 8,
    name: 'Situs Candi Ronggeng',
    category: 'Sejarah',
    location: 'Kec. Buahdua',
    rating: 2.5,
    reviews: 2,
    price: 'Gratis',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop',
    description: 'Situs candi kuno dengan nilai sejarah yang tinggi dan masih tersembunyi',
    createdAt: new Date().toISOString()
  },
  {
    id: 9,
    name: 'Air Terjun Ciputri',
    category: 'Alam',
    location: 'Kec. Cimanggung',
    rating: 2.2,
    reviews: 1,
    price: 'Rp10.000',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=400&fit=crop',
    description: 'Air terjun tersembunyi di tengah hutan dengan kolam alami yang jernih',
    createdAt: new Date().toISOString()
  }
];

// Fungsi untuk menginisialisasi local storage
export const initializeLocalStorage = () => {
  if (!localStorage.getItem('spots')) {
    localStorage.setItem('spots', JSON.stringify(initialSpots));
  }
};

// Fungsi untuk mendapatkan semua spot dari local storage
export const getSpots = () => {
  const spots = localStorage.getItem('spots');
  if (spots) {
    return JSON.parse(spots);
  }
  // Jika tidak ada di localStorage, return initialSpots
  return initialSpots;
};

// Fungsi untuk mendapatkan spot berdasarkan ID
export const getSpotById = (id) => {
  const spots = getSpots();
  return spots.find(spot => spot.id === id) || null;
};

// Fungsi untuk menambah spot (hanya untuk developer)
export const addSpot = (spotData) => {
  const spots = getSpots();
  const newSpot = {
    ...spotData,
    id: Date.now(),
    rating: 0,
    reviews: 0,
    createdAt: new Date().toISOString()
  };
  spots.push(newSpot);
  localStorage.setItem('spots', JSON.stringify(spots));
  return newSpot;
};

// Fungsi untuk menghapus spot (hanya untuk developer)
export const deleteSpot = (id) => {
  const spots = getSpots();
  const filtered = spots.filter(spot => spot.id !== id);
  localStorage.setItem('spots', JSON.stringify(filtered));
};

// Fungsi untuk update spot (hanya untuk developer)
export const updateSpot = (id, updatedData) => {
  const spots = getSpots();
  const index = spots.findIndex(spot => spot.id === id);
  if (index !== -1) {
    spots[index] = { ...spots[index], ...updatedData };
    localStorage.setItem('spots', JSON.stringify(spots));
    return spots[index];
  }
  return null;
};

// Fungsi untuk menambah review
export const addReview = (spotId, reviewData) => {
  const spots = getSpots();
  const spot = spots.find(s => s.id === spotId);
  if (spot) {
    const reviews = JSON.parse(localStorage.getItem(`reviews_${spotId}`) || '[]');
    const newReview = {
      ...reviewData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    reviews.push(newReview);
    localStorage.setItem(`reviews_${spotId}`, JSON.stringify(reviews));
    
    // Update rating
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    spot.rating = Math.round((totalRating / reviews.length) * 10) / 10;
    spot.reviews = reviews.length;
    updateSpot(spotId, { rating: spot.rating, reviews: spot.reviews });
    
    return newReview;
  }
  return null;
};

// Fungsi untuk mendapatkan review suatu spot
export const getReviews = (spotId) => {
  const reviews = localStorage.getItem(`reviews_${spotId}`);
  return reviews ? JSON.parse(reviews) : [];
};