
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../service/Apiservice";
import "./ArtistDetail.css";

function ArtistDetail() {
  const { artistId } = useParams(); 
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchArtistAndSongs = async () => {
      try {
        
        const artistData = await ApiService.getArtistById(artistId);
        setArtist(artistData);

        
        const songsData = await ApiService.getSongsByArtist(artistId);
        setSongs(songsData);
      } catch (error) {
        console.error("Error fetching artist and songs:", error);
      }
    };

    fetchArtistAndSongs();
  }, [artistId]);

  if (!artist) return <p>Cargando artista...</p>;

  return (
    <div className="artist-detail">
      <header className="artist-header">
        <h1>{artist.nombre}</h1>
        <p>Género: {artist.genero?.nombre || "Sin género"}</p>
      </header>

      <section className="artist-songs">
        <h2>Canciones de {artist.nombre}</h2>
        {songs.length > 0 ? (
          <ul className="songs-list">
            {songs.map((song) => (
              <li key={song.id} className="song-item">
                <strong>{song.titulo}</strong>
                <audio controls src={`http://localhost:3000/uploads/${song.archivo}`}>
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay canciones disponibles para este artista.</p>
        )}
      </section>
    </div>
  );
}

export default ArtistDetail;
