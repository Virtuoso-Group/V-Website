import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import MusicPlayerPage from './Components/Pages/MusicPlayer/MusicPlayerPage';

import WebsiteLayout from './Components/Organisms/WebsiteLayout';
import TrackContextContainer from './Components/SongContext';
import TracksPage from './Components/Pages/Tracks/TracksPage';

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
    children: 
    [
      {
        index: true,
        element: <TracksPage />
      },
      {
        path: "player", 
        element: <MusicPlayerPage />,
      }
    ]
  }
])


const App = () => 
{
  return (
    <TrackContextContainer>
      <RouterProvider router={router}/>
    </TrackContextContainer>
  )
  
};

export default App;