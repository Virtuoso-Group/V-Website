import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import WebsiteLayout from './Components/Organisms/WebsiteLayout';
import HomePage from './Components/Pages/Home/HomePage';
import ArtistPage from './Components/Pages/ArtistPage';

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

      { path: "/artist/:artistID" , element: <ArtistPage /> }
    ]
  }
])


const App = () => <RouterProvider router={router}/>;

export default App;