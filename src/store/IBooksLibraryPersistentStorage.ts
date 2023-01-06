import { Book } from '../features/booksLibrary/models';

export interface IBookLibraryPersistentStorage {
  fetchAllBooks: () => Promise<Book[]>;
  fetchBookById: (id: string) => Promise<Book | undefined>;
  saveAllBooks: (books: Book[]) => Promise<void>;
}
