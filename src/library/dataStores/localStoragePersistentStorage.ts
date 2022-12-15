import { SerializedBook, Book } from '../models';
import { IBookPersistentStorage } from './IBookPersistentStorage';

export class LocalStoragePersistentStorage implements IBookPersistentStorage {
  fetchAllBooks = async () => {
    const jsonBooks = JSON.parse(localStorage.getItem('books') || '[]');
    return jsonBooks.map((book: SerializedBook) => Book.deserialize(book));
  };

  fetchBookById = async (id: string) => {
    try {
      const books = await this.fetchAllBooks();
      const bookIndex = await this.findBook(id, books);
      if (bookIndex !== undefined) {
        return books[bookIndex];
      }
      return undefined;
    } catch (err) {
      throw Error('Unsuccessful book retrieval');
    }
  };

  saveAllBooks = async (books: Book[]) => {
    localStorage.setItem('books', JSON.stringify(books.map((book) => Book.serialize(book))));
  };

  findBook = async (id: string, books: Book[]) => {
    for (let i = 0; i < books.length; i++) {
      if (books[i].getIdentifier() === id) {
        return i;
      }
    }
    return undefined;
  };

  deleteBook = async (ids: Record<string, boolean>) => {
    try {
      const books = await this.fetchAllBooks();
      for (const [key, value] of Object.entries(ids)) {
        if (value === true) {
          const bookIndex = await this.findBook(key, books);
          if (bookIndex !== undefined) books.splice(bookIndex, 1);
        }
      }
      await this.saveAllBooks(books);
      return books;
    } catch (err) {
      throw Error('Unsuccessful delete operation');
    }
  };
}
