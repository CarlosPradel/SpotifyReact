import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ApiService } from '../service/Apiservice';

function GenresPage({ onSelectGenre }) {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState({ nombre: '', descripcion: '' });
  const [editingGenre, setEditingGenre] = useState(null); 

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      const genres = await ApiService.getGenres();
      setGenres(genres);
    } catch (error) {
      console.error("Error al cargar los géneros", error);
      alert("Error al cargar los géneros. Por favor, inténtelo de nuevo.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGenre({ ...newGenre, [name]: value });
  };

  const handleCreateGenre = async () => {
    try {
      await ApiService.createGenre(newGenre);
      setNewGenre({ nombre: '', descripcion: '' });
      loadGenres(); 
    } catch (error) {
      console.error("Error al crear el género", error);
      alert("Error al crear el género. Por favor, inténtelo de nuevo.");
    }
  };

  const handleEditClick = (genre) => {
    setEditingGenre(genre); 
    setNewGenre({ nombre: genre.nombre, descripcion: genre.descripcion });
  };

  const handleUpdateGenre = async () => {
    if (editingGenre) {
      try {
        await ApiService.updateGenre(editingGenre.id, newGenre);
        setNewGenre({ nombre: '', descripcion: '' });
        setEditingGenre(null);
        loadGenres();
      } catch (error) {
        console.error("Error al actualizar el género", error);
        alert("Error al actualizar el género. Por favor, inténtelo de nuevo.");
      }
    }
  };

  const handleDeleteGenre = async (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este género?")) {
      try {
        await ApiService.deleteGenre(id);
        loadGenres();
      } catch (error) {
        console.error("Error al eliminar el género", error);
        alert("Error al eliminar el género. Por favor, inténtelo de nuevo.");
      }
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Genero Musical</h2>
      <div className="mb-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del genero"
          value={newGenre.nombre}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Description"
          value={newGenre.descripcion}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <button
          onClick={editingGenre ? handleUpdateGenre : handleCreateGenre}
          className="btn btn-primary"
        >
          {editingGenre ? 'Actualizar ' : 'Crear genero'}
        </button>
        {editingGenre && (
          <button
            onClick={() => {
              setEditingGenre(null);
              setNewGenre({ nombre: '', descripcion: '' });
            }}
            className="btn btn-secondary ms-2"
          >
            Cancel
          </button>
        )}
      </div>

      <ul className="list-group">
        {genres.map((genre) => (
          <li
            key={genre.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {genre.nombre}
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEditClick(genre)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => handleDeleteGenre(genre.id)}
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

GenresPage.propTypes = {
  onSelectGenre: PropTypes.func.isRequired, // Declara que se espera una función
};

export default GenresPage;
