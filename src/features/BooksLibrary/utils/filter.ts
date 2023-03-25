import { Book } from '../models/book';

export function filterLibraryBooks(filterText: string, book: Book) {
  return (
    book.getTitle().toLowerCase().includes(filterText.toLowerCase()) ||
    book.getAuthor().toLowerCase().includes(filterText.toLowerCase())
  );
}
