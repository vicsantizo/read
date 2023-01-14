import { v4 as uuid } from 'uuid';

export type TrackerData = {
  date: Date;
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
}
