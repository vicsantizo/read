import { Book } from '../features/booksLibrary/models';
import { TrackerData } from '../features/booksLibrary/models/tracker';

export interface IBookLibraryPersistentStorage {
  fetchAllBooks: () => Promise<Book[]>;
  fetchBookById: (id: string) => Promise<Book | undefined>;
  deleteBook: (id: string[]) => Promise<Book[]>;
  updateBook: (id: string, updatedBookData: Book) => Promise<void>;
  saveAllBooks: (books: Book[]) => Promise<void>;
  trackBook: (id: string, trackingData: TrackerData) => Promise<void>;
}
