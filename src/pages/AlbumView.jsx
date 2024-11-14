
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../service/Apiservice';
import './AlbumView.css';

function AlbumView() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAlbums()
      .then((response) => setAlbums(response))
      .catch((error) => console.error('Error fetching albums:', error));
  }, []);

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`); 
  };

  return (
    <div className="album-view">
      <h2>Todos los Álbumes</h2>
      <div className="album-grid">
        {albums.map((album) => (
          <div
            key={album.id}
            className="album-card"
            onClick={() => handleAlbumClick(album.id)} 
          >
            <img
              src={`http://localhost:3000/uploads/${album.imagen}`}
              alt={album.titulo}
              className="album-cover"
            />
            <div className="album-info">
              <h3>{album.titulo}</h3>
              <p>{album.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumView;

