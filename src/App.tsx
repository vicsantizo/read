import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { BaseLayout } from './layouts/baseLayout';
import { PersistentStorageContext } from './context/persistentStorage/PersistentStorageContext';
import { IBooksLibraryPersistentStorage } from './store/IBooksLibraryPersistentStorage';

const Error404 = lazy(() => import('./pages/Error404'));
const Home = lazy(() => import('./pages/Home'));

import './App.css';
import './assets/css/input.css';
import './assets/css/button.css';

export type AppProps = {
  persistentStorage: IBooksLibraryPersistentStorage;
};

function App({ persistentStorage }: AppProps) {
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
          loader: persistentStorage.getAllBooks,
        },
      ],
    },
    {
      path: '*',
      element: (
        <Suspense fallback="Loading...">
          <Error404 />
        </Suspense>
      ),
    },
  ]);

  return (
    <PersistentStorageContext.Provider value={persistentStorage}>
      <RouterProvider router={router} />
    </PersistentStorageContext.Provider>
  );
}

export default App;
