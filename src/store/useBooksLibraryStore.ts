import { useEffect, useState } from 'react';
import { usePersistentStorage } from '../context/persistentStorage/usePersistentStorage';
import { Book } from '../features/booksLibrary/models';
import { IBookLibraryPersistentStorage } from './IBooksLibraryPersistentStorage';

export type BooksLibraryStore = {
  books: Book[];
  error?: string;
  createBook: (
    title: string,
    author: string,
    description?: string,
    category?: string,
    pages?: number,
    isFavorite?: boolean,
    isFinished?: boolean,
  ) => Promise<void>;
  getBookById: (id: string) => Promise<Book | undefined>;
};

const fetchAllBooks = async (persistentStorage: IBookLibraryPersistentStorage) => {
  return persistentStorage.fetchAllBooks();
};

const fetchBookById = async (persistentStorage: IBookLibraryPersistentStorage, id: string) => {
  return persistentStorage.fetchBookById(id);
};

const saveAllBooks = async (persistentStorage: IBookLibraryPersistentStorage, books: Book[]) => {
  return persistentStorage.saveAllBooks(books);
};

export const useBooksLibraryStore = () => {
  const persistentStorage = usePersistentStorage();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchAllBooks(persistentStorage)
      .then((books) => setBooks(books))
      .catch((error) => setError(error));
  }, [persistentStorage]);

  const createBook = async (
    title: string,
    author: string,
    description?: string,
    category?: string,
    pages?: number,
    isFavorite?: boolean,
    isFinished?: boolean,
  ) => {
    const newBooks = [
      ...books,
      new Book(title, author, undefined, description, category, pages, isFavorite, isFinished),
    ];
    saveAllBooks(persistentStorage, newBooks)
      .then(() => setBooks(newBooks))
      .catch(() => setError('Something happened...'));
  };

  const getBookById = async (id: string) => {
    return fetchBookById(persistentStorage, id);
  };

  return {
    books,
    error,
    createBook,
    getBookById,
  };
};

export default useBooksLibraryStore;
