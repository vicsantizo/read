import { Book, SerializedBook } from '../features/booksLibrary/models/book';
import { IBooksLibraryPersistentStorage } from './IBooksLibraryPersistentStorage';

export class LocalStoragePersistentStorage implements IBooksLibraryPersistentStorage {
  private saveBooks(books: Book[]) {
    const serializedBooks = books.map((books: Book) => Book.serialize(books));
    localStorage.setItem('books', JSON.stringify(serializedBooks));
  }

  getAllBooks(): Book[] {
    const localStorageBooks = JSON.parse(localStorage.getItem('books') ?? '[]');
    const books = localStorageBooks.map((book: SerializedBook) => Book.deserialize(book));
    return books;
  }

  getBook(id: string): false | Book {
    const books = this.getAllBooks();

    for (const book of books) {
      if (book.getId() === id) {
        return book;
      }
    }

    return false;
  }

  addBook(book: Book): boolean {
    const books = [...this.getAllBooks(), book];
    this.saveBooks(books);
    return true;
  }

  updateBook(id: string, newBook: Book): boolean {
    const isBookDeleted = this.deleteBook(id);

    if (isBookDeleted) {
      this.addBook(newBook);
      return true;
    }

    return false;
  }

  deleteBook(id: string): false | Book {
    const books = this.getAllBooks();

    for (let i = 0; i < books.length; i++) {
      if (books[i].getId() === id) {
        const booksWithoutDeletedBook = [...books].splice(i, 1);
        this.saveBooks(booksWithoutDeletedBook);
        return books[i];
      }
    }
    return false;
  }
}
