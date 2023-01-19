import { useEffect, useState } from 'react';
import { filterLibraryBooks } from '../../utils/utils';
import { Book } from '../../models';

export const useLibraryFilter = (searchValue: string, books: Book[]) => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  useEffect(() => {
    if (searchValue === '') {
      setFilteredBooks(books);
    }
    setFilteredBooks(
      books.filter((book) => {
        return filterLibraryBooks(searchValue, book);
      }),
    );
  }, [searchValue, books]);

  return {
    filteredBooks,
  };
};

export default useLibraryFilter;
