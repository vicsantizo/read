import { useEffect, useState } from 'react';
import { useBooksLibraryStore } from '../../../../store/useBooksLibraryStore';
import { Book } from '../../../booksLibrary/models';

export const useBook = (bookId: string) => {
  const [bookData, setBookData] = useState<Book | undefined>(undefined);
  const { getBookById } = useBooksLibraryStore();

  useEffect(() => {
    getBookById(bookId).then((retrievedBook) => {
      setBookData(retrievedBook);
    });
  }, []);

  return {
    bookData,
  };
};

export default useBook;
