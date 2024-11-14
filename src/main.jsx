import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AlbumsPage from './pages/AlbumsPage.jsx';
import ArtistsPage from './pages/ArtistsPage.jsx';
import GenresPage from './pages/GenresPage.jsx';
import './index.css';
import SongsPage from './pages/SongsPage.jsx';
import PrincipalPage from './pages/Principal.jsx';
import AlbumView from './pages/AlbumView.jsx';
import AlbumDetail from './pages/AlbumDetail.jsx';
import ArtistView from './pages/ArtistsView.jsx';
import ArtistDetail from './pages/ArtistDetail.jsx';
import GenerosView from './pages/GeneroView.jsx';
import GeneroDetail from './pages/GeneroDetail.jsx';


const router = createBrowserRouter([
  { path: '/album', element: <AlbumsPage /> },
  { path: '/artists', element: <ArtistsPage /> },
  { path: '/generos', element: <GenresPage /> },
  { path: '/artista-view', element: <ArtistView />},
  {path: '/musicas', element: <SongsPage/>},
  {path: '/', element: <PrincipalPage/>},
  { path: '/album-view', element: <AlbumView /> },
  { path: '/album/:albumId', element: <AlbumDetail />},
  { path: '/artist/:artistId', element: <ArtistDetail/>},
  { path: '/generos-view', element: <GenerosView/>},
  { path: '/generos/:generoId', element: < GeneroDetail/>}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
