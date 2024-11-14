import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

const AlbumsTable = memo(function AlbumsTable({ albums, onEdit, onDelete }) {
 
  useEffect(() => {
    console.log("Albums received in AlbumsTable:", albums); 
  }, [albums]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {albums.map((album) => (
          <tr key={album.id}>
            <td>
              <img
                src={`http://localhost:3000/uploads/${album.imagen}?t=${Date.now()}`} 
                alt={album.titulo}
                style={{ width: '50px', height: '50px' }}
                onError={(e) => { e.target.src = '/path/to/default-placeholder.png'; }} 
              />
            </td>
            <td>{album.titulo}</td>
            <td>{album.descripcion}</td>
            <td>
              <button onClick={() => onEdit(album)} className="btn btn-sm btn-warning me-2">
                Edit
              </button>
              <button onClick={() => onDelete(album.id)} className="btn btn-sm btn-danger">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

AlbumsTable.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
      descripcion: PropTypes.string,
      imagen: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AlbumsTable;
