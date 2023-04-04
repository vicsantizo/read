import { BookTrackerLog } from './bookTrackerLog';
import { BookTrackerLogEntry } from './bookTrackerLogEntry';

describe('tests the BookTrackerLog class', () => {
  it('initializes book tracker log with the entries provided', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntryId1 = bookTrackerLogEntry1.getId();
    const bookTrackerLogEntryId2 = bookTrackerLogEntry2.getId();
    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);

    expect(trackerLog.getAllEntries()).toHaveLength(2);
    expect(trackerLog.getAllEntries()[0].getId()).toBe(bookTrackerLogEntryId1);
    expect(trackerLog.getAllEntries()[1].getId()).toBe(bookTrackerLogEntryId2);
  });

  it('successfully serializes the tracker logs', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);
    const serializedTracker = BookTrackerLog.serialize(trackerLog);
    const bookTrackerLogEntryId1 = bookTrackerLogEntry1.getId();

    expect(serializedTracker).toHaveLength(2);
    expect(serializedTracker[0].id).toBe(bookTrackerLogEntryId1);
  });

  it('successfully deserializes serialized tracker logs', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);
    const bookTrackerLogEntryId1 = bookTrackerLogEntry1.getId();
    const serializedTracker = BookTrackerLog.serialize(trackerLog);
    const deserializedTracker = BookTrackerLog.deserialize(serializedTracker);

    expect(deserializedTracker.getAllEntries()).toHaveLength(2);
    expect(deserializedTracker.getAllEntries()[0].getId()).toBe(bookTrackerLogEntryId1);
  });

  it('adds an entry to the log of entries', () => {
    const trackerLog = new BookTrackerLog();
    expect(trackerLog.getAllEntries()).toHaveLength(0);
    trackerLog.addEntry(0, 10, new Date());
    expect(trackerLog.getAllEntries()).toHaveLength(1);
  });

  it('retrieves specific entry when providing the id for that entry', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);
    const bookTrackerLogEntryId1 = bookTrackerLogEntry1.getId();

    const entry = trackerLog.getEntry(bookTrackerLogEntryId1);

    expect(entry).not.toBeFalsy();

    if (entry) {
      expect(entry.getId()).toBe(bookTrackerLogEntryId1);
    }
  });

  it('returns false when the trying to retrieve an entry that does not exist', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);

    expect(trackerLog.getEntry('123123')).toBe(false);
  });

  it('updates specific entry in the tracker log with the given values', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);
    const bookTrackerLogEntryId1 = bookTrackerLogEntry1.getId();

    expect(trackerLog.getAllEntries()[0].getToPage()).toBe(10);

    trackerLog.updateEntry(bookTrackerLogEntryId1, {
      toPage: 20,
    });

    expect(trackerLog.getAllEntries()[0].getToPage()).toBe(20);
  });

  it('returns false when the update fails due to non-existent entry', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);
    expect(trackerLog.getAllEntries()[0].getToPage()).toBe(10);

    expect(
      trackerLog.updateEntry('1234123412341234', {
        toPage: 20,
      }),
    ).toBe(false);
  });

  it('removes the specified entry from the tracker log', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);
    const bookTrackerLogEntryId1 = bookTrackerLogEntry1.getId();

    expect(trackerLog.getAllEntries()).toHaveLength(2);

    trackerLog.deleteEntry(bookTrackerLogEntryId1);

    expect(trackerLog.getAllEntries()).toHaveLength(1);
  });

  it('returns false when the removal of an entry fails due to non-existent entry', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);

    expect(trackerLog.getAllEntries()).toHaveLength(2);
    expect(trackerLog.deleteEntry('5234523123')).toBe(false);
    expect(trackerLog.getAllEntries()).toHaveLength(2);
  });

  it('counts the number of entries registered in the tracker log', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 10,
      toPage: 20,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);

    expect(trackerLog.countEntries()).toBe(2);

    trackerLog.addEntry(0, 10, new Date());

    expect(trackerLog.countEntries()).toBe(3);
  });

  it('calculates completion percentage based on the last page read', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 10,
      toPage: 20,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);
    expect(trackerLog.calculateBookCompletionPercentage(100)).toBe(20);
  });

  it('returns 100% completion when pages read exceed the total number of pages in the book', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 10,
      toPage: 500,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);
    expect(trackerLog.calculateBookCompletionPercentage(100)).toBe(100);
  });

  it('returns 0% completion when the total pages of the book is 0', () => {
    const bookTrackerLogEntry1 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 0,
      toPage: 10,
    });

    const bookTrackerLogEntry2 = new BookTrackerLogEntry({
      date: new Date(),
      fromPage: 10,
      toPage: 20,
    });

    const trackerLog = new BookTrackerLog([bookTrackerLogEntry1, bookTrackerLogEntry2]);
    expect(trackerLog.calculateBookCompletionPercentage(0)).toBe(0);
  });
});
