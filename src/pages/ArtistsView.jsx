import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiService } from "../service/Apiservice";
import "./ArtistsView.css";

function ArtistsView() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistsData = await ApiService.getArtists();
        setArtists(artistsData);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="artist-view">
      <header className="artist-header">
        <h1>Artistas</h1>
        <p>Explora los artistas y su música</p>
      </header>

      <div className="artist-grid">
        {artists.map((artist) => (
          <Link to={`/artist/${artist.id}`} key={artist.id} className="artist-card-link">
            <div className="artist-card">
              <div className="artist-image-container">
                <img
                  src={`http://localhost:3000/uploads/${artist.imagen}`}
                  alt={artist.nombre}
                  className="artist-image"
                />
              </div>
              <div className="artist-info">
                <h2 className="artist-name">{artist.nombre}</h2>
                <p className="artist-genre">{artist.genero?.nombre || "Sin género"}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ArtistsView;