import { Navigate, RouteObject } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage/AlbumPage';

const streamingRoutes: RouteObject[] =
[
    { index: true, element: <Navigate replace to={"home"} />},

    {  path: "home", element: <HomePage />  },

    { path: "/artist/:artistID" , element: <ArtistPage /> },

    { path: "/album/:albumID" , element: <AlbumPage /> }
]


export default streamingRoutes;
