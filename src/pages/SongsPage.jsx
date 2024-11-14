import React, { useState, useEffect } from 'react';
import { ApiService } from '../service/Apiservice';

function SongsPage() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({ titulo: '', archivo: null });
  const [editingSong, setEditingSong] = useState(null); 

  useEffect(() => {
    ApiService.getAlbums()
      .then((response) => setAlbums(response))
      .catch((error) => console.error('Error al obtener los álbumes:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong({ ...newSong, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewSong({ ...newSong, archivo: e.target.files[0] });
  };

  const handleAlbumChange = (e) => {
    const albumId = parseInt(e.target.value, 10);
    setSelectedAlbumId(albumId);

    if (albumId) {
      ApiService.getSongsByAlbum(albumId)
        .then((songsResponse) => setSongs(songsResponse))
        .catch((error) => console.error('Error al obtener las canciones:', error));
    } else {
      setSongs([]);
    }
  };

  const handleCreateOrUpdateSong = async () => {
    if (!selectedAlbumId) {
      console.error('Por favor selecciona un álbum primero.');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', newSong.titulo);
    if (newSong.archivo) {
      formData.append('archivo', newSong.archivo);
    }

    try {
      if (editingSong) {
       
        await ApiService.updateSong(selectedAlbumId, editingSong.id, formData);
        setEditingSong(null);
      } else {
       
        await ApiService.createSong(selectedAlbumId, formData);
      }
      
      setNewSong({ titulo: '', archivo: null });
      const updatedSongs = await ApiService.getSongsByAlbum(selectedAlbumId);
      setSongs(updatedSongs);
    } catch (error) {
      console.error('Error al crear/actualizar la canción:', error);
    }
  };

  const handleEditSong = (song) => {
    setEditingSong(song);
    setNewSong({ titulo: song.titulo, archivo: null });
  };

  const handleDeleteSong = async (songId) => {
    if (!songId) {
      console.error("Song ID está indefinido.");
      return;
    }
  
    try {
      await ApiService.deleteSong(songId);
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
    } catch (error) {
      console.error("Error al eliminar la canción:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Administración de Canciones</h2>

     
      <div className="mb-4">
        <label htmlFor="albumSelect" className="form-label">Selecciona un Álbum</label>
        <select
          id="albumSelect"
          className="form-select"
          onChange={handleAlbumChange}
          value={selectedAlbumId || ''}
        >
          <option value="">-- Selecciona un Álbum --</option>
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.titulo}
            </option>
          ))}
        </select>
      </div>

      
      <div className="mb-4">
        <input
          type="text"
          name="titulo"
          placeholder="Título de la Canción"
          value={newSong.titulo}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="form-control mb-2"
        />
        <button onClick={handleCreateOrUpdateSong} className="btn btn-primary">
          {editingSong ? 'Actualizar Canción' : 'Crear Canción'}
        </button>
        {editingSong && (
          <button
            onClick={() => {
              setEditingSong(null);
              setNewSong({ titulo: '', archivo: null });
            }}
            className="btn btn-secondary ms-2"
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Lista de Canciones */}
      <ul className="list-group">
        {songs.map((song) => (
          <li key={song.id} className="list-group-item d-flex align-items-center justify-content-between">
            <div>
              <strong>{song.titulo}</strong>
              <audio controls className="ms-3">
                <source src={`http://localhost:3000/uploads/${song.archivo}`} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
            <div>
              <button
                onClick={() => handleEditSong(song)}
                className="btn btn-warning btn-sm me-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteSong(song.id)}
                className="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongsPage;
