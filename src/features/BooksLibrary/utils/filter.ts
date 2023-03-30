import { Book } from '../models/book';

export function filterLibraryBooks(filterText: string, book: Book) {
  return (
    book.getTitle().toLowerCase().includes(filterText.trim().toLowerCase()) ||
    book.getAuthor().toLowerCase().includes(filterText.trim().toLowerCase())
  );
}
