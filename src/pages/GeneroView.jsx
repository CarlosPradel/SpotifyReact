
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiService } from "../service/Apiservice";
import "./GenerosView.css";

function GenerosView() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await ApiService.getGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="genres-view">
      <header className="genres-header">
        <h1>Géneros</h1>
        <p>Explora música por género</p>
      </header>

      <div className="genre-list">
        {genres.map((genre) => (
          <Link to={`/generos/${genre.id}`} key={genre.id} className="genre-item">
            <h2>{genre.nombre}</h2>
            <p>{genre.descripcion}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GenerosView;
