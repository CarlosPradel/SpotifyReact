import axios from 'axios';


const API_URL = 'http://localhost:3000';


const handleError = (error) => {
  console.error("API call failed: ", error);
  throw error;
};


export const ApiService = {
  
  getGenres: async () => {
    try {
      const response = await axios.get(`${API_URL}/genero`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },


  getArtistsByGenre: async (genreId) => {
    try {
      const response = await axios.get(`${API_URL}/artista/genero/${genreId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  getArtists: async () => {
    try {
      const response = await axios.get(`${API_URL}/artista?includeGenre=true`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  getSongsByArtist: async (artistId) => {
    try {
      const response = await axios.get(`${API_URL}/artista/${artistId}/songs`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

 
  getAlbumsByGenre: async (genreId) => {
    try {
      const response = await axios.get(`${API_URL}/genero/${genreId}/albums`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener álbumes por género:", error);
      throw error;
    }
  },


  getAlbumsByArtist: async (artistId) => {
    try {
      const response = await axios.get(`${API_URL}/album/artist/${artistId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  getGenreById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/genero/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching genre by ID:", error);
      throw error;
    }
  },

 
  getArtistById: async (artistId) => {
    try {
      const response = await axios.get(`${API_URL}/artista/${artistId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  getSongsByAlbum: async (albumId) => {
    try {
      const response = await axios.get(`${API_URL}/album/${albumId}/songs`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  createGenre: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/genero`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

 
  createArtist: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/artista`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  createAlbum: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/album`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  getAlbums: async () => {
    try {
      const response = await axios.get(`${API_URL}/album`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  getAlbumById: async (albumId) => {
    try {
      const response = await axios.get(`${API_URL}/album/${albumId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  createSong: async (albumId, data) => {
    try {
      const response = await axios.post(`${API_URL}/album/${albumId}/songs`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

 
  updateGenre: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/genero/${id}`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  updateArtist: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/artista/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

 
  updateAlbum: async (id, data) => {
    console.log("Sending update for album with ID:", id);
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`); 
    }

    try {
      const response = await axios.put(`${API_URL}/album/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

 
  updateSong: async (albumId, songId, data) => {
    try {
      const response = await axios.put(`${API_URL}/album/${albumId}/songs/${songId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  deleteGenre: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/genero/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

 
  deleteArtist: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/artista/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

 
  deleteAlbum: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/album/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  deleteSong: async (albumId, songId) => {
    try {
      const response = await axios.delete(`${API_URL}/album/${albumId}/songs/${songId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
  search: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { q: query },
      });
      console.log("Resultados recibidos en el frontend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en la llamada API de búsqueda:", error);
      throw error;
    }
  },
};
