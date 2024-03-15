import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import WebsiteLayout from './components/Organisms/WebsiteLayout';
import HomePage from './components/Pages/Home/HomePage';
import ArtistPage from './components/Pages/ArtistPage';
import AlbumPage from './components/Pages/AlbumPage/AlbumPage';

/* TODO: 
    once this array gets too large, it will be a good idea to split the website into 
    large "areas" (I can't find a good word for this at the moment).

    If you're following Domain-driven design, then word you're looking for is "Domain"

    Each area should encompass a collection of related pages.
*/

const router = createBrowserRouter(
[
  {
    path: "/",
    
    element: <WebsiteLayout />,

    children: 
    [
      { index: true, element: <Navigate replace to={"home"} />},

      {  path: "home", element: <HomePage /> },

      { path: "/artist/:artistID" , element: <ArtistPage /> },

      { path: "/album/:albumID" , element: <AlbumPage /> }
    ]
  }
])


const App = () => <RouterProvider router={router}/>;

export default App;