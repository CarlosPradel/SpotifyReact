
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../service/Apiservice';
import './AlbumDetail.css';

function AlbumDetail() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    ApiService.getAlbumById(albumId)
      .then((response) => {
        setAlbum(response);

        if (response.artista) {
          setArtist(response.artista);
        }

        return ApiService.getSongsByAlbum(albumId);
      })
      .then((songsResponse) => {
        setSongs(songsResponse);
      })
      .catch((error) => console.error('Error fetching album details:', error));
  }, [albumId]);

  if (!album) {
    return <div>Loading album...</div>;
  }

  return (
    <div className="album-detail">
      <h2>{album.titulo}</h2>
      <img
        src={`http://localhost:3000/uploads/${album.imagen}`}
        alt={album.titulo}
        className="album-cover-large"
      />
      <p>{album.descripcion}</p>
      <h3>Artista: {artist ? artist.nombre : "No disponible"}</h3>

      <h3>Canciones</h3>
      <ul className="song-list">
        {songs.map((song) => (
          <li key={song.id} className="song-item">
            <div className="song-info">
              <strong>{song.titulo}</strong>
              <audio controls className="song-audio">
                <source src={`http://localhost:3000/uploads/${song.archivo}`} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumDetail;
