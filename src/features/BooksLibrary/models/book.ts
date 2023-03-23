import { v4 as uuid } from 'uuid';
import { BookTrackerLog } from './bookTrackerLog';
import { BookTrackerLogEntryData } from './bookTrackerLogEntry';

export type SerializedBook = {
  title: string;
  author?: string;
  description?: string;
  category?: string[];
  pages?: number;
  isFavorite?: boolean;
  id?: string;
  trackerLog: BookTrackerLogEntryData[];
};

export type BookData = {
  title: string;
  author?: string;
  description?: string;
  category?: string[];
  pages?: number;
  isFavorite?: boolean;
  id?: string;
  trackerLog?: BookTrackerLog;
};

export class Book {
  private title: string;
  private author: string;
  private description: string;
  private category: string[];
  private pages: number;
  private isFavorite: boolean;
  private id: string;
  private trackerLog: BookTrackerLog;

  constructor({ title, author, description, category, pages, isFavorite, id, trackerLog }: BookData) {
    this.title = title;
    this.author = author || '';
    this.description = description || '';
    this.category = category || [];
    this.pages = pages ?? 0;
    this.isFavorite = isFavorite ?? false;
    this.id = id ?? uuid();
    this.trackerLog = trackerLog ?? new BookTrackerLog();
  }

  static serialize(book: Book): SerializedBook {
    return {
      id: book.getId(),
      title: book.getTitle(),
      author: book.getAuthor(),
      description: book.getDescription(),
      category: book.getCategory(),
      pages: book.getPages(),
      isFavorite: book.getIsFavorite(),
      trackerLog: BookTrackerLog.serialize(book.getTrackerLog()),
    };
  }

  static deserialize = (book: SerializedBook) => {
    const { trackerLog: serializedTrackerLog } = book;
    const deserializedTrackerLog = BookTrackerLog.deserialize(serializedTrackerLog);
    return new Book({ ...book, trackerLog: deserializedTrackerLog });
  };

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getAuthor() {
    return this.author;
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

  getTrackerLog() {
    return this.trackerLog;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setAuthor(author: string) {
    this.author = author;
    return this;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  setCategory(category: string[]) {
    this.category = category;
    return this;
  }

  setPages(pages: number) {
    this.pages = pages;
    return this;
  }

  setIsFavorite(isFavorite: boolean) {
    this.isFavorite = isFavorite;
    return this;
  }

  setIdentifier(id: string) {
    this.id = id;
    return this;
  }

  setTrackerLog(trackerLog: BookTrackerLog) {
    this.trackerLog = trackerLog;
  }
}
