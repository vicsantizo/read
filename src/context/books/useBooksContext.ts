import { useContext } from 'react';
import { Book, BookData } from '../../features/booksLibrary/models/book';
import { IBooksLibraryPersistentStorage } from '../../store/IBooksLibraryPersistentStorage';
import { notify } from '../../utils/toastNotifications';
import { BooksContext } from './BooksContext';

export const useBooksContext = (persistentStorage: IBooksLibraryPersistentStorage) => {
  const { books, setBooks } = useContext(BooksContext);

  const addBook = (details: BookData) => {
    const book = new Book(details);
    const newBooks = [...books, book];
    const wasBookAdded = persistentStorage.addBook(book);

    if (wasBookAdded) {
      setBooks(newBooks);
      notify('Book added!', 'success');
    } else {
      notify('Could not add the book', 'error');
    }
  };

  const updateBook = (id: string, newBook: Book) => {
    const wasBookUpdated = persistentStorage.updateBook(id, newBook);

    if (wasBookUpdated) {
      setBooks(persistentStorage.getAllBooks());
      notify('Book updated!', 'success');
    } else {
      notify('Could not update the book', 'error');
    }
  };

  const deleteBook = (id: string) => {
    const wasBookDeleted = persistentStorage.deleteBook(id);

    if (wasBookDeleted === false) {
      notify('Could not delete the book', 'error');
    } else {
      setBooks(persistentStorage.getAllBooks());
      notify('Book deleted!', 'success');
    }
  };

  return {
    addBook,
    updateBook,
    deleteBook,
  };
};
