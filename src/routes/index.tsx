import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Timer } from '../timer';
import { MainLayout } from './MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/timer', element: <Timer /> },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export { AppRoutes };
