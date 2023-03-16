import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BaseLayout } from './layouts/baseLayout';
import { Home } from './pages/Home';
import { Error404 } from './pages/Error404';
import './App.css';
import './assets/css/input.css';
import './assets/css/button.css';

function App() {
  const router = createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <Error404 />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
