import { createBrowserRouter } from 'react-router-dom';

import AroundYou from '../pages/AroundYou';
import ArtistDetails from '../pages/ArtistDetails';
import Discover from '../pages/Discover';
import Search from '../pages/Search';
import SongDetails from '../pages/SongDetails';
import TopCharts from '../pages/TopCharts';
import Layout from '../pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Discover />,
      },
      {
        path: '/top-charts',
        element: <TopCharts />,
      },
      {
        path: '/around-you',
        element: <AroundYou />,
      },
      {
        path: '/artists/:id',
        element: <ArtistDetails />,
      },
      {
        path: '/songs/:songid',
        element: <SongDetails />,
      },
      {
        path: '/search/:searchTerm',
        element: <Search />,
      },
    ],
  },
]);

export default router;
