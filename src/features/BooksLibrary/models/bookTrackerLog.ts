import { BookTrackerLogEntry, BookTrackerLogEntryData } from './bookTrackerLogEntry';

export class BookTrackerLog {
  private entries: BookTrackerLogEntry[];

  constructor(entries?: BookTrackerLogEntry[]) {
    this.entries = entries ?? [];
  }

  static serialize(bookTrackerLog: BookTrackerLog): BookTrackerLogEntryData[] {
    return bookTrackerLog.getAllEntries().map((entry) => BookTrackerLogEntry.serialize(entry));
  }

  static deserialize(bookTrackerLogEntryData: BookTrackerLogEntryData[]): BookTrackerLog {
    const deserializedEntryData = bookTrackerLogEntryData.map((entry) => BookTrackerLogEntry.deserialize(entry));
    return new BookTrackerLog(deserializedEntryData);
  }

  getAllEntries(): BookTrackerLogEntry[] {
    return this.entries;
  }

  getEntry(id: string): false | BookTrackerLogEntry {
    const entriesLength = this.entries.length;

    for (let i = 0; i < entriesLength; i++) {
      const isIdMatching = this.entries[i].getId() === id;
      if (isIdMatching) return this.entries[i];
    }

    return false;
  }

  addEntry(fromPage: number, toPage: number, date: Date): void {
    const logEntry = new BookTrackerLogEntry({ fromPage, toPage, date });
    this.entries.push(logEntry);
  }

  updateEntry(id: string, details: Partial<BookTrackerLogEntryData>): boolean {
    const entriesLength = this.entries.length;

    for (let i = 0; i < entriesLength; i++) {
      const isIdMatching = this.entries[i].getId() === id;

      if (isIdMatching) {
        if (details.date) this.entries[i].setDate(details.date);
        if (details.fromPage) this.entries[i].setFromPage(details.fromPage);
        if (details.toPage) this.entries[i].setToPage(details.toPage);
        return true;
      }
    }

    return false;
  }

  deleteEntry(id: string): false | BookTrackerLogEntry {
    const entriesLength = this.entries.length;

    for (let i = 0; i < entriesLength; i++) {
      const isIdMatching = this.entries[i].getId() === id;

      if (isIdMatching) {
        const [deletedEntry] = this.entries.splice(i, 1);
        return deletedEntry;
      }
    }

    return false;
  }

  // calculation based on the last entry
  calculateBookCompletionPercentage(bookTotalPages: number): number {
    if (bookTotalPages === 0) return 0;

    const numberOfEntries = this.entries.length;
    const lastEntry = this.entries[numberOfEntries - 1];
    const lastPageRead = lastEntry.getToPage();

    if (lastPageRead > 0 && !Number.isNaN(lastPageRead)) {
      const completionPercentage = (lastPageRead / bookTotalPages) * 100;
      const completionPercentageNoDecimals = Number(completionPercentage.toFixed(0));
      return completionPercentageNoDecimals > 100 ? 100 : completionPercentageNoDecimals;
    }

    return 0;
  }

  countEntries(): number {
    const numberOfEntries = this.entries.length;
    return numberOfEntries;
  }
}
