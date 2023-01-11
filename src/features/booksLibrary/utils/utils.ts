import { Book } from '../models';

export function cutString(text: string, desiredLength: number) {
  if (text.length <= desiredLength) return text;
  return text.slice(0, desiredLength).concat('.');
}

export function filterLibraryBooks(filterText: string, book: Book) {
  return (
    book.getTitle().toLowerCase().includes(filterText.toLowerCase()) ||
    book.getAuthor().toLowerCase().includes(filterText.toLowerCase())
  );
}
