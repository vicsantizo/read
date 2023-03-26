import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { BaseLayout } from './layouts/baseLayout';
import { PersistentStorageContext } from './context/persistentStorage/PersistentStorageContext';
import { IBooksLibraryPersistentStorage } from './store/IBooksLibraryPersistentStorage';
import { BooksContext } from './context/books/BooksContext';
import { Book } from './features/booksLibrary/models/book';

const Error404 = lazy(() => import('./pages/Error404'));
const Home = lazy(() => import('./pages/Home'));
const AddBook = lazy(() => import('./pages/AddBook'));

import './App.css';
import './assets/css/form.css';
import './assets/css/label.css';
import './assets/css/input.css';
import './assets/css/button.css';

export type AppProps = {
  persistentStorage: IBooksLibraryPersistentStorage;
};

function App({ persistentStorage }: AppProps) {
  const [books, setBooks] = useState<Book[]>(persistentStorage.getAllBooks());

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
        {
          path: '/books/new',
          element: (
            <Suspense fallback="Loading...">
              <AddBook />
            </Suspense>
          ),
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
      <BooksContext.Provider
        value={{
          books,
          setBooks,
        }}
      >
        <RouterProvider router={router} />
      </BooksContext.Provider>
    </PersistentStorageContext.Provider>
  );
}

export default App;
