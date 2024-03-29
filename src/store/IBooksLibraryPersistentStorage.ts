import { Book } from '../features/booksLibrary/models/book';

export interface IBooksLibraryPersistentStorage {
  getAllBooks(): Book[];
  getBook(id: string): Book | false;
  addBook(book: Book): boolean;
  updateBook(id: string, newBook: Book): boolean;
  deleteBook(id: string): Book | false;
}
