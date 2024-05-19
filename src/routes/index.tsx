import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Timer } from '../timer';
import { MainLayout } from './MainLayout';
import { MovieSearch } from '../movie-search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/timer', element: <Timer /> },
      { path: '/movieSearch', element: <MovieSearch /> },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export { AppRoutes };
