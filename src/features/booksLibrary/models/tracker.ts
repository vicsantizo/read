import { v4 as uuid } from 'uuid';

export type TrackerData = {
  date: string;
  fromPage: number;
  toPage: number;
  id?: string;
};

export class Tracker {
  private log: TrackerData[];

  static serialize = (tracker: Tracker) => {
    return tracker.log;
  };

  static deserialize = (serializedTracker: TrackerData[]) => {
    const tracker = new Tracker();
    for (const element of serializedTracker) {
      tracker.insertRecord(element);
    }
  };

  constructor(initialData?: TrackerData[]) {
    this.log = initialData ?? [];
  }

  insertRecord({ date, fromPage, toPage }: TrackerData) {
    this.log.push({
      id: uuid(),
      date,
      fromPage,
      toPage,
    });
    return this;
  }

  getLastRecord() {
    const lastItem = this.log.length;
    return this.log[lastItem - 1];
  }

  getRecentRecords() {
    const start = this.log.length - 5 < 0 ? 0 : this.log.length - 5;
    const end = this.log.length;
    return this.log.slice(start, end);
  }

  getAllRecords() {
    return this.log;
  }

  isEmpty() {
    return this.log.length === 0;
  }

  calculateCompletion(bookPages: number) {
    const numberOfPagesRead = this.getLastRecord()?.toPage ?? 0;
    if (bookPages === 0) return 0;
    if (numberOfPagesRead !== 0) {
      const completionPercentage = ((numberOfPagesRead / bookPages) * 100).toFixed(2);
      return Number(completionPercentage);
    }
    return 0;
  }

  getCompletionDate(bookPages: number) {
    if (this.getLastRecord()?.toPage >= bookPages) {
      const completionDate = new Date(this.getLastRecord()?.date);
      const formattedDate = completionDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      });
      return formattedDate;
    }
    return '...';
  }

  getStartDate() {
    if (this.isEmpty()) return '...';
    const startDate = new Date(this.log[0].date);
    const formattedDate = startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
    return formattedDate;
  }
}
