import { Book } from '../features/booksLibrary/models';

export interface IBookLibraryPersistentStorage {
  fetchAllBooks: () => Promise<Book[]>;
  fetchBookById: (id: string) => Promise<Book | undefined>;
  deleteBook: (id: string[]) => Promise<Book[]>;
  updateBook: (id: string, updatedBookData: Book) => Promise<void>;
  saveAllBooks: (books: Book[]) => Promise<void>;
}
