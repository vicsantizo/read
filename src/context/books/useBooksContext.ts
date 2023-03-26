import { useContext } from 'react';
import { Book, BookData } from '../../features/booksLibrary/models/book';
import { IBooksLibraryPersistentStorage } from '../../store/IBooksLibraryPersistentStorage';
import { BooksContext } from './BooksContext';

export const useBooksContext = (persistentStorage: IBooksLibraryPersistentStorage) => {
  const { books, setBooks } = useContext(BooksContext);

  const addBook = (details: BookData) => {
    const book = new Book(details);
    const newBooks = [...books, book];
    persistentStorage.addBook(book);
    setBooks(newBooks);
  };

  const updateBook = (id: string, newBook: Book) => {
    persistentStorage.updateBook(id, newBook);
    setBooks(persistentStorage.getAllBooks());
  };

  const deleteBook = (id: string) => {
    persistentStorage.deleteBook(id);
    setBooks(persistentStorage.getAllBooks());
  };

  return {
    addBook,
    updateBook,
    deleteBook,
  };
};
