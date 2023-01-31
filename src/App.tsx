import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BaseLayout } from './layouts/baseLayout/baseLayout';
import { PersistentStorageProvider } from './context/persistentStorage/PersistentStorageContext';
import { LocalStoragePersistentStorage } from './store/localStoragePersistentStorage';
import { ThemeContext } from './context/theme/ThemeContext';
import { Home } from './pages/Home';
import { useState } from 'react';
import { CreateBook } from './pages/CreateBook';
import { EditBook, loader as editBookLoader } from './pages/EditBook';
import { TrackBook, loader as trackBookLoader } from './pages/TrackBook';
import { BookInfo, loader as bookInfoLoader } from './pages/BookInfo';

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'books/create',
        element: <CreateBook />,
      },
      {
        path: 'books/:bookId/edit',
        element: <EditBook />,
        loader: editBookLoader,
      },
      {
        path: 'books/:bookId/track',
        element: <TrackBook />,
        loader: trackBookLoader,
      },
      {
        path: 'books/:bookId',
        element: <BookInfo />,
        loader: bookInfoLoader,
      },
    ],
  },
]);

function App() {
  const localStoragePersistentStorage = new LocalStoragePersistentStorage();
  const [theme, setTheme] = useState<string>('dark');

  return (
    <PersistentStorageProvider value={localStoragePersistentStorage}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </PersistentStorageProvider>
  );
}

export default App;
