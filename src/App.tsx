import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import MusicPlayerPage from './Components/Pages/MusicPlayer/MusicPlayerPage';


const router = createBrowserRouter(
[
  {
    path: "/",
    element: <MusicPlayerPage />
  }
])


const App = () => <RouterProvider router={router}/>;

export default App;
