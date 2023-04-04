import { Book } from './book';
import { BookTrackerLog } from './bookTrackerLog';

describe('tests the Book class', () => {
  it('creates a book', () => {
    const myBook = new Book({
      title: 'Lorem Ipsum',
      author: 'John Doe',
      trackerLog: new BookTrackerLog(),
    });

    expect(myBook.getTitle()).toBe('Lorem Ipsum');
  });

  it('maintains the same id when serializing and deserializing', () => {
    const myBook = new Book({
      title: 'Lorem Ipsum',
      author: 'John Doe',
      trackerLog: new BookTrackerLog(),
    });

    const currentBookId = myBook.getId();

    const serializedBook = Book.serialize(myBook);
    const deserializedBook = Book.deserialize(serializedBook);
    const deserializedBookId = deserializedBook.getId();

    expect(currentBookId).toBe(deserializedBookId);
  });
});
