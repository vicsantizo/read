import { useEffect, useState } from 'react';
import { Book } from '../models';
import { IBookPersistentStorage } from './IBookPersistentStorage';
import { usePersistentStorage } from './persistentStorageContext';

type BooksStore = {
  data: Book[];
  error?: string;
  createBook: (title: string, author: string) => Promise<void>;
};

const fetchAllBooks = async (persistentStorage: IBookPersistentStorage) => {
  return persistentStorage.fetchAllBooks();
};

const saveAllBooks = async (persistentStorage: IBookPersistentStorage, books: Book[]) => {
  return persistentStorage.saveAllBooks(books);
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

  return {
    data: books,
    error,
    createBook,
  };
};
