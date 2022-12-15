import { Book } from '../models';

export interface IBookPersistentStorage {
  fetchAllBooks: () => Promise<Book[]>;
  fetchBookById: (id: string) => Promise<Book> | undefined;
  saveAllBooks: (books: Book[]) => Promise<void>;
  deleteBook: (ids: Record<string, boolean>) => Promise<Book[]>;
}
