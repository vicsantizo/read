import { createContext } from 'react';
import { Book } from '../../features/booksLibrary/models/book';

type BooksContextValue = {
  books: Book[];
  setBooks: (books: Book[]) => void;
};

export const BooksContext = createContext<BooksContextValue>({
  books: [],
  setBooks: (books: Book[]) => {
    //
  },
});
