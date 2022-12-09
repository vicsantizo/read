import { useEffect, useState } from 'react';
import { Book } from '../models';
import { IBookPersistentStorage } from './IBookPersistentStorage';
import { usePersistentStorage } from './persistentStorageContext';

export type BooksStore = {
  data: Book[];
  error?: string;
  createBook: (title: string, author: string) => Promise<void>;
  removeBook: (id: Record<string, boolean>) => Promise<void>;
};

const fetchAllBooks = async (persistentStorage: IBookPersistentStorage) => {
  return persistentStorage.fetchAllBooks();
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

  const createBook = async (title: string, author: string) => {
    const newBooks = [...books, new Book(title, author)];
    saveAllBooks(persistentStorage, newBooks)
      .then(() => setBooks(newBooks))
      .catch(() => setError('Something happened...'));
  };

  const removeBook = async (id: Record<string, boolean>) => {
    deleteBook(persistentStorage, id).then((books) => {
      setBooks(books);
    });
  };

  return {
    data: books,
    error,
    createBook,
    removeBook,
  };
};
