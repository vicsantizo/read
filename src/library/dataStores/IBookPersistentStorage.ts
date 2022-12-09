import { Book } from '../models';

export interface IBookPersistentStorage {
  fetchAllBooks: () => Promise<Book[]>;
  saveAllBooks: (books: Book[]) => Promise<void>;
  deleteBook: (ids: Record<string, boolean>) => Promise<Book[]>;
}
