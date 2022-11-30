import { SerializedBook, Book } from '../models';
import { IBookPersistentStorage } from './IBookPersistentStorage';

export class LocalStoragePersistentStorage implements IBookPersistentStorage {
  fetchAllBooks = async () => {
    const jsonBooks = JSON.parse(localStorage.getItem('books') || '[]');
    return jsonBooks.map((book: SerializedBook) => Book.deserialize(book));
  };

  saveAllBooks = async (books: Book[]) => {
    localStorage.setItem('books', JSON.stringify(books.map((book) => Book.serialize(book))));
  };
}
