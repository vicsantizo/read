import { SerializedBook, Book } from '../features/booksLibrary/models/book';
import { IBookLibraryPersistentStorage } from './IBooksLibraryPersistentStorage';

export class LocalStoragePersistentStorage implements IBookLibraryPersistentStorage {
  fetchAllBooks = async () => {
    try {
      const jsonBooks = JSON.parse(localStorage.getItem('books') || '[]');
      return jsonBooks.map((book: SerializedBook) => Book.deserialize(book));
    } catch (error) {
      throw Error("Couldn't fetch the books");
    }
  };

  findBookIndex = async (id: string, books: Book[]) => {
    for (let i = 0; i < books.length; i++) {
      if (books[i].getIdentifier() === id) {
        return i;
      }
    }
    return undefined;
  };

  fetchBookById = async (id: string) => {
    try {
      const books = await this.fetchAllBooks();
      const bookIndex = await this.findBookIndex(id, books);
      if (bookIndex !== undefined) {
        return books[bookIndex];
      }
      return undefined;
    } catch (error) {
      throw Error('Unsucceful book retrieval');
    }
  };

  saveAllBooks = async (books: Book[]) => {
    localStorage.setItem('books', JSON.stringify(books.map((book) => Book.serialize(book))));
  };
}
