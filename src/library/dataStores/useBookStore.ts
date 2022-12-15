import { useEffect, useState } from 'react';
import { Book } from '../models';
import { IBookPersistentStorage } from './IBookPersistentStorage';
import { usePersistentStorage } from './persistentStorageContext';

export type BooksStore = {
  data: Book[];
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
  removeBook: (id: Record<string, boolean>) => Promise<void>;
  getBookById: (id: string) => Promise<Book | undefined>;
  updateBook: (
    id: Record<string, boolean>,
    title: string,
    author: string,
    description?: string,
    category?: string,
    pages?: number,
    isFavorite?: boolean,
    isFinished?: boolean,
  ) => Promise<void>;
};

const fetchAllBooks = async (persistentStorage: IBookPersistentStorage) => {
  return persistentStorage.fetchAllBooks();
};

const fetchBookById = async (persistentStorage: IBookPersistentStorage, id: string) => {
  return persistentStorage.fetchBookById(id);
};

const saveAllBooks = async (persistentStorage: IBookPersistentStorage, books: Book[]) => {
  return persistentStorage.saveAllBooks(books);
};

const deleteBook = async (persistentStorage: IBookPersistentStorage, id: Record<string, boolean>) => {
  return persistentStorage.deleteBook(id);
};

export const useBooksStore = (): BooksStore => {
  const persistentStorage = usePersistentStorage();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchAllBooks(persistentStorage)
      .then((books) => setBooks(books))
      .catch(() => setError('Something happened...'));
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

  const removeBook = async (id: Record<string, boolean>) => {
    deleteBook(persistentStorage, id).then((books) => {
      setBooks(books);
    });
  };

  const updateBook = async (
    id: Record<string, boolean>,
    title: string,
    author: string,
    description?: string,
    category?: string,
    pages?: number,
    isFavorite?: boolean,
    isFinished?: boolean,
  ) => {
    createBook(title, author, description, category, pages, isFavorite, isFinished).then(() => {
      deleteBook(persistentStorage, id);
    });
  };

  const getBookById = async (id: string) => {
    const foundBook = await fetchBookById(persistentStorage, id);
    return foundBook;
  };

  return {
    data: books,
    error,
    createBook,
    removeBook,
    getBookById,
    updateBook,
  };
};
