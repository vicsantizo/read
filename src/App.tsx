import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { BaseLayout } from './layouts/baseLayout';
import './App.css';
import './assets/css/input.css';
import './assets/css/button.css';

const Error404 = lazy(() => import('./pages/Error404'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  const router = createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: (
        <Suspense fallback="Loading...">
          <Error404 />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback="Loading...">
              <Home />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
