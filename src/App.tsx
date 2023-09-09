import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import WebsiteLayout from './Components/Organisms/WebsiteLayout';
import MainPage from './Components/Pages/Tracks/MainPage';

/* TODO: 
    once this array gets too large, it will be a good idea to split the website into 
    large "areas" (I can't find a good word for this at the moment).

    Each area should encompass a collection of related pages.
*/

const router = createBrowserRouter(
[
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [{ index: true, element: <MainPage /> }]
  }
])


const App = () => <RouterProvider router={router}/>;

export default App;