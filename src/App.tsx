import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { BaseLayout } from './layouts/baseLayout';
import { PersistentStorageContext } from './context/persistentStorage/PersistentStorageContext';
import { IBooksLibraryPersistentStorage } from './store/IBooksLibraryPersistentStorage';
import { BooksContext } from './context/books/BooksContext';
import { Book } from './features/booksLibrary/models/book';
import { Skeleton } from './features/booksLibrary/components/skeleton';
import ClipLoader from 'react-spinners/ClipLoader';

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

const Loading = (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <ClipLoader color="#3d65af" size={22} />
    <p className="mt-2 text-center">Loading...</p>
  </div>
);

function App({ persistentStorage }: AppProps) {
  const [books, setBooks] = useState<Book[]>(persistentStorage.getAllBooks());

  const router = createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: (
        <Suspense fallback={Loading}>
          <Error404 />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<Skeleton />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: '/books/new',
          element: (
            <Suspense fallback={Loading}>
              <AddBook />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '*',
      element: (
        <Suspense fallback={Loading}>
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
