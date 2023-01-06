import { v4 as uuidv4 } from 'uuid';

export type SerializedBook = {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  pages: number;
  isFavorite: boolean;
  isFinished: boolean;
};

export class Book {
  private id: string;
  private title: string;
  private author: string;
  private description: string;
  private category: string;
  private pages: number;
  private isFavorite: boolean;
  private isFinished: boolean;

  static serialize = (book: Book) => {
    return {
      id: book.getIdentifier(),
      title: book.getTitle(),
      author: book.getAuthor(),
      description: book.getDescription(),
      category: book.getCategory(),
      pages: book.getPages(),
      isFavorite: book.getIsFavorite(),
      isFinished: book.getIsFinished(),
    };
  };

  static deserialize = (serializedBook: SerializedBook) => {
    return new Book(
      serializedBook.title,
      serializedBook.author,
      serializedBook.id,
      serializedBook.description,
      serializedBook.category,
      serializedBook.pages,
      serializedBook.isFavorite,
      serializedBook.isFinished,
    );
  };

  constructor(
    title: string,
    author: string,
    id?: string,
    description?: string,
    category?: string,
    pages?: number,
    isFavorite?: boolean,
    isFinished?: boolean,
  ) {
    this.title = title;
    this.author = author;
    this.id = id ?? uuidv4();
    this.description = description ?? '';
    this.category = category ?? '';
    this.pages = pages ?? 0;
    this.isFavorite = isFavorite ?? false;
    this.isFinished = isFinished ?? false;
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

  getDescription() {
    return this.description;
  }

  getCategory() {
    return this.category;
  }

  getPages() {
    return this.pages;
  }

  getIsFavorite() {
    return this.isFavorite;
  }

  getIsFinished() {
    return this.isFinished;
  }
}
