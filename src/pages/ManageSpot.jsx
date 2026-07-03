import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSpots, addSpot, deleteSpot, updateSpot } from '../data/dummyData';

const ManageSpot = () => {
  const [spots, setSpots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    price: '',
    image: '',
    description: ''
  });
  const navigate = useNavigate();

  // Cek apakah user adalah developer
  const isDeveloper = localStorage.getItem('isDeveloper') === 'true';

  useEffect(() => {
    if (!isDeveloper) {
      navigate('/');
      return;
    }
    loadSpots();
  }, [isDeveloper, navigate]);

  const loadSpots = () => {
    const allSpots = getSpots();
    setSpots(allSpots);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({
          ...formData,
          image: base64String
        });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSpot) {
      // Update spot
      updateSpot(editingSpot.id, formData);
    } else {
      // Add new spot
      addSpot(formData);
    }
    loadSpots();
    closeModal();
  };

  const openAddModal = () => {
    setEditingSpot(null);
    setFormData({
      name: '',
      category: '',
      location: '',
      price: '',
      image: '',
      description: ''
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (spot) => {
    setEditingSpot(spot);
    setFormData({
      name: spot.name,
      category: spot.category,
      location: spot.location,
      price: spot.price,
      image: spot.image || '',
      description: spot.description
    });
    setImagePreview(spot.image || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSpot(null);
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus spot ini?')) {
      deleteSpot(id);
      loadSpots();
    }
  };

  if (!isDeveloper) {
    return null;
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h1>Kelola Spot Wisata</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Tambah, edit, atau hapus data spot wisata
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <i className="fas fa-plus"></i> Tambah Spot
        </button>
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--sky-blue)',
        overflow: 'hidden',
        overflowX: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'inherit',
          minWidth: '600px'
        }}>
          <thead style={{ background: 'var(--navy)', color: 'var(--white)' }}>
            <tr>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>No</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Gambar</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Nama</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Kategori</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Lokasi</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Harga</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {spots.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Belum ada data spot. Klik "Tambah Spot" untuk menambahkan.
                </td>
              </tr>
            ) : (
              spots.map((spot, index) => (
                <tr key={spot.id} style={{ borderBottom: '1px solid var(--sky-blue)' }}>
                  <td style={{ padding: '12px 16px' }}>{index + 1}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <img 
                      src={spot.image || 'https://via.placeholder.com/50/2F4156/FFFFFF?text=No+Img'} 
                      alt={spot.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50/2F4156/FFFFFF?text=No+Img';
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '600' }}>{spot.name}</td>
                  <td style={{ padding: '12px 16px' }}>{spot.category}</td>
                  <td style={{ padding: '12px 16px' }}>{spot.location}</td>
                  <td style={{ padding: '12px 16px' }}>{spot.price}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '12px', marginRight: '8px' }}
                      onClick={() => openEditModal(spot)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn"
                      style={{
                        padding: '6px 14px',
                        fontSize: '12px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)'
                      }}
                      onClick={() => handleDelete(spot.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={closeModal}>
          <div style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-md)',
            padding: '32px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '8px' }}>
              {editingSpot ? 'Edit Spot' : 'Tambah Spot Baru'}
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              {editingSpot ? 'Perbarui data spot wisata' : 'Isi data spot wisata yang ingin ditambahkan'}
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>
                  Nama Spot *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--sky-blue)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'inherit',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>
                  Kategori *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--sky-blue)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    background: 'var(--white)'
                  }}
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Alam">Alam</option>
                  <option value="Sejarah">Sejarah</option>
                  <option value="Kuliner">Kuliner</option>
                  <option value="Budaya">Budaya</option>
                  <option value="Religi">Religi</option>
                  <option value="Buatan">Buatan</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>
                  Lokasi *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Kec. Sumedang Selatan"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--sky-blue)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'inherit',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>
                  Harga Tiket *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Rp15.000 atau Gratis"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--sky-blue)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'inherit',
                    fontSize: '14px'
                  }}
                />
              </div>

              {/* Upload Gambar */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>
                  Upload Gambar
                </label>
                <div style={{
                  border: '2px dashed var(--sky-blue)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  background: imagePreview ? 'var(--white)' : 'var(--beige-light)'
                }}
                onClick={() => document.getElementById('imageUpload').click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = 'var(--teal)';
                  e.currentTarget.style.background = 'var(--sky-blue-light)';
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--sky-blue)';
                  e.currentTarget.style.background = imagePreview ? 'var(--white)' : 'var(--beige-light)';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({ ...formData, image: reader.result });
                      setImagePreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                  e.currentTarget.style.borderColor = 'var(--sky-blue)';
                  e.currentTarget.style.background = imagePreview ? 'var(--white)' : 'var(--beige-light)';
                }}
                >
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  {imagePreview ? (
                    <div>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          borderRadius: 'var(--radius-sm)',
                          objectFit: 'cover'
                        }}
                      />
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                        Klik atau drag untuk mengganti gambar
                      </p>
                    </div>
                  ) : (
                    <div>
                      <i className="fas fa-cloud-upload-alt" style={{ fontSize: '40px', color: 'var(--teal)' }}></i>
                      <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
                        Klik atau drag & drop gambar di sini
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Format: JPG, PNG, GIF
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>
                  Deskripsi *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--sky-blue)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingSpot ? 'Update Spot' : 'Tambah Spot'}
                </button>
                <button type="button" className="btn btn-outline" onClick={closeModal}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Developer Mode Toggle */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: 'var(--beige-light)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--beige)'
      }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
          <i className="fas fa-info-circle" style={{ color: 'var(--teal)' }}></i>
          Halaman ini hanya dapat diakses oleh developer. 
          Untuk mengaktifkan mode developer, buka Console (F12) dan jalankan:
          <br />
          <code style={{
            background: 'var(--navy)',
            color: 'var(--white)',
            padding: '4px 12px',
            borderRadius: '4px',
            display: 'inline-block',
            marginTop: '8px',
            fontSize: '13px'
          }}>
            localStorage.setItem('isDeveloper', 'true') &rarr; lalu refresh halaman
          </code>
        </p>
      </div>
    </div>
  );
};

export default ManageSpot;