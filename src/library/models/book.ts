import { v4 as uuidv4 } from 'uuid';

export type SerializedBook = {
  id: string;
  title: string;
  author: string;
};

export class Book {
  private id: string;
  private title: string;
  private author: string;

  static serialize = (book: Book) => {
    return {
      id: book.getIdentifier(),
      title: book.getTitle(),
      author: book.getAuthor(),
    };
  };

  static deserialize = (serializedBook: SerializedBook) => {
    return new Book(serializedBook.title, serializedBook.author, serializedBook.id);
  };

  constructor(title: string, author: string, id?: string) {
    this.title = title;
    this.author = author;
    this.id = id ?? uuidv4();
  }

  getTitle() {
    return this.title;
  }

  getAuthor() {
    return this.author;
  }

  getIdentifier() {
    return this.id;
  }
}
