import { Book, BookData } from '../features/BooksLibrary/models/book';

export interface IBooksLibraryPersistentStorage {
  getAllBooks(): Book[];
  getBook(id: string): Book;
  addBook(details: BookData): boolean;
  updateBook(id: string, details: BookData): boolean;
  deleteBook(id: string): Book | false;
}
