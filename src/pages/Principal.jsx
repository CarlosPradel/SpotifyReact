import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../service/Apiservice';
import './PrincipalPage.css';

function PrincipalPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    albums: [],
    artistas: [],
    canciones: [],
    generos: [],
  });

  
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

 
  const handleSearch = async () => {
    if (query && query.trim()) {
      console.log("Ejecutando búsqueda con query:", query);
  
      try {
        const searchResults = await ApiService.search(query);
        console.log("Resultados de la búsqueda en el frontend:", searchResults);
        setResults(searchResults);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      }
    } else {
      console.warn("El parámetro de búsqueda está vacío.");
    }
  };

  return (
    <div className="principal-page">
      <header className="principal-header">
        <h1>Bienvenido a Mi App de Música</h1>
        <p>Tu biblioteca musical, organizada y accesible</p>
      </header>
      
      <nav className="navigation">
        <Link to="/album-view" className="nav-link">Álbumes</Link>
        <Link to="/artista-view" className="nav-link">Artistas</Link>
        <Link to="/generos-view" className="nav-link">Géneros</Link>
      </nav>

      
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Buscar en álbumes, artistas, géneros, canciones..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Buscar</button>
      </div>

     
      {Object.values(results).some((resultList) => resultList.length > 0) && (
        <section className="search-results">
          <h2>Resultados de la Búsqueda</h2>

          {results.albums.length > 0 && (
            <div>
              <h3>Álbumes</h3>
              <ul className="results-list">
                {results.albums.map((album) => (
                  <li key={album.id} className="result-item">
                    <Link to={`/album-view/${album.id}`} className="result-link">
                      <strong>{album.titulo}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.artistas.length > 0 && (
            <div>
              <h3>Artistas</h3>
              <ul className="results-list">
                {results.artistas.map((artista) => (
                  <li key={artista.id} className="result-item">
                    <Link to={`/artista-view/${artista.id}`} className="result-link">
                      <strong>{artista.nombre}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.generos.length > 0 && (
            <div>
              <h3>Géneros</h3>
              <ul className="results-list">
                {results.generos.map((genero) => (
                  <li key={genero.id} className="result-item">
                    <Link to={`/generos/${genero.id}`} className="result-link">
                      <strong>{genero.nombre}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.canciones.length > 0 && (
            <div>
              <h3>Canciones</h3>
              <ul className="results-list">
                {results.canciones.map((cancion) => (
                  <li key={cancion.id} className="result-item">
                    <Link to={`/musicas/${cancion.id}`} className="result-link">
                      <strong>{cancion.titulo}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className="content-section">
        <h2>Explorar</h2>
        <div className="cards">
          <div className="card">
            <Link to="/album-view">
              <h3>Álbumes</h3>
              <p>Explora álbumes de tus artistas favoritos.</p>
            </Link>
          </div>
          <div className="card">
            <Link to="/artista-view">
              <h3>Artistas</h3>
              <p>Descubre artistas de diversos géneros.</p>
            </Link>
          </div>
          <div className="card">
            <Link to="/generos-view">
              <h3>Géneros</h3>
              <p>Explora música por géneros que amas.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrincipalPage;
