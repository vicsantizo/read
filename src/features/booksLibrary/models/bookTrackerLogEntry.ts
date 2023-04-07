import { v4 as uuid } from 'uuid';

export type BookTrackerLogEntryData = {
  date: Date;
  fromPage: number;
  toPage: number;
  id?: string;
};

export type SerializedBookTrackerLogEntry = BookTrackerLogEntryData;

export class BookTrackerLogEntry {
  private date: Date;
  private fromPage: number;
  private toPage: number;
  private id: string;

  static serialize = (bookTrackerLogEntry: BookTrackerLogEntry): SerializedBookTrackerLogEntry => {
    return {
      id: bookTrackerLogEntry.getId(),
      date: bookTrackerLogEntry.getDate(),
      fromPage: bookTrackerLogEntry.getFromPage(),
      toPage: bookTrackerLogEntry.getToPage(),
    };
  };

  static deserialize = (serializedBookTrackerLogEntry: SerializedBookTrackerLogEntry) => {
    return new BookTrackerLogEntry({
      ...serializedBookTrackerLogEntry,
      date: new Date(serializedBookTrackerLogEntry.date),
      fromPage: Number(serializedBookTrackerLogEntry.fromPage),
      toPage: Number(serializedBookTrackerLogEntry.toPage),
    });
  };

  constructor({ date, fromPage, toPage, id }: BookTrackerLogEntryData) {
    this.date = date;
    this.fromPage = fromPage;
    this.toPage = toPage;
    this.id = id ?? uuid();
  }

  getId() {
    return this.id;
  }

  getDate() {
    return this.date;
  }

  getFromPage() {
    return this.fromPage;
  }

  getToPage() {
    return this.toPage;
  }

  setDate(date: Date) {
    this.date = date;
    return this;
  }

  setFromPage(fromPage: number) {
    this.fromPage = fromPage;
    return this;
  }

  setToPage(toPage: number) {
    this.toPage = toPage;
    return this;
  }
}
