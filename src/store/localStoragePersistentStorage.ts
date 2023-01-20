import { SerializedBook, Book } from '../features/booksLibrary/models/book';
import { TrackerData } from '../features/booksLibrary/models/tracker';
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
      throw Error('Unsuccessful book retrieval');
    }
  };

  deleteBook = async (ids: string[]) => {
    try {
      const books = await this.fetchAllBooks();
      for (const bookId of ids) {
        const bookToDeleteIndex = await this.findBookIndex(bookId, books);
        if (bookToDeleteIndex !== undefined) books.splice(bookToDeleteIndex, 1);
      }
      await this.saveAllBooks(books);
      return books;
    } catch (error) {
      throw Error('Unsuccessful book deletion');
    }
  };

  updateBook = async (id: string, updatedBookData: Book) => {
    try {
      const books = (await this.fetchAllBooks()) as Book[];
      const bookIndex = await this.findBookIndex(id, books);
      if (bookIndex !== undefined) {
        books[bookIndex].setTitle(updatedBookData.getTitle());
        books[bookIndex].setAuthor(updatedBookData.getAuthor());
        books[bookIndex].setDescription(updatedBookData.getDescription());
        books[bookIndex].setCategory(updatedBookData.getCategory());
        books[bookIndex].setPages(updatedBookData.getPages());
        books[bookIndex].setIsFavorite(updatedBookData.getIsFavorite());
        books[bookIndex].setTracker(updatedBookData.getTracker());
      }
      await this.saveAllBooks([...books]);
    } catch (error) {
      throw Error('Unsuccessful book update');
    }
  };

  saveAllBooks = async (books: Book[]) => {
    localStorage.setItem('books', JSON.stringify(books.map((book) => Book.serialize(book))));
  };

  trackBook = async (id: string, trackingData: TrackerData) => {
    try {
      const book = await this.fetchBookById(id);
      if (book instanceof Book) {
        book.getTracker().insertRecord(trackingData);
        await this.updateBook(id, book);
      }
    } catch (error) {
      throw new Error('Unsuccessful book tracking');
    }
  };
}
