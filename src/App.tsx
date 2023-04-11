import { createBrowserRouter, Params, RouterProvider } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { BaseLayout } from './layouts/baseLayout';
import { LocalStoragePersistentStorage } from './store/localStoragePersistentStorage';
import { PersistentStorageContext } from './context/persistentStorage/PersistentStorageContext';
import { IBooksLibraryPersistentStorage } from './store/IBooksLibraryPersistentStorage';
import { BooksContext } from './context/books/BooksContext';
import { Book } from './features/booksLibrary/models/book';
import { Skeleton } from './features/booksLibrary/components/skeleton';
import { ToastContainer } from 'react-toastify';
import { ThemeContext, Theme as ThemeType } from './context/theme/ThemeContext';
import { getInitialThemeValue } from './utils/cookies';
import ClipLoader from 'react-spinners/ClipLoader';

const Error404 = lazy(() => import('./pages/Error404'));
const Home = lazy(() => import('./pages/Home'));
const AddBook = lazy(() => import('./pages/AddBook'));
const BookDetails = lazy(() => import('./pages/BookDetails'));
const EditBook = lazy(() => import('./pages/EditBook'));

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/form.css';
import './assets/css/label.css';
import './assets/css/input.css';
import './assets/css/button.css';
import './assets/css/table.css';

const Loading = (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <ClipLoader color="#3d65af" size={22} />
    <p className="mt-2 text-center">Loading...</p>
  </div>
);

const localStoragePersistentStorage = new LocalStoragePersistentStorage();

function App() {
  const [persistentStorage, setPersistentStorage] =
    useState<IBooksLibraryPersistentStorage>(localStoragePersistentStorage);
  const [books, setBooks] = useState<Book[]>(persistentStorage.getAllBooks());
  const initialTheme = getInitialThemeValue();
  const [theme, setTheme] = useState<ThemeType>(initialTheme);

  const bookLoader = ({ params }: { params: Params; request: Request }) => {
    let book: Book | boolean = false;
    const bookId = params?.bookId;

    if (typeof bookId === 'string') {
      book = persistentStorage.getBook(bookId);
    }

    if (book === false) throw new Error("Book doesn't exist");
    return book;
  };

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
        {
          path: '/books/:bookId',
          element: (
            <Suspense fallback={Loading}>
              <BookDetails />
            </Suspense>
          ),
          loader: bookLoader,
        },
        {
          path: '/books/edit/:bookId',
          element: (
            <Suspense fallback={Loading}>
              <EditBook />
            </Suspense>
          ),
          loader: bookLoader,
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
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <PersistentStorageContext.Provider value={persistentStorage}>
        <BooksContext.Provider value={{ books, setBooks }}>
          <RouterProvider router={router} />
          <ToastContainer />
        </BooksContext.Provider>
      </PersistentStorageContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
